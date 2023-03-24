import { Service, Inject } from 'typedi';
import MailerService from './mailer';
import { EventDispatcher, EventDispatcherInterface } from '../../src/decorators/eventDispatcher';
import { ISleepSample, ISleepSampleDTO } from '../interfaces/ISleepSample';

@Service()
export default class SleepSampleService {
  constructor(
    // Add services/models
    @Inject('sleepSampleModel') private sleepSampleModel: Models.SleepSampleModel, // connection to database and enables CRUD commands
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  // add sleep sample to database
  public async addSleepSample(sleepSampleDTO: ISleepSampleDTO): Promise<{ sleepSample: ISleepSample }> {
    try {
      const sleepSampleRecord = await this.sleepSampleModel.create({
        ...sleepSampleDTO,
      });
      const sleepSample: ISleepSample = sleepSampleRecord.toObject();
      return { sleepSample };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // Deletes the sleepSample associated with the given userID and date
  // Returns a message if successfully deleted activity information from the database
  public async deleteSleepSample(userID: String, date: Date): Promise<{ sleepSample: ISleepSample }> {
    try {
      const sleepSampleRecord = await this.sleepSampleModel.findOneAndDelete({ userID: userID, date: date });
      const sleepSample: ISleepSample = sleepSampleRecord.toObject();
      return { sleepSample };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // Gets the sleepSample information associated with the given userID (not the
  // objectID) with a specified range. Otherwise returns an error if there is no sleepSample
  // information associated with the given ID in the given range
  public async getSleepSampleByDateRange(userID: string, startDate: Date, endDate: Date): Promise<ISleepSample[]> {
    try {
      const sleepSampleRecords: ISleepSample[] = await this.sleepSampleModel.aggregate([
        {
          $match: {
            userID: userID,
            sessionDate: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
      ]);
      return sleepSampleRecords;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
