import * as vscode from 'vscode';

export function getRepoSlug(): string {
  return vscode.workspace.getConfiguration('roundtable').get<string>(
    'repoUrl',
    'VarakornUnicornTech/unicorn_roundtable_framework_repo'
  );
}

export function getLicenseKey(): string {
  return vscode.workspace.getConfiguration('roundtable').get<string>('licenseKey', '');
}

export function isAutoCheckEnabled(): boolean {
  return vscode.workspace.getConfiguration('roundtable').get<boolean>('autoCheckUpdates', true);
}

export function isProUser(): boolean {
  const key = getLicenseKey();
  // MVP: any non-empty key is treated as valid
  // TODO: Add server-side verification with Stripe/Supabase
  return key.length > 0;
}
