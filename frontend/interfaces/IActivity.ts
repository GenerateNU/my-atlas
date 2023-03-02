export interface IActivity {
    _id: String
    date: Date; // date when user opened app
    userID: String;
    dailyStepCountSamples?: Number;
    dailyDistanceWalkingRunningSamples?: Number;
    dailyDistanceSwimmingSamples?: Number;
    dailyDistanceCyclingSamples?: Number;
    dailyFlightsClimbedSamples?: Number;
    activeEnergyBurned?: Number;
    basalEnergyBurned?: Number;
    appleStandTime?: Number;
}

export interface IActivityDTO {
    date: Date; // date when user opened app
    userID: String;
    dailyStepCountSamples?: Number;
    dailyDistanceWalkingRunningSamples?: Number;
    dailyDistanceSwimmingSamples?: Number;
    dailyDistanceCyclingSamples?: Number;
    dailyFlightsClimbedSamples?: Number;
    activeEnergyBurned?: Number;
    basalEnergyBurned?: Number;
    appleStandTime?: Number;
 }