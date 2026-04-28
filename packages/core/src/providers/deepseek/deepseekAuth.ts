import { chromium, type BrowserContext } from "playwright";
import { extractChromiumCookies } from "../../auth/chromiumCookieExtractor.js";
import { BrowserSessionVault } from "../../auth/browserSessionVault.js";
import type { BrowserSessionAuth } from "../../interfaces/contracts.js";

interface PersistedDeepSeekSession {
  cookies: Array<{ name: string; value: string; domain: string; path: string; expires?: number }>;
  csrfToken?: string;
  userAgent: string;
  updatedAt: string;
}

export class DeepSeekBrowserSessionAuth implements BrowserSessionAuth {
  readonly provider = "deepseek" as const;
  private readonly vault = new BrowserSessionVault();

  async signInWithEmbeddedWebView(): Promise<void> {
    const context = await this.launchPersistentContext();
    const page = await context.newPage();
    await page.goto("https://chat.deepseek.com", { waitUntil: "domcontentloaded" });
    await page.waitForURL(/chat\.deepseek\.com\/(chat|$)/, { timeout: 5 * 60_000 });
    const cookies = await context.cookies("https://chat.deepseek.com");
    const csrfToken = await page.evaluate(() => localStorage.getItem("csrf-token") ?? undefined);
    await this.vault.save(this.provider, {
      cookies,
      csrfToken,
      userAgent: await page.evaluate(() => navigator.userAgent),
      updatedAt: new Date().toISOString(),
    } satisfies PersistedDeepSeekSession);
    await context.close();
  }

  async importFromLocalBrowser(profilePath?: string): Promise<void> {
    const cookies = await extractChromiumCookies("%deepseek.com%", profilePath);
    if (cookies.length === 0) {
      throw new Error("No DeepSeek browser cookies found in the selected profile.");
    }

    await this.vault.save(this.provider, {
      cookies: cookies.map((c) => ({
        name: c.name,
        value: c.value,
        domain: c.domain,
        path: c.path,
        expires: c.expiresUtc,
      })),
      userAgent: "Mozilla/5.0",
      updatedAt: new Date().toISOString(),
    } satisfies PersistedDeepSeekSession);
  }

  async ensureAuthenticated(): Promise<boolean> {
    const session = await this.vault.load<PersistedDeepSeekSession>(this.provider);
    return !!session?.cookies?.length;
  }

  async getAuthHeaders(): Promise<Record<string, string>> {
    const session = await this.vault.load<PersistedDeepSeekSession>(this.provider);
    if (!session) {
      throw new Error("DeepSeek session is missing. Run sign-in first.");
    }

    const cookieHeader = session.cookies.map((c) => `${c.name}=${c.value}`).join("; ");
    return {
      "content-type": "application/json",
      origin: "https://chat.deepseek.com",
      referer: "https://chat.deepseek.com/",
      "user-agent": session.userAgent,
      cookie: cookieHeader,
      ...(session.csrfToken ? { "x-csrf-token": session.csrfToken } : {}),
    };
  }

  async clear(): Promise<void> {
    await this.vault.clear(this.provider);
  }

  private async launchPersistentContext(): Promise<BrowserContext> {
    return chromium.launchPersistentContext(".agent/browser/deepseek", {
      headless: false,
      viewport: { width: 1440, height: 900 },
      args: ["--disable-blink-features=AutomationControlled"],
    });
  }
}
