import { Service, Inject } from 'typedi';
import { IEnvironmentalAudioExposure, IEnvironmentalAudioExposureDTO } from '@/interfaces/IEnvironmentalAudioExposure';
import MailerService from './mailer';
import { EventDispatcher, EventDispatcherInterface } from '@/decorators/eventDispatcher';

@Service()
export default class EnvironmentalAudioExposureService {
  constructor(
    @Inject('environmentalAudioExposureModel') private environmentalAudioExposureModel: Models.EnvironmentalAudioExposureModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  // Takes in a environmentalAudioExposureDTO and adds to to the database. Returns the added environmentalAudioExposure data 
  // if there were no problems. Otherwise returns the error
  public async addEnvironmentalAudioExposure(environmentalAudioExposureDTO: IEnvironmentalAudioExposureDTO): Promise<{ environmentalAudioExposure: IEnvironmentalAudioExposure }> {
    try {
      this.logger.debug(environmentalAudioExposureDTO);
      const environmentalAudioExposureRecord = await this.environmentalAudioExposureModel.create({
        ...environmentalAudioExposureDTO,
      });
      const environmentalAudioExposure : IEnvironmentalAudioExposure= environmentalAudioExposureRecord.toObject();
      return { environmentalAudioExposure };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // Gets the onboarding information associated with the given userID (not the 
  // objectID). Others returns an error if there is no onbarding information associated 
  // with the given ID
//   public async getOnboarding(userID: string): Promise<{ onboarding: IOnboarding }> {
//     try {
//       const onboardingRecord = await this.onboardingModel.findOne({userID: userID});
//       const onboarding : IOnboarding = onboardingRecord.toObject();
//       return { onboarding };
//     } catch (e) {
//       this.logger.error(e);
//       throw e;
//     }
//   }

  // Deletes the mindfulSession information associated with the given userID (not the 
  // objectID). Returns the deleted mindfulSession data. Otherwise returns an error
  // if the data could not be deleted.
  public async deleteEnvironmentalAudioExposureByUserID(userID: string): Promise<{ environmentalAudioExposure : IEnvironmentalAudioExposure }> {
    try {
      const environmentalAudioExposureRecord = await this.environmentalAudioExposureModel.findOneAndDelete({userID: userID});
      const environmentalAudioExposure : IEnvironmentalAudioExposure = environmentalAudioExposureRecord.toObject();
      return { environmentalAudioExposure };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
