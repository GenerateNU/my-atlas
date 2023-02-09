export interface IActivity {
    date: String; // date when user opened app
    dailyStepCountSamples?: Number;
    dailyDistanceWalkingRunningSamples?: Number;
    dailyDistanceSwimmingSamples?: Number;
    dailyDistanceCyclingSamples?: Number;
    dailyFlightsClimbedSamples?: Number;
    activeEnergyBurned?: Number;
    basalEnergyBurned?: Number;
    appleStandTime?: Number;
    metadata: {userID: String};
    timeseries: {
      timeField: {
            type: String,
            required: true,
         },
      metaField: {
            type: {userID: String},
            required: true,
         },
    };
}