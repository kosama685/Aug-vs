import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import sqlite3 from "sqlite3";

export interface CookieRecord {
  name: string;
  value: string;
  domain: string;
  path: string;
  expiresUtc: number;
}

function getDefaultProfilePath(): string {
  const home = os.homedir();
  switch (process.platform) {
    case "darwin":
      return path.join(home, "Library/Application Support/Google/Chrome/Default");
    case "win32":
      return path.join(home, "AppData/Local/Google/Chrome/User Data/Default");
    default:
      return path.join(home, ".config/google-chrome/Default");
  }
}

async function queryCookies(dbPath: string, domainLike: string): Promise<CookieRecord[]> {
  const tmpPath = path.join(os.tmpdir(), `aug-agent-cookies-${Date.now()}.sqlite`);
  await fs.copyFile(dbPath, tmpPath);

  const db = new sqlite3.Database(tmpPath, sqlite3.OPEN_READONLY);
  const rows = await new Promise<CookieRecord[]>((resolve, reject) => {
    db.all(
      "SELECT name, value, host_key as domain, path, expires_utc as expiresUtc FROM cookies WHERE host_key LIKE ?",
      [domainLike],
      (err, data) => {
        if (err) reject(err);
        else resolve(data as CookieRecord[]);
      },
    );
  });

  await new Promise<void>((resolve, reject) => db.close((err) => (err ? reject(err) : resolve())));
  await fs.rm(tmpPath, { force: true });
  return rows.filter((c) => c.value?.length > 0);
}

export async function extractChromiumCookies(
  domainLike: string,
  profilePath = getDefaultProfilePath(),
): Promise<CookieRecord[]> {
  const cookiesPath = path.join(profilePath, "Cookies");
  return queryCookies(cookiesPath, domainLike);
}
