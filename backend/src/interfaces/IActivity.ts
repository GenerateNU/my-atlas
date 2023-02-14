export interface IActivity {
    _id: String
    date: String; // date when user opened app
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
    date: String; // date when user opened app
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