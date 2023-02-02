export interface IActivity {
    date: Date; // date when user opened app
    dailyStepCountSamples: Number;
    dailyDistanceWalkingRunningSamples: Number;
    dailyDistanceSwimmingSamples: Number;
    dailyDistanceCyclingSamples: Number;
    dailyFlightsClimbedSamples: Number;
    activeEnergyBurned: Number;
    basalEnergyBurned: Number;
    appleStandTime: Number;
    metadata: {userID: String};
    timeseries: {
      timeField: 'date',
      metaField: 'metadata',
    };
}
