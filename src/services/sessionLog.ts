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
    (f) => /_RoundTable(_Vol\d+)?\.md$/.test(f)
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

/**
 * Extended statistics for Session Statistics dashboard.
 */
export interface SessionStats {
  totalFiles: number;
  totalSessions: number;
  completedSessions: number;
  openSessions: number;
  avgSessionsPerDay: number;
  uniqueParticipants: string[];
  mostActiveDay: string;
  mostActiveCount: number;
  activityStreak: number;
  sessionsLast7Days: number;
}

export function getExtendedStats(files: RoundTableFile[]): SessionStats {
  let totalSessions = 0;
  let completedSessions = 0;
  let openSessions = 0;
  const participantSet = new Set<string>();
  const daySessionMap = new Map<string, number>();

  for (const file of files) {
    totalSessions += file.sessions.length;
    daySessionMap.set(file.date, (daySessionMap.get(file.date) || 0) + file.sessions.length);

    for (const session of file.sessions) {
      if (session.status === 'OPEN') { openSessions++; }
      if (session.status === 'COMPLETE') { completedSessions++; }

      // Parse participants: "AM (Conductor), MT (Technologist)" → ["AM", "MT"]
      const parts = session.participants.split(',');
      for (const p of parts) {
        const code = p.trim().split(/\s/)[0];
        if (code) { participantSet.add(code); }
      }
    }
  }

  // Most active day
  let mostActiveDay = 'N/A';
  let mostActiveCount = 0;
  for (const [day, count] of daySessionMap) {
    if (count > mostActiveCount) {
      mostActiveCount = count;
      mostActiveDay = day;
    }
  }

  // Average sessions per day
  const daysWithSessions = daySessionMap.size;
  const avgSessionsPerDay = daysWithSessions > 0 ? Math.round((totalSessions / daysWithSessions) * 10) / 10 : 0;

  // Activity streak (consecutive days ending at today)
  const today = new Date();
  let streak = 0;
  const checkDate = new Date(today);
  while (true) {
    const dd = String(checkDate.getDate()).padStart(2, '0');
    const mm = String(checkDate.getMonth() + 1).padStart(2, '0');
    const yyyy = checkDate.getFullYear();
    const key = `${dd}-${mm}-${yyyy}`;
    if (daySessionMap.has(key)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  // Sessions in last 7 days
  let sessionsLast7Days = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    const key = `${dd}-${mm}-${yyyy}`;
    sessionsLast7Days += daySessionMap.get(key) || 0;
  }

  return {
    totalFiles: files.length,
    totalSessions,
    completedSessions,
    openSessions,
    avgSessionsPerDay,
    uniqueParticipants: Array.from(participantSet).sort(),
    mostActiveDay,
    mostActiveCount,
    activityStreak: streak,
    sessionsLast7Days,
  };
}
