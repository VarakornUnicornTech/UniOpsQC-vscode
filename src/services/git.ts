import { execFile } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

export class GitService {
  private findGit(): string {
    const candidates = ['git', 'C:\\Program Files\\Git\\bin\\git.exe'];
    for (const candidate of candidates) {
      try {
        require('child_process').execFileSync(candidate, ['--version']);
        return candidate;
      } catch {
        continue;
      }
    }
    throw new Error('Git not found. Please install Git.');
  }

  private exec(args: string[], cwd?: string): Promise<string> {
    const git = this.findGit();
    return new Promise((resolve, reject) => {
      execFile(git, args, { cwd, maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`git ${args.join(' ')} failed: ${stderr || error.message}`));
        } else {
          resolve(stdout.trim());
        }
      });
    });
  }

  async cloneShallow(repoUrl: string, targetDir: string): Promise<void> {
    await this.exec(['clone', '--depth', '1', repoUrl, targetDir]);
  }

  async getLocalVersion(workspaceRoot: string): Promise<string | null> {
    const versionFile = path.join(workspaceRoot, '.claude', 'template-version.json');
    try {
      const content = fs.readFileSync(versionFile, 'utf-8');
      const data = JSON.parse(content);
      return data.version || null;
    } catch {
      return null;
    }
  }

  async isFrameworkInstalled(workspaceRoot: string): Promise<boolean> {
    const claudeMd = path.join(workspaceRoot, '.claude', 'CLAUDE.md');
    return fs.existsSync(claudeMd);
  }
}
