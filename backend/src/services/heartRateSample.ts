import { Service, Inject } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../../src/decorators/eventDispatcher';
import { IHeartRateSample, IHeartRateSampleDTO } from '@/interfaces/IHeartRateSample';
import { IGPS, IGPSInputDTO } from '@/interfaces/IGPS';

@Service()
export default class HeartRateSampleService {
  constructor(
    // Add services/models
    @Inject('heartRateSampleModel') private heartRateSampleModel: Models.HeartRateSampleModel, // connection to database and enables CRUD commands
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  // add heart rate sample to database
  public async addHeartRateSample(
    heartRateSampleDTO: IHeartRateSampleDTO,
  ): Promise<{ heartRateSample: IHeartRateSample }> {
    try {
      const heartRateSampleRecord = await this.heartRateSampleModel.create({
        ...heartRateSampleDTO,
      });
      const heartRateSample: IHeartRateSample = heartRateSampleRecord.toObject();
      return { heartRateSample };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  // adds multiple heartRate models to the database
  public async addManyHeartRateSample(
    heartRateSampleDTO: IHeartRateSampleDTO[],
  ): Promise<{ heartRateMany: IHeartRateSample[] }> {
    try {
      this.logger.debug(heartRateSampleDTO);
      const heartRateRecord = await this.heartRateSampleModel.create(heartRateSampleDTO);
      const heartRateMany: IHeartRateSample[] = [];
      for (let i = 0; i < heartRateRecord.length; i++) {
        const heartRate: IHeartRateSample = heartRateRecord[i].toObject();
        heartRateMany.push(heartRate);
      }
      return { heartRateMany };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  // get heartRateSample from database
  public async getHeartRateSampleByID(id: string): Promise<{ heartRateSample: IHeartRateSample }> {
    try {
      const heartRateSampleRecord = await this.heartRateSampleModel.findById(id);
      const heartRateSample: IHeartRateSample = heartRateSampleRecord.toObject();
      return { heartRateSample };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // Deletes the heartRateSample associated with the given ID
  public async deleteHeartRateSampleByID(id: string): Promise<{ heartRateSample: IHeartRateSample }> {
    try {
      const heartRateSampleRecord = await this.heartRateSampleModel.findByIdAndDelete(id);
      const heartRateSample: IHeartRateSample = heartRateSampleRecord.toObject();
      return { heartRateSample };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
