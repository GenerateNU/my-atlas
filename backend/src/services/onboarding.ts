import { Service, Inject } from 'typedi';
import { IOnboarding, IOnboardingInputDTO } from '@/interfaces/IOnboarding';
import MailerService from './mailer';
import { EventDispatcher, EventDispatcherInterface } from '@/decorators/eventDispatcher';

@Service()
export default class OnboardingService {
  constructor(
    // Add here whatever services/models you need here
    @Inject('onboardingModel') private onboardingModel: Models.OnboardingModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async addOnboarding(onboardingInputDTO: IOnboardingInputDTO): Promise<{ onboarding: IOnboarding }> {
    try {
      this.logger.debug(onboardingInputDTO);
      const onboardingRecord = await this.onboardingModel.create({
        ...onboardingInputDTO,
      });
      this.logger.debug("Here");
      const onboarding :IOnboarding= onboardingRecord.toObject();
      return { onboarding };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  // Gets the onboarding information associated with the given userID (not the 
  // objectID)
  public async getOnboarding(userID: string): Promise<{ onboarding: IOnboarding }> {
    try {
      const onboardingRecord = await this.onboardingModel.findOne({userID: userID});
      const onboarding : IOnboarding = onboardingRecord.toObject();
      return { onboarding };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  // Deletes the onboarding information associated with the given userID (not the 
  // objectID). Returns a message if successfully deleted onboarding information from the database
  public async deleteOnboardingByUserID(userID: string): Promise<{ message: string }> {
    try {
      const onboardingRecord = await this.onboardingModel.deleteOne({userID: userID});
      const message: string = "Successfully deleted onboarding inforomation associated with user " + userID; 
      return { message };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async updateOnboardingByUserID(onboardingInputDTO: IOnboardingInputDTO): Promise<{ onboarding: IOnboarding  }> {
    try {
      const userID = onboardingInputDTO.userID;
      const onboardingRecord = await this.onboardingModel.findOneAndUpdate({userID: userID}, onboardingInputDTO,{
        new: true}); // new implies we want to return the new document
      const onboarding : IOnboarding = onboardingRecord.toObject();
      return { onboarding };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
