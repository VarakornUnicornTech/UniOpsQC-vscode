import * as fs from 'fs';
import * as path from 'path';

export interface TeamMember {
  code: string;
  name: string;
  role: string;
  duties: string;
}

export interface TeamRoster {
  filename: string;
  teamName: string;
  fullPath: string;
  context: string;
  codingStyle: string;
  members: TeamMember[];
}

/**
 * Scan .claude/Team Roster/ for team roster markdown files.
 * Parses the roster table and metadata from each file.
 */
export function scanRosters(workspaceRoot: string): TeamRoster[] {
  const rosterDir = path.join(workspaceRoot, '.claude', 'Team Roster');
  if (!fs.existsSync(rosterDir)) { return []; }

  const files = fs.readdirSync(rosterDir)
    .filter((f) => f.endsWith('.md'))
    .sort();

  return files.map((filename) => {
    const fullPath = path.join(rosterDir, filename);
    const content = fs.readFileSync(fullPath, 'utf-8');

    // Extract team name from first heading
    const titleMatch = content.match(/^#\s+.+\((.+)\)/m);
    const teamName = titleMatch ? titleMatch[1].trim() : filename.replace('.md', '');

    // Extract Context line
    const contextMatch = content.match(/\*\*Context:\*\*\s*(.+)/);
    const context = contextMatch ? contextMatch[1].trim() : '';

    // Extract Coding Style line
    const styleMatch = content.match(/\*\*Coding Style:\*\*\s*(.+)/);
    const codingStyle = styleMatch ? styleMatch[1].trim() : '';

    // Parse roster table: | Code | Name | Role | Core Duties |
    const members: TeamMember[] = [];
    const tableLines = content.split('\n').filter((line) =>
      line.startsWith('|') && !line.includes('----') && !line.includes('Code')
    );

    for (const line of tableLines) {
      const cells = line.split('|').map((c) => c.trim()).filter(Boolean);
      if (cells.length >= 4) {
        members.push({
          code: cells[0].replace(/\*\*/g, ''),
          name: cells[1],
          role: cells[2],
          duties: cells[3],
        });
      }
    }

    return { filename, teamName, fullPath, context, codingStyle, members };
  }).filter((r) => r.members.length > 0);
}
