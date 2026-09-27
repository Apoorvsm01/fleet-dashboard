import 'leaflet/dist/leaflet.css';
import { IncidentTable } from './components/IncidentTable';
import { HotspotsPanel, IncidentMap } from './components/IncidentMap';
import {
  DriverMonitoringPanel,
  IngestionPanel,
  OddCoveragePanel,
  SummaryCards,
} from './components/SummaryPanels';
import { TeamWinsPanel } from './components/TeamWinsPanel';
import { VehicleDamagePanel } from './components/VehicleDamagePanel';
import {
  damageReports,
  demoCampaign,
  demoDms,
  demoDynamics,
  demoIngestion,
  incidents,
  teamWins,
} from './data/fixtures';

export default function App() {
  return (
    <div className="app">
      <div className="app-header">
        <div>
          <h1>Fleet Dashboard</h1>
          <div className="subtitle">
            Office review tool for data logged by technician drivers in Fleet Co-Pilot
          </div>
        </div>
        <span className="fixture-tag">Simulated fixture data</span>
      </div>

      <SummaryCards incidents={incidents} dynamics={demoDynamics} />

      <div className="section-gap">
        <TeamWinsPanel wins={teamWins} />
      </div>

      <div className="main-grid section-gap">
        <IncidentTable incidents={incidents} />
        <div className="side-stack">
          <OddCoveragePanel campaign={demoCampaign} />
          <IngestionPanel ingestion={demoIngestion} />
          <DriverMonitoringPanel dms={demoDms} />
        </div>
      </div>

      <div className="map-grid section-gap">
        <IncidentMap incidents={incidents} />
        <HotspotsPanel incidents={incidents} />
      </div>

      <VehicleDamagePanel reports={damageReports} />
    </div>
  );
}
