import type { VehicleDamageReport } from '../types';
import { damageSeverityColor, damageSeverityLabel } from '../types';

interface Props {
  reports: VehicleDamageReport[];
}

export function VehicleDamagePanel({ reports }: Props) {
  const sorted = [...reports].sort((a, b) => b.reportedAt.localeCompare(a.reportedAt));
  const openCount = reports.filter((r) => r.status === 'open').length;

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Vehicle Damage Summary</h2>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          {openCount} open · {reports.length} total
        </span>
      </div>
      <div className="damage-list">
        {sorted.map((r) => (
          <div className="damage-row" key={r.id}>
            <div className="damage-vehicle">{r.vehicleId}</div>
            <div>
              <div className="damage-component">{r.component}</div>
              <div className="damage-description">{r.description}</div>
            </div>
            <div className="damage-badges">
              <span
                className="severity-pill"
                style={{ color: damageSeverityColor[r.severity] }}
              >
                {damageSeverityLabel[r.severity]}
              </span>
              <span className={`status-pill ${r.status}`}>
                {r.status === 'resolved' ? 'Resolved' : 'Open'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
