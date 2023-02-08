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
      const onboardingRecord = await this.onboardingModel.create({
        ...onboardingInputDTO,
      });
      const onboarding = onboardingRecord.toObject();
      return { onboarding };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
