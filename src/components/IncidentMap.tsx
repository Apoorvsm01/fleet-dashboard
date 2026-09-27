import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import type { FleetIncident } from '../types';
import { incidentSeverityColor, incidentSeverityLabel, incidentSubsystemLabel } from '../types';

// Status-color steps (dataviz skill palette) as plain hex — CSS custom
// properties can't be read inside a Leaflet divIcon's static HTML string.
const severityHex: Record<FleetIncident['severity'], string> = {
  sev1CriticalTakeover: '#d03b3b',
  sev2OperationalHesitation: '#ec835a',
  sev3ComfortDeviation: '#c3c2b7',
};

function hotspotIcon(color: string) {
  return L.divIcon({
    className: 'hotspot-marker',
    html: `<span style="
      display:block;width:16px;height:16px;border-radius:999px;
      background:${color};border:2px solid #0d0d0d;
      box-shadow:0 0 0 1px rgba(255,255,255,0.35);
    "></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8],
  });
}

interface Props {
  incidents: FleetIncident[];
}

export function IncidentMap({ incidents }: Props) {
  const hotspots = incidents.filter(
    (i): i is FleetIncident & { latitude: number; longitude: number } =>
      i.latitude != null && i.longitude != null,
  );

  const centerLat =
    hotspots.reduce((sum, h) => sum + h.latitude, 0) / (hotspots.length || 1);
  const centerLng =
    hotspots.reduce((sum, h) => sum + h.longitude, 0) / (hotspots.length || 1);

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Hazard Route Map</h2>
      </div>
      <div className="map-container">
        <MapContainer
          center={[centerLat || 37.7793, centerLng || -122.4193]}
          zoom={14}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%', background: '#1a1a19' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {hotspots.map((h) => (
            <Marker
              key={h.id}
              position={[h.latitude, h.longitude]}
              icon={hotspotIcon(severityHex[h.severity])}
            >
              <Popup>
                <strong>{h.roadSegmentName ?? h.label}</strong>
                <br />
                {incidentSeverityLabel[h.severity]}
                <br />
                {incidentSubsystemLabel[h.subsystem]}
                <br />
                {h.priorDisengagementCount} prior disengagement
                {h.priorDisengagementCount === 1 ? '' : 's'}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="map-legend">
        <div className="map-legend-item">
          <span
            className="map-legend-dot"
            style={{ background: 'var(--status-critical)' }}
          />
          <span>{incidentSeverityLabel.sev1CriticalTakeover}</span>
        </div>
        <div className="map-legend-item">
          <span
            className="map-legend-dot"
            style={{ background: 'var(--status-serious)' }}
          />
          <span>{incidentSeverityLabel.sev2OperationalHesitation}</span>
        </div>
        <div className="map-legend-item">
          <span
            className="map-legend-dot"
            style={{ background: 'var(--text-secondary)' }}
          />
          <span>{incidentSeverityLabel.sev3ComfortDeviation}</span>
        </div>
      </div>
    </div>
  );
}

export function HotspotsPanel({ incidents }: Props) {
  const ranked = incidents
    .filter((i) => i.roadSegmentName)
    .sort((a, b) => b.priorDisengagementCount - a.priorDisengagementCount);

  return (
    <div className="panel">
      <h2>Recent Hotspots</h2>
      <div className="hotspot-list">
        {ranked.map((h, index) => (
          <div className="hotspot-row" key={h.id}>
            <span className="hotspot-rank">{index + 1}</span>
            <div className="hotspot-body">
              <div className="hotspot-name">{h.roadSegmentName}</div>
              <div className="hotspot-meta">
                {h.label} · {incidentSubsystemLabel[h.subsystem]} ·{' '}
                {h.priorDisengagementCount} prior
                {h.priorDisengagementCount === 1 ? '' : 's'}
              </div>
            </div>
            <span
              className="severity-pill"
              style={{ color: incidentSeverityColor[h.severity] }}
            >
              {incidentSeverityLabel[h.severity].split(' · ')[0]}
            </span>
          </div>
        ))}
        {ranked.length === 0 && (
          <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>
            No geotagged hotspots logged yet.
          </div>
        )}
      </div>
    </div>
  );
}
