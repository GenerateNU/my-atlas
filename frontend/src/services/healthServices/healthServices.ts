import { addManySleepSample } from "./sleepSampleService";
import { addManyEnvironmentalAudioExposure } from "./environmentalAudioExposureService";
import { addManyHeadphoneAudioExposure } from "./headphoneAudioExposureService";
import { addManyHeartRateSample } from "./heartRateSampleService";
import { addManyHeartRateVariabilities } from "./heartRateVariabilityService";
import { addManyRestingHeartRate } from "./restingHeartRateService";
import { addManyMindfulSession } from "./mindfulSessionService";
import { addManyActivities } from "./activityService";
export async function addMany(userId: string, token: string){
    const lastRetrievalDate = new Date(2023, 3, 10);
    const today: Date = new Date();
    today.setHours(0,0,0,0)
    const yesterday: Date = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    console.log("****************************************************")
    try{

    await addManyEnvironmentalAudioExposure(userId, token, lastRetrievalDate, yesterday);
    await addManyHeadphoneAudioExposure(userId, token, lastRetrievalDate, yesterday);
    await addManySleepSample(userId, token, lastRetrievalDate, yesterday);
    await addManyHeartRateSample(userId, token, lastRetrievalDate, today);
    await addManyHeartRateVariabilities(userId, token, lastRetrievalDate, yesterday);
    await addManyRestingHeartRate(userId, token, lastRetrievalDate, today);
    await addManyMindfulSession(userId, token, lastRetrievalDate, today);
    await addManyActivities(userId, token, lastRetrievalDate, today);
    } catch (error){
        console.log("Couldn't find stuff")
    }
  
  }
  