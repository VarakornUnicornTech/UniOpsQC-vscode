import * as vscode from 'vscode';
import { SidebarProvider } from './views/sidebarProvider';
import { installFramework } from './commands/install';
import { setupProject } from './commands/setup';
import { checkForUpdates } from './commands/versionCheck';
import { updateFramework } from './commands/update';
import { isAutoCheckEnabled } from './services/config';

export function activate(context: vscode.ExtensionContext) {
  console.log('RoundTable Hub activated');

  // Register sidebar
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      SidebarProvider.viewType,
      sidebarProvider
    )
  );

  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand('roundtable.install', async () => {
      await installFramework();
      sidebarProvider.updateContent();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('roundtable.setup', async () => {
      await setupProject();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('roundtable.checkUpdate', async () => {
      await checkForUpdates(false);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('roundtable.update', async () => {
      await updateFramework();
      sidebarProvider.updateContent();
    })
  );

  // Auto-check for updates on startup (silent)
  if (isAutoCheckEnabled()) {
    setTimeout(() => {
      checkForUpdates(true);
    }, 5000);
  }
}

export function deactivate() {
  console.log('RoundTable Hub deactivated');
}
