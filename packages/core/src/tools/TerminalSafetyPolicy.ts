const blockedPatterns = [/\brm\b/, /\bsudo\b/, /curl\s+.*\|\s*(sh|bash)/, /\bchmod\b/, /\bgit\s+push\b/, /deploy/i];
const riskyPatterns = [/\bnpm\s+install\b|\bpnpm\s+add\b/, /\byarn\s+add\b/];

export class TerminalSafetyPolicy {
  constructor(private readonly allowlist: string[] = []) {}

  evaluate(command: string): { allowed: boolean; requiresApproval: boolean; reason: string } {
    if (this.allowlist.includes(command)) return { allowed: true, requiresApproval: false, reason: 'Allowlisted command' };
    if (blockedPatterns.some((r) => r.test(command))) return { allowed: false, requiresApproval: true, reason: 'Blocked destructive or exfiltration-prone command' };
    if (riskyPatterns.some((r) => r.test(command))) return { allowed: true, requiresApproval: true, reason: 'Risky command requires explicit approval' };
    return { allowed: true, requiresApproval: false, reason: 'Command considered safe' };
  }
}
