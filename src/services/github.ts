import * as https from 'https';

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com';
const GITHUB_API_BASE = 'https://api.github.com';

export interface TemplateVersion {
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  released: string;
}

export interface RepoFile {
  name: string;
  path: string;
  type: 'file' | 'dir';
  download_url: string | null;
}

function fetchJson<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'RoundTable-Hub-VSCode',
        'Accept': 'application/json',
      },
    };

    https.get(url, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        const redirectUrl = res.headers.location;
        if (redirectUrl) {
          fetchJson<T>(redirectUrl).then(resolve).catch(reject);
          return;
        }
      }

      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}: ${url}`));
        return;
      }

      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data) as T);
        } catch (e) {
          reject(new Error(`Invalid JSON from ${url}`));
        }
      });
    }).on('error', reject);
  });
}

function fetchText(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const options = {
      headers: { 'User-Agent': 'RoundTable-Hub-VSCode' },
    };

    https.get(url, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        const redirectUrl = res.headers.location;
        if (redirectUrl) {
          fetchText(redirectUrl).then(resolve).catch(reject);
          return;
        }
      }

      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}: ${url}`));
        return;
      }

      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

export class GitHubService {
  private repoSlug: string;

  constructor(repoSlug: string) {
    this.repoSlug = repoSlug;
  }

  async getRemoteVersion(): Promise<TemplateVersion> {
    const url = `${GITHUB_RAW_BASE}/${this.repoSlug}/main/template-version.json`;
    return fetchJson<TemplateVersion>(url);
  }

  async getChangelog(): Promise<string> {
    const url = `${GITHUB_RAW_BASE}/${this.repoSlug}/main/CHANGELOG.md`;
    return fetchText(url);
  }

  async getFileContent(path: string): Promise<string> {
    const url = `${GITHUB_RAW_BASE}/${this.repoSlug}/main/${path}`;
    return fetchText(url);
  }

  async listDirectory(path: string): Promise<RepoFile[]> {
    const url = `${GITHUB_API_BASE}/repos/${this.repoSlug}/contents/${path}`;
    return fetchJson<RepoFile[]>(url);
  }

  getCloneUrl(): string {
    return `https://github.com/${this.repoSlug}.git`;
  }
}
