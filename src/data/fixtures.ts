import type {
  DriverMonitoringState,
  FleetIncident,
  PayloadIngestionStatus,
  RouteCampaign,
  TeamWinsStats,
  VehicleDamageReport,
  VehicleDynamicsTelemetry,
} from '../types';

// All fixtures below are simulated placeholders standing in for what would
// eventually sync from Fleet Co-Pilot's onboard logging stack. There is no
// backend, ingestion pipeline, or live link behind this dashboard yet.

export const incidents: FleetIncident[] = [
  {
    id: 'hotspot-4th-market',
    timestamp: '2026-09-20T14:12:00',
    subsystem: 'motionPlanner',
    severity: 'sev1CriticalTakeover',
    label: 'Unprotected left hesitation',
    latitude: 37.7793,
    longitude: -122.4193,
    roadSegmentName: '4th & Market',
    headingDegrees: 35,
    priorDisengagementCount: 3,
    isSimulated: true,
    loggedBy: 'tech-0231',
  },
  {
    id: 'hotspot-5th-mission',
    timestamp: '2026-09-18T09:40:00',
    subsystem: 'perception',
    severity: 'sev2OperationalHesitation',
    label: 'Glare blindness, false positive brake',
    latitude: 37.7823,
    longitude: -122.4076,
    roadSegmentName: '5th & Mission',
    headingDegrees: 10,
    priorDisengagementCount: 1,
    isSimulated: true,
    loggedBy: 'tech-0117',
  },
  {
    id: 'hotspot-howard-tunnel',
    timestamp: '2026-09-15T22:05:00',
    subsystem: 'localization',
    severity: 'sev2OperationalHesitation',
    label: 'Tunnel GPS loss, multipath drift',
    latitude: 37.7871,
    longitude: -122.3996,
    roadSegmentName: 'Howard St Underpass',
    headingDegrees: 90,
    priorDisengagementCount: 2,
    isSimulated: true,
    loggedBy: 'tech-0231',
  },
  {
    id: 'quicktag-demo-1',
    timestamp: '2026-09-26T16:48:00',
    subsystem: 'motionPlanner',
    severity: 'sev3ComfortDeviation',
    label: 'Phantom Brake',
    priorDisengagementCount: 0,
    isSimulated: true,
    loggedBy: 'tech-0044',
  },
  {
    id: 'quicktag-demo-2',
    timestamp: '2026-09-26T11:03:00',
    subsystem: 'hardwareSensor',
    severity: 'sev2OperationalHesitation',
    label: 'Sensor Drop',
    priorDisengagementCount: 0,
    isSimulated: true,
    loggedBy: 'tech-0117',
  },
];

export const demoDynamics: VehicleDynamicsTelemetry = {
  autonomousState: 'l4Autonomous',
  longitudinalJerkMps3: 0.8,
  lateralAccelerationG: 0.12,
  steeringTorqueOverrideNm: 0.12,
  brakePedalPressureDelta: 0.0,
  timeToCollisionSeconds: 6.4,
  headwayGapMeters: 32,
};

export const demoDms: DriverMonitoringState = {
  gazeState: 'roadFacing',
  drowsinessScore: 0.08,
  handsOnWheel: true,
  takeoverReactionLatencyMs: 850,
};

export const demoCampaign: RouteCampaign = {
  name: 'Downtown ODD Loop',
  targetPasses: 10,
  completedPasses: 6,
  coverage: {
    dayPasses: 4,
    nightPasses: 1,
    rainWetPasses: 1,
    denseTrafficPasses: 2,
  },
};

export const demoIngestion: PayloadIngestionStatus = {
  writeRateMBps: 148.4,
  storageUsedGB: 842.5,
  storageCapacityGB: 1024,
  sensorStreamsSynced: true,
};

export const damageReports: VehicleDamageReport[] = [
  {
    id: 'dmg-av07-bumper',
    vehicleId: 'AV-07',
    component: 'Front bumper',
    severity: 'cosmetic',
    description:
      'Minor scuff from curb contact during a low-speed parking maneuver.',
    reportedAt: '2026-09-19T08:30:00',
    status: 'resolved',
  },
  {
    id: 'dmg-av07-lidar',
    vehicleId: 'AV-07',
    component: 'Roof LIDAR housing',
    severity: 'minor',
    description:
      'Hairline scratch on the housing shell; sensor calibration unaffected.',
    reportedAt: '2026-09-24T13:10:00',
    status: 'open',
  },
  {
    id: 'dmg-av03-sensor-pod',
    vehicleId: 'AV-03',
    component: 'Rear sensor pod',
    severity: 'moderate',
    description:
      'Cracked mount bracket after light contact; sensor offline pending replacement part.',
    reportedAt: '2026-09-25T17:45:00',
    status: 'open',
  },
  {
    id: 'dmg-av11-mirror-cam',
    vehicleId: 'AV-11',
    component: 'Side mirror camera',
    severity: 'cosmetic',
    description: 'Scuffed housing from a tight garage entry; no functional impact.',
    reportedAt: '2026-09-21T10:05:00',
    status: 'resolved',
  },
];

export const teamWins: TeamWinsStats = {
  issuesResolvedThisWeek: 9,
  daysSinceLastCriticalIncident: 6,
  safeMilesLoggedThisWeek: 2140,
  positiveShoutouts: 4,
  highlights: [
    'SEV1 incidents down 40% versus last month.',
    'AV-11 logged 500 miles incident-free this week.',
    'Night-drive ODD coverage back on target after last week’s gap.',
  ],
};
