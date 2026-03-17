<p align="center">
  <img src="media/uniopsqc-vscode_braner.png" alt="UniOpsQC Hub for VS Code" width="100%">
</p>

# UniOpsQC Hub for VS Code

**Management hub for UniOpsQC Framework** — the multi-team AI governance framework for Claude Code.

By [Unicorn Tech Int Co.,Ltd.](https://github.com/VarakornUnicornTech)

## Features

### One-Click Install
Install the UniOpsQC Framework into any workspace with a single click. Sets up your `.claude/` directory with policies, team rosters, skills, and configuration.

### Visual Project Setup
Configure your `ProjectEnvironment.md` through an interactive wizard — no manual file editing required. Choose project mode (Centralized/Decentralized), set project root, and configure team settings.

### Version Check & Update Notifications
Automatically checks for framework updates on startup. Compare your local version against the latest release and see what's changed in the changelog.

### Smart Update Manager
Review file-by-file changes with AI-powered merge recommendations. Selectively apply updates with automatic backup and one-click rollback.

### Session Log Dashboard
Browse your RoundTable session history directly from the sidebar. View session stats, open/closed status, and click to open any log file instantly.

### Visual ProjectEnvironment Editor
Add, edit, and remove projects through a sidebar form UI instead of editing markdown manually.

### Framework Health Check
Verify framework integrity with a score and detailed file-by-file status report covering core files, policies, and team rosters.

### Policy Browser
Browse and open all governance policy files directly from the sidebar — quick access to every UniOpsQC policy section.

### Team Roster Viewer
View all teams, members, roles, and responsibilities in a collapsible tree view. Click through to open the full roster file.

### Session Statistics
Track your UniOpsQC session activity with metrics like total sessions, daily averages, activity streaks, and team participation.

### Quick Session Open
One-click button to create or open today's RoundTable session file — no manual file navigation needed.

### Push to Hub (Subscription)
Push your project to the connected Hub API for centralized team management and reporting.

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
| `UniOpsQC: Update Framework` | Apply framework updates with backup |
| `UniOpsQC: Push to Hub` | Push your project to the connected Hub API (Subscription) |

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `roundtable.repoUrl` | `VarakornUnicornTech/UniOpsQC` | GitHub repository for the UniOpsQC Framework template |
| `roundtable.autoCheckUpdates` | `true` | Auto-check for updates on startup |
| `roundtable.hubApiPath` | (empty) | Path to Hub.Api project for local Hub integration |
| `roundtable.hubApiUrl` | `http://localhost:5200` | URL of the running Hub API server |

## Free vs Subscription

| Feature | Free | Subscription |
|---------|------|-------------|
| Install Framework | ✓ | ✓ |
| Setup Project | ✓ | ✓ |
| Check for Updates | ✓ | ✓ |
| Quick Session Open | ✓ | ✓ |
| Update Manager | ✓ | ✓ |
| Auto-backup & Rollback | ✓ | ✓ |
| Session Log Dashboard | ✓ | ✓ |
| ProjectEnvironment Editor | ✓ | ✓ |
| Framework Health Check | ✓ | ✓ |
| Policy Browser | ✓ | ✓ |
| Team Roster Viewer | ✓ | ✓ |
| Session Statistics | ✓ | ✓ |
| Push to Hub | — | ✓ |

## Hub API Subscription

**Push to Hub** connects your workspace to a running [UniOpsQC Hub API](https://github.com/VarakornUnicornTech/UniOpsQC) server for centralized project management and team reporting. All other features are fully free with no sign-up required.

## About UniOpsQC Framework

UniOpsQC is a multi-team AI governance framework for Claude Code that enables structured collaboration between specialized AI teams (Overseer, Monolith, Syndicate, Arcade) with built-in policies, logging, and quality assurance.

This extension manages the framework directly from inside VS Code — install, configure, update, and monitor your UniOpsQC setup without leaving the editor.

Learn more: [UniOpsQC Framework on GitHub](https://github.com/VarakornUnicornTech/UniOpsQC)

## Contributing

Found a bug or have a feature request? [Open an issue](https://github.com/VarakornUnicornTech/UniOpsQC-vscode/issues) on GitHub.

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and contribution guidelines.

## License

MIT — Unicorn Tech Int Co.,Ltd.
