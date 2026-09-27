import type { TeamWinsStats } from '../types';

interface Props {
  wins: TeamWinsStats;
}

export function TeamWinsPanel({ wins }: Props) {
  return (
    <div className="panel team-wins">
      <h2>Team Wins This Week</h2>
      <div className="team-wins-grid">
        <div className="team-wins-stat">
          <div className="stat-value">{wins.issuesResolvedThisWeek}</div>
          <div className="stat-label">Issues resolved</div>
        </div>
        <div className="team-wins-stat">
          <div className="stat-value">{wins.daysSinceLastCriticalIncident}</div>
          <div className="stat-label">Days since last SEV1</div>
        </div>
        <div className="team-wins-stat">
          <div className="stat-value">
            {wins.safeMilesLoggedThisWeek.toLocaleString()}
          </div>
          <div className="stat-label">Safe miles logged</div>
        </div>
        <div className="team-wins-stat">
          <div className="stat-value">{wins.positiveShoutouts}</div>
          <div className="stat-label">Driver shoutouts</div>
        </div>
      </div>
      <div className="team-wins-highlights">
        {wins.highlights.map((h) => (
          <div className="team-wins-highlight" key={h}>
            <span className="dot" />
            <span>{h}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
