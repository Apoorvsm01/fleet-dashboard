import { useMemo, useState } from 'react';
import type { FleetIncident, IncidentSeverity, IncidentSubsystem } from '../types';
import {
  incidentSeverityColor,
  incidentSeverityLabel,
  incidentSubsystemLabel,
} from '../types';

interface Props {
  incidents: FleetIncident[];
}

export function IncidentTable({ incidents }: Props) {
  const [subsystemFilter, setSubsystemFilter] = useState<IncidentSubsystem | 'all'>('all');
  const [severityFilter, setSeverityFilter] = useState<IncidentSeverity | 'all'>('all');

  const rows = useMemo(() => {
    return incidents
      .filter((i) => subsystemFilter === 'all' || i.subsystem === subsystemFilter)
      .filter((i) => severityFilter === 'all' || i.severity === severityFilter)
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  }, [incidents, subsystemFilter, severityFilter]);

  return (
    <div className="panel">
      <h2>Incident Log</h2>
      <div className="filters">
        <select
          value={subsystemFilter}
          onChange={(e) => setSubsystemFilter(e.target.value as IncidentSubsystem | 'all')}
        >
          <option value="all">All subsystems</option>
          {(Object.keys(incidentSubsystemLabel) as IncidentSubsystem[]).map((s) => (
            <option key={s} value={s}>
              {incidentSubsystemLabel[s]}
            </option>
          ))}
        </select>
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value as IncidentSeverity | 'all')}
        >
          <option value="all">All severities</option>
          {(Object.keys(incidentSeverityLabel) as IncidentSeverity[]).map((s) => (
            <option key={s} value={s}>
              {incidentSeverityLabel[s]}
            </option>
          ))}
        </select>
      </div>
      <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Subsystem</th>
            <th>Severity</th>
            <th>Description</th>
            <th>Road Segment</th>
            <th>Prior Disengagements</th>
            <th>Logged By</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((i) => (
            <tr key={i.id}>
              <td>{new Date(i.timestamp).toLocaleString()}</td>
              <td>{incidentSubsystemLabel[i.subsystem]}</td>
              <td>
                <span
                  className="severity-pill"
                  style={{ color: incidentSeverityColor[i.severity] }}
                >
                  {incidentSeverityLabel[i.severity]}
                </span>
              </td>
              <td>{i.label}</td>
              <td>{i.roadSegmentName ?? '—'}</td>
              <td>{i.priorDisengagementCount}</td>
              <td>{i.loggedBy ?? '—'}</td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={7} style={{ color: 'var(--text-secondary)' }}>
                No incidents match the current filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}
