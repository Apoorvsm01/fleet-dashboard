// Information classification mirrors Fleet Co-Pilot's in-vehicle taxonomy
// (skyui/lib/models/fleet_models.dart) so incident/telemetry records logged
// by technician drivers in the HMI map 1:1 onto what engineers review here.
// This dashboard does not import or run skyui code — the taxonomy is
// reproduced, not shared.

export type AutonomousState =
  | 'l4Autonomous'
  | 'shadowMode'
  | 'manualOverride'
  | 'disengaged';

export const autonomousStateLabel: Record<AutonomousState, string> = {
  l4Autonomous: 'L4 AUTONOMOUS',
  shadowMode: 'SHADOW MODE',
  manualOverride: 'MANUAL OVERRIDE',
  disengaged: 'DISENGAGED',
};

export type IncidentSubsystem =
  | 'perception'
  | 'motionPlanner'
  | 'localization'
  | 'hardwareSensor'
  | 'oddBoundary';

export const incidentSubsystemLabel: Record<IncidentSubsystem, string> = {
  perception: 'Perception',
  motionPlanner: 'Motion Planner',
  localization: 'Localization',
  hardwareSensor: 'Hardware/Sensor',
  oddBoundary: 'ODD Boundary',
};

export type IncidentSeverity =
  | 'sev1CriticalTakeover'
  | 'sev2OperationalHesitation'
  | 'sev3ComfortDeviation';

export const incidentSeverityLabel: Record<IncidentSeverity, string> = {
  sev1CriticalTakeover: 'SEV1 · Critical Takeover',
  sev2OperationalHesitation: 'SEV2 · Operational Hesitation',
  sev3ComfortDeviation: 'SEV3 · Comfort Deviation',
};

// Matches AppColors.error / .accent / .textSecondary severity styling used
// on the vehicle-side incident feed. Values are the validated status-color
// steps (dataviz skill palette) — SEV3 intentionally uses neutral ink rather
// than a status color, since a "comfort deviation" isn't an alarm state.
export const incidentSeverityColor: Record<IncidentSeverity, string> = {
  sev1CriticalTakeover: 'var(--status-critical)',
  sev2OperationalHesitation: 'var(--status-serious)',
  sev3ComfortDeviation: 'var(--text-secondary)',
};

export interface FleetIncident {
  id: string;
  timestamp: string; // ISO 8601
  subsystem: IncidentSubsystem;
  severity: IncidentSeverity;
  label: string;
  latitude?: number;
  longitude?: number;
  roadSegmentName?: string;
  headingDegrees?: number;
  priorDisengagementCount: number;
  isSimulated: boolean;
  loggedBy?: string; // technician driver id, office-side addition
}

export type QuickTagType = 'phantomBrake' | 'plannerFreeze' | 'sensorDrop';

export const quickTagLabel: Record<QuickTagType, string> = {
  phantomBrake: 'Phantom Brake',
  plannerFreeze: 'Planner Freeze',
  sensorDrop: 'Sensor Drop',
};

export interface OddCoverageMatrix {
  dayPasses: number;
  nightPasses: number;
  rainWetPasses: number;
  denseTrafficPasses: number;
}

export interface RouteCampaign {
  name: string;
  targetPasses: number;
  completedPasses: number;
  coverage: OddCoverageMatrix;
}

export interface PayloadIngestionStatus {
  writeRateMBps: number;
  storageUsedGB: number;
  storageCapacityGB: number;
  sensorStreamsSynced: boolean;
}

export type GazeState = 'roadFacing' | 'distracted';

export const gazeStateLabel: Record<GazeState, string> = {
  roadFacing: 'Gaze On Road',
  distracted: 'Gaze Distracted',
};

export interface DriverMonitoringState {
  gazeState: GazeState;
  drowsinessScore: number;
  handsOnWheel: boolean;
  takeoverReactionLatencyMs: number;
}

export interface VehicleDynamicsTelemetry {
  autonomousState: AutonomousState;
  longitudinalJerkMps3: number;
  lateralAccelerationG: number;
  steeringTorqueOverrideNm: number;
  brakePedalPressureDelta: number;
  timeToCollisionSeconds: number;
  headwayGapMeters: number;
}

export type DamageSeverity = 'cosmetic' | 'minor' | 'moderate';

export const damageSeverityLabel: Record<DamageSeverity, string> = {
  cosmetic: 'Cosmetic',
  minor: 'Minor',
  moderate: 'Moderate',
};

export const damageSeverityColor: Record<DamageSeverity, string> = {
  cosmetic: 'var(--text-secondary)',
  minor: 'var(--status-warning)',
  moderate: 'var(--status-serious)',
};

export type DamageStatus = 'open' | 'resolved';

export interface VehicleDamageReport {
  id: string;
  vehicleId: string;
  component: string;
  severity: DamageSeverity;
  description: string;
  reportedAt: string; // ISO 8601
  status: DamageStatus;
}

/** Positive/morale-facing weekly team stats — not a safety metric source. */
export interface TeamWinsStats {
  issuesResolvedThisWeek: number;
  daysSinceLastCriticalIncident: number;
  safeMilesLoggedThisWeek: number;
  positiveShoutouts: number;
  highlights: string[];
}
