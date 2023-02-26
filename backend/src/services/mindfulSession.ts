import { Service, Inject } from 'typedi';
import { IMindfulSession, IMindfulSessionDTO } from '@/interfaces/IMindfulSession'
import MailerService from './mailer';
import { EventDispatcher, EventDispatcherInterface } from '@/decorators/eventDispatcher';

@Service()
export default class MindfulSessionService {
  constructor(
    @Inject('mindfulSessionModel') private mindfulSessionModel: Models.MindfulSessionModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  // Takes in a mindfulSessionDTO and adds to to the database. Returns the added mindfulSession data 
  // if there were no problems. Otherwise returns the error
  public async addMindfulSession(mindfulSessionDTO: IMindfulSessionDTO): Promise<{ mindfulSession: IMindfulSession }> {
    try {
      this.logger.debug(mindfulSessionDTO);
      const mindfulSessionRecord = await this.mindfulSessionModel.create({
        ...mindfulSessionDTO,
      });
      const mindfulSession : IMindfulSession= mindfulSessionRecord.toObject();
      return { mindfulSession };
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
  public async deleteMindfulSessionByUserID(userID: string): Promise<{ mindfulSession : IMindfulSession }> {
    try {
      const mindfulSessionRecord = await this.mindfulSessionModel.findOneAndDelete({userID: userID});
      const mindfulSession : IMindfulSession = mindfulSessionRecord.toObject();
      return { mindfulSession };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
