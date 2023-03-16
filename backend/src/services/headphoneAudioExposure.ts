import { Service, Inject } from 'typedi';
import MailerService from './mailer';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { IHeadphoneAudioExposure, IHeadphoneAudioExposureDTO } from '../interfaces/IHeadphoneAudioExposure';

@Service()
export default class HeadphoneExposureSample {
  constructor(
    // Add services/models
    @Inject('headphoneExposureModel') private headphoneExposureModel: Models.HeadphoneAudioExposureModel, // connection to database and enables CRUD commands
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  // add headphoneExposure to database
  public async addHeadphoneAudioExposure(
    IHeadphoneExposureSampleDTO: IHeadphoneAudioExposureDTO,
  ): Promise<{ headphoneExposure: IHeadphoneAudioExposure }> {
    try {
      const exposureRecord = await this.headphoneExposureModel.create({
        ...IHeadphoneExposureSampleDTO,
      });
      const headphoneExposure: IHeadphoneAudioExposure = exposureRecord.toObject();
      return { headphoneExposure };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // Deletes the headphoneExposureSample associated with the given userID and date
  // Returns a message if successfully deleted activity information from the database
  public async deleteHeadphoneExposureSampleByIDAndDate(
    userID: String,
    startDate: Date,
  ): Promise<{ headphoneExposure: IHeadphoneAudioExposure }> {
    try {
      const headphoneExposureRecord = await this.headphoneExposureModel.findOneAndDelete({
        userID: userID,
        startDate: Date,
      });
      const headphoneExposure: IHeadphoneAudioExposure = headphoneExposureRecord.toObject();
      return { headphoneExposure };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
