import { Service, Inject } from "typedi";
import { EventDispatcher, EventDispatcherInterface } from '../../src/decorators/eventDispatcher';
import { IRestingHeartRate, IRestingHeartRateDTO } from "@/interfaces/IRestingHeartRate";
import {IHeartRateVariability, IHeartRateVariabilityDTO} from "@/interfaces/IHeartRateVariability";


@Service()
export default class RestingHeartRateService {
  constructor(
      // Add services/models
      @Inject('restingHeartRateModel') private restingHeartRateModel: Models.RestingHeartRateModel, // connection to database and enables CRUD commands
      @Inject('logger') private logger,
      @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
    ) {}

    // add heart rate sample to database
    public async addRestingHeartRate(restingHeartRateDTO: IRestingHeartRateDTO): Promise<{ restingHeartRate: IRestingHeartRate}> {
      try {
        const restingHeartRateRecord = await this.restingHeartRateModel.create({
          ...restingHeartRateDTO,
        });
        const restingHeartRate : IRestingHeartRate = restingHeartRateRecord.toObject();
        return { restingHeartRate };
      } catch (e) {
        this.logger.error(e);
        throw e;
      }
    }

  // Adds multiple resting heart rate  models to the database
  public async addManyRestingHeartRate(
    restingHeartRateDTO: IRestingHeartRateDTO[],
  ): Promise<{ heartRateMany: IRestingHeartRate[] }> {
    try {
      this.logger.debug(restingHeartRateDTO);
      const heartRateRecord = await this.restingHeartRateModel.create(restingHeartRateDTO);
      const heartRateMany: IRestingHeartRate[] = [];
      for (let i = 0; i < heartRateRecord.length; i++) {
        const heartRate: IRestingHeartRate = heartRateRecord[i].toObject();
        heartRateMany.push(heartRate);
      }
      return { heartRateMany };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
    // get resting heart rate from database
    public async getRestingHeartRateByID(id: String): Promise<{ restingHeartRate: IRestingHeartRate}> {
      try {
        const restingHeartRateRecord = await this.restingHeartRateModel.findById(id);
        const restingHeartRate : IRestingHeartRate = restingHeartRateRecord.toObject();
        return { restingHeartRate };
      } catch (e) {
        this.logger.error(e);
        throw e;
      }
    }

   // Deletes the resting heart rate associated with the given ID
   public async deleteRestingHeartRateByID(id: String): Promise<{ restingHeartRate : IRestingHeartRate }> {
   try {
       const restingHeartRateRecord = await this.restingHeartRateModel.findByIdAndDelete(id);
       const restingHeartRate : IRestingHeartRate = restingHeartRateRecord.toObject();
       return { restingHeartRate };
   } catch (e) {
       this.logger.error(e);
       throw e;
   }
   }
}
