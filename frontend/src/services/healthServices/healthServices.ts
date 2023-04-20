import { addManySleepSample, addSleepSampleLocal } from "./sleepSampleService";
import { addManyEnvironmentalAudioExposure, addEnvironmentAudioExposureLocal } from "./environmentalAudioExposureService";
import { addManyHeadphoneAudioExposure, addHeadphoneAudioExposureLocal } from './headphoneAudioExposureService';
import { addManyHeartRateSample, addHeartRateSampleLocal } from "./heartRateSampleService";
import { addManyHeartRateVariabilities, addHeartRateVariabilityLocal } from "./heartRateVariabilityService";
import { addManyRestingHeartRate, addRestingHeartRateLocal } from "./restingHeartRateService";
import { addManyMindfulSession, addMindfulSessionLocal } from "./mindfulSessionService";

import { addManyActivities, addActivityLocal } from "./activityService";
import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';

export async function addMany(userId: string, token: string){
    const lastRetrievalDate = new Date(2023, 3, 10);
    const today: Date = new Date();
    today.setHours(0,0,0,0)
    const yesterday: Date = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    console.log("****************************************************")
    try{
    await addManyEnvironmentalAudioExposure(userId, token, lastRetrievalDate, today);
    await addManyHeadphoneAudioExposure(userId, token, lastRetrievalDate, today);
    await addManySleepSample(userId, token, lastRetrievalDate, today);
    await addManyHeartRateSample(userId, token, lastRetrievalDate, today);
    await addManyHeartRateVariabilities(userId, token, lastRetrievalDate, today);
    await addManyRestingHeartRate(userId, token, lastRetrievalDate, today);
    await addManyMindfulSession(userId, token, lastRetrievalDate, today);
    await addManyActivities(userId, token, lastRetrievalDate, today);
    } catch (error){
        console.log("Couldn't find stuff")
    }
  
  }

  export async function addHealthLocally(userId: string){
    try{
        const lastRetrievalDate = new Date(await getItemAsync('LastRetrievalDate'));
        if (lastRetrievalDate.getMilliseconds() < new Date().getMilliseconds()){

        
        console.log("****************************************************")
         await addEnvironmentAudioExposureLocal(userId);
        await addHeadphoneAudioExposureLocal(userId);
        await addSleepSampleLocal(userId);
         await addHeartRateSampleLocal(userId);
        await addHeartRateVariabilityLocal(userId);
        await addRestingHeartRateLocal(userId);
        await addMindfulSessionLocal(userId);
        await addActivityLocal(userId);
    }
    }
    catch (error){
        console.log(error);
    }
}

    export async function getLocalData(){
        try{
        setItemAsync('LastRetrievalDate', new Date().toISOString())
        console.log("****************************************************")
            console.log(await getItemAsync("SleepSamples"));
         console.log(await getItemAsync("EnvironmentAudio"));
         console.log(await getItemAsync("HeadphoneSample"));
        console.log(await getItemAsync("HeartRateSample"));
        console.log(await getItemAsync("HeartRateVariability"));
         console.log(await getItemAsync("MindfulSession"));
        console.log(await getItemAsync("Activity"));
         console.log(await getItemAsync("RestingHeartRate"));
         console.log(await getItemAsync("SleepSamples"));
        
        }
        catch (error){
            console.log(error);
        }
    


  }
  