# UniOpsQC Hub

**Management hub for UniOpsQC Framework** — the multi-team AI governance framework for Claude Code.

By [Unicorn Tech Int Co.,Ltd.](https://github.com/VarakornUnicornTech)

## Features

### One-Click Install
Install the UniOpsQC Framework into any workspace with a single click. Sets up your `.claude/` directory with policies, team rosters, skills, and configuration.

### Visual Project Setup
Configure your `ProjectEnvironment.md` through an interactive wizard — no manual file editing required. Choose project mode (Centralized/Decentralized), set project root, and configure team settings.

### Version Check & Update Notifications
Automatically checks for framework updates on startup. Compare your local version against the latest release and see what's changed in the changelog.

### Smart Update Manager (Pro)
Review file-by-file changes with AI-powered merge recommendations. Selectively apply updates with automatic backup and one-click rollback.

### Session Log Dashboard (Pro)
Browse your RoundTable session history directly from the sidebar. View session stats, open/closed status, and click to open any log file instantly.

### Visual ProjectEnvironment Editor (Pro)
Add, edit, and remove projects through a sidebar form UI instead of editing markdown manually.

### Framework Health Check (Pro)
Verify framework integrity with a score and detailed file-by-file status report covering core files, policies, and team rosters.

### Policy Browser (Pro)
Browse and open all governance policy files directly from the sidebar — quick access to every UniOpsQC policy section.

### Team Roster Viewer (Pro)
View all teams, members, roles, and responsibilities in a collapsible tree view. Click through to open the full roster file.

### Session Statistics (Pro)
Track your UniOpsQC session activity with metrics like total sessions, daily averages, activity streaks, and team participation.

### Quick Session Open (Free)
One-click button to create or open today's RoundTable session file — no manual file navigation needed.

### Pro License System
Activate Pro features with a license key from our store. Supports online validation via LemonSqueezy API with offline fallback for uninterrupted work.

## Requirements

- VS Code 1.110.0 or later
- Git installed and available in PATH
- Internet connection (for GitHub API access)

## Quick Start

1. Open a workspace in VS Code
2. Click the **UniOpsQC Hub** icon in the Activity Bar
3. Click **Install UniOpsQC Framework**
4. Run **Setup Project** to configure your environment

## Installation

Search for **UniOpsQC Hub** in the VS Code Extensions Marketplace, or install directly via the extension ID:

```
UnicornTech.roundtable-hub
```

Or via the VS Code CLI:

```bash
code --install-extension UnicornTech.roundtable-hub
```

## Commands

| Command | Description |
|---------|-------------|
| `UniOpsQC: Install Framework` | Clone and install the framework into your workspace |
| `UniOpsQC: Setup Project` | Configure ProjectEnvironment.md via interactive wizard |
| `UniOpsQC: Check for Updates` | Compare local version against latest release |
| `UniOpsQC: Update Framework` | Apply framework updates with backup (Pro) |
| `UniOpsQC: Push to Hub` | Push your project to the connected Hub API (Pro) |

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `roundtable.repoUrl` | `VarakornUnicornTech/UniOpsQC` | GitHub repository for the UniOpsQC Framework template |
| `roundtable.licenseKey` | (empty) | License key for Pro features |
| `roundtable.autoCheckUpdates` | `true` | Auto-check for updates on startup |
| `roundtable.hubApiPath` | (empty) | Path to Hub.Api project for local Hub integration |
| `roundtable.hubApiUrl` | `http://localhost:5200` | URL of the running Hub API server |

## Free vs Pro

| Feature | Free | Pro |
|---------|------|-----|
| Install Framework | Yes | Yes |
| Setup Project | Yes | Yes |
| Check for Updates | Yes | Yes |
| Quick Session Open | Yes | Yes |
| Update Manager | - | Yes |
| Auto-backup & Rollback | - | Yes |
| Session Log Dashboard | - | Yes |
| ProjectEnvironment Editor | - | Yes |
| Framework Health Check | - | Yes |
| Policy Browser | - | Yes |
| Team Roster Viewer | - | Yes |
| Session Statistics | - | Yes |

## Free Trial

**All Pro features are free for 60 days** — no license key required. Install the extension and start using every feature immediately. When the trial ends, free-tier features remain available and you can upgrade to Pro to keep the full experience.

## Get Pro

Upgrade to Pro to unlock the full power of UniOpsQC Hub — Update Manager, Session Logs, Policy Browser, Team Roster Viewer, Health Check, Statistics, and more.

## About UniOpsQC Framework

UniOpsQC is a multi-team AI governance framework for Claude Code that enables structured collaboration between specialized AI teams (Overseer, Monolith, Syndicate, Arcade) with built-in policies, logging, and quality assurance.

This extension manages the framework directly from inside VS Code — install, configure, update, and monitor your UniOpsQC setup without leaving the editor.

Learn more: [UniOpsQC Framework on GitHub](https://github.com/VarakornUnicornTech/UniOpsQC)

## Contributing

Found a bug or have a feature request? [Open an issue](https://github.com/VarakornUnicornTech/UniOpsQC-vscode/issues) on GitHub.

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and contribution guidelines.

## License

MIT — Unicorn Tech Int Co.,Ltd.
