import * as fs from 'fs';
import * as path from 'path';

export interface SessionEntry {
  sessionNumber: number;
  title: string;
  date: string;
  participants: string;
  status: string;
}

export interface RoundTableFile {
  filename: string;
  date: string;
  fullPath: string;
  sessions: SessionEntry[];
}

/**
 * Scan the RoundTable/ directory for session log files.
 * Returns files sorted by date (most recent first).
 */
export function scanRoundTableLogs(workspaceRoot: string): RoundTableFile[] {
  const roundTableDir = path.join(workspaceRoot, 'RoundTable');
  if (!fs.existsSync(roundTableDir)) { return []; }

  const files: RoundTableFile[] = [];

  const entries = fs.readdirSync(roundTableDir).filter(
    (f) => f.endsWith('_RoundTable.md') || f.endsWith('_RoundTable_Vol2.md') || f.endsWith('_RoundTable_Vol3.md')
  );

  for (const filename of entries) {
    const fullPath = path.join(roundTableDir, filename);
    try {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const sessions = parseSessionEntries(content);
      const dateMatch = filename.match(/^(\d{2}-\d{2}-\d{4})/);
      const date = dateMatch ? dateMatch[1] : 'unknown';

      files.push({ filename, date, fullPath, sessions });
    } catch {
      // Skip files that can't be read
    }
  }

  // Sort by date descending (most recent first)
  files.sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return files;
}

/**
 * Parse session entries from a RoundTable markdown file.
 */
function parseSessionEntries(content: string): SessionEntry[] {
  const sessions: SessionEntry[] = [];
  const sessionRegex = /## Session (\d+)\s*—\s*(.+)\n\*\*Date:\*\*\s*(.+)\n\*\*Participants:\*\*\s*(.+)\n\*\*Status:\*\*\s*(.+)/g;

  let match;
  while ((match = sessionRegex.exec(content)) !== null) {
    sessions.push({
      sessionNumber: parseInt(match[1], 10),
      title: match[2].trim(),
      date: match[3].trim(),
      participants: match[4].trim(),
      status: match[5].trim(),
    });
  }

  return sessions;
}

/**
 * Parse DD-MM-YYYY date string to Date object.
 */
function parseDate(dateStr: string): Date {
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
  }
  return new Date(0);
}

/**
 * Get summary stats for dashboard display.
 */
export function getLogStats(files: RoundTableFile[]): {
  totalFiles: number;
  totalSessions: number;
  lastSessionDate: string;
  openSessions: number;
} {
  let totalSessions = 0;
  let openSessions = 0;
  let lastSessionDate = 'N/A';

  for (const file of files) {
    totalSessions += file.sessions.length;
    for (const session of file.sessions) {
      if (session.status === 'OPEN') { openSessions++; }
    }
  }

  if (files.length > 0) {
    lastSessionDate = files[0].date;
  }

  return {
    totalFiles: files.length,
    totalSessions,
    lastSessionDate,
    openSessions,
  };
}
