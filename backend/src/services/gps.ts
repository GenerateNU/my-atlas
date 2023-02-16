import { Service, Inject } from 'typedi';
import { IGPS, IGPSInputDTO } from '@/interfaces/IGPS';
import MailerService from './mailer';
import { EventDispatcher, EventDispatcherInterface } from '@/decorators/eventDispatcher';

@Service()
export default class GPSService {
  constructor(
    // Add here whatever services/models you need here
    @Inject('GPSModel') private gpsModel: Models.GPSModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async addGPS(gpsInputDTO: IGPSInputDTO): Promise<{ gps: IGPS }> {
    try {
      this.logger.debug(gpsInputDTO);
      const onboardingRecord = await this.gpsModel.create({
        ...gpsInputDTO,
      });
      const gps: IGPS = onboardingRecord.toObject();
      return { gps };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
