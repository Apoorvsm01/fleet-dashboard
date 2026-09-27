import type {
  DriverMonitoringState,
  FleetIncident,
  PayloadIngestionStatus,
  RouteCampaign,
  VehicleDynamicsTelemetry,
} from '../types';
import { autonomousStateLabel, gazeStateLabel } from '../types';

interface SummaryCardsProps {
  incidents: FleetIncident[];
  dynamics: VehicleDynamicsTelemetry;
}

export function SummaryCards({ incidents, dynamics }: SummaryCardsProps) {
  const sev1Count = incidents.filter((i) => i.severity === 'sev1CriticalTakeover').length;
  const sev2Count = incidents.filter((i) => i.severity === 'sev2OperationalHesitation').length;

  return (
    <div className="summary-grid">
      <div className="panel">
        <h2>Total Logged Incidents</h2>
        <div className="stat-value">{incidents.length}</div>
        <div className="stat-label">across all subsystems</div>
      </div>
      <div className="panel">
        <h2>Critical Takeovers</h2>
        <div className="stat-value" style={{ color: 'var(--status-critical)' }}>
          {sev1Count}
        </div>
        <div className="stat-label">SEV1 events</div>
      </div>
      <div className="panel">
        <h2>Operational Hesitations</h2>
        <div className="stat-value" style={{ color: 'var(--status-serious)' }}>
          {sev2Count}
        </div>
        <div className="stat-label">SEV2 events</div>
      </div>
      <div className="panel">
        <h2>Last Known Autonomy State</h2>
        <div className="stat-value">{autonomousStateLabel[dynamics.autonomousState]}</div>
        <div className="stat-label">headway {dynamics.headwayGapMeters} m</div>
      </div>
    </div>
  );
}

export function OddCoveragePanel({ campaign }: { campaign: RouteCampaign }) {
  const pct = Math.min(1, campaign.completedPasses / campaign.targetPasses) * 100;
  return (
    <div className="panel">
      <h2>ODD Coverage — {campaign.name}</h2>
      <div className="kv-row">
        <span>Passes completed</span>
        <span>
          {campaign.completedPasses} / {campaign.targetPasses}
        </span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div style={{ marginTop: 14 }}>
        <div className="coverage-row">
          <span>Day passes</span>
          <span>{campaign.coverage.dayPasses}</span>
        </div>
        <div className="coverage-row">
          <span>Night passes</span>
          <span>{campaign.coverage.nightPasses}</span>
        </div>
        <div className="coverage-row">
          <span>Rain/wet passes</span>
          <span>{campaign.coverage.rainWetPasses}</span>
        </div>
        <div className="coverage-row">
          <span>Dense traffic passes</span>
          <span>{campaign.coverage.denseTrafficPasses}</span>
        </div>
      </div>
    </div>
  );
}

export function IngestionPanel({ ingestion }: { ingestion: PayloadIngestionStatus }) {
  const pct = (ingestion.storageUsedGB / ingestion.storageCapacityGB) * 100;
  return (
    <div className="panel">
      <h2>Payload Ingestion</h2>
      <div className="kv-row">
        <span>Write rate</span>
        <span>{ingestion.writeRateMBps.toFixed(1)} MB/s</span>
      </div>
      <div className="kv-row">
        <span>Storage used</span>
        <span>
          {ingestion.storageUsedGB.toFixed(1)} / {ingestion.storageCapacityGB} GB
        </span>
      </div>
      <div className="progress-track">
        <div className="progress-fill storage" style={{ width: `${pct}%` }} />
      </div>
      <div className="kv-row" style={{ marginTop: 12 }}>
        <span>Sensor streams synced</span>
        <span
          style={{
            color: ingestion.sensorStreamsSynced
              ? 'var(--status-good)'
              : 'var(--status-critical)',
          }}
        >
          {ingestion.sensorStreamsSynced ? 'Yes' : 'No'}
        </span>
      </div>
    </div>
  );
}

export function DriverMonitoringPanel({ dms }: { dms: DriverMonitoringState }) {
  return (
    <div className="panel">
      <h2>Driver Monitoring (last sync)</h2>
      <div className="kv-row">
        <span>Gaze state</span>
        <span>{gazeStateLabel[dms.gazeState]}</span>
      </div>
      <div className="kv-row">
        <span>Drowsiness score</span>
        <span>{dms.drowsinessScore.toFixed(2)}</span>
      </div>
      <div className="kv-row">
        <span>Hands on wheel</span>
        <span>{dms.handsOnWheel ? 'Yes' : 'No'}</span>
      </div>
      <div className="kv-row">
        <span>Takeover reaction latency</span>
        <span>{dms.takeoverReactionLatencyMs} ms</span>
      </div>
    </div>
  );
}
