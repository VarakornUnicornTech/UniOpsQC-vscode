# RoundTable Hub

**Management hub for RoundTable Framework** — the multi-team AI governance framework for Claude Code.

By [Unicorn Tech Int Co.,Ltd.](https://github.com/VarakornUnicornTech)

## Features

### One-Click Install
Install the RoundTable Framework into any workspace with a single click. Sets up your `.claude/` directory with policies, team rosters, skills, and configuration.

### Visual Project Setup
Configure your `ProjectEnvironment.md` through an interactive wizard — no manual file editing required. Choose project mode (Centralized/Decentralized), set project root, and configure team settings.

### Version Check & Update Notifications
Automatically checks for framework updates on startup. Compare your local version against the latest release and see what's changed in the changelog.

### Smart Update Manager (Pro)
Review file-by-file changes with AI-powered merge recommendations. Selectively apply updates with automatic backup and one-click rollback.

### Session Log Dashboard (Pro)
Browse your RoundTable session history directly from the sidebar. View session stats, open/closed status, and click to open any log file instantly.

### Pro License System
Activate Pro features with a license key from our store. Supports online validation via LemonSqueezy API with offline fallback for uninterrupted work.

## Quick Start

1. Open a workspace in VS Code
2. Click the RoundTable Hub icon in the Activity Bar
3. Click **Install RoundTable Framework**
4. Run **Setup Project** to configure your environment

## Commands

| Command | Description |
|---------|-------------|
| `RoundTable: Install Framework` | Clone and install the framework into your workspace |
| `RoundTable: Setup Project` | Configure ProjectEnvironment.md via interactive wizard |
| `RoundTable: Check for Updates` | Compare local version against latest release |
| `RoundTable: Update Framework` | Apply framework updates with backup (Pro) |

## Requirements

- VS Code 1.110.0 or later
- Git installed and available in PATH
- Internet connection (for GitHub API access)

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `roundtable.repoUrl` | `VarakornUnicornTech/unicorn_roundtable_framework_repo` | GitHub repository for the framework template |
| `roundtable.licenseKey` | (empty) | License key for Pro features |
| `roundtable.autoCheckUpdates` | `true` | Auto-check for updates on startup |

## Free vs Pro

| Feature | Free | Pro |
|---------|------|-----|
| Install Framework | Yes | Yes |
| Setup Project | Yes | Yes |
| Check for Updates | Yes | Yes |
| Update Manager | - | Yes |
| Auto-backup & Rollback | - | Yes |
| Session Log Dashboard | - | Yes |

## Get Pro

Upgrade to Pro to unlock the full power of RoundTable Hub — Update Manager, Session Log Dashboard, auto-backup, and more.

## About RoundTable Framework

RoundTable is a multi-team AI governance framework for Claude Code that enables structured collaboration between specialized AI teams (Overseer, Monolith, Syndicate, Arcade) with built-in policies, logging, and quality assurance.

Learn more: [RoundTable Framework on GitHub](https://github.com/VarakornUnicornTech/unicorn_roundtable_framework_repo)

## Contributing

Found a bug or have a feature request? [Open an issue](https://github.com/VarakornUnicornTech/roundtable-hub-vscode/issues) on GitHub.

## License

MIT - Unicorn Tech Int Co.,Ltd.
