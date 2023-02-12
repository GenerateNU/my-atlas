// Inteface for IGPS,
// latatitude, longiitude, altitude, accuracy, and timestamp are optional incase they can't be retreived
export interface IGPS {
    userID: String; // meta data for GPS, will use userID
    latitude?: number; // not sure if this should be a number or not, in expo it returns a number
    longitude?: number;
    altitude?: number;
    accuracy?: number;
    timestamp: number;
}

export interface IGPSInputDTO {
    metadata: {userID: String};
    latitude?: number; // not sure if this should be a number or not, in expo it returns a number
    longitude?: number;
    altitude?: number;
    accuracy?: number;
    timestamp?: number;
}
