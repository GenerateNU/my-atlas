import { Service, Inject } from "typedi";
import { EventDispatcher, EventDispatcherInterface } from '../../src/decorators/eventDispatcher';
import { IHeartRateVariability, IHeartRateVariabilityDTO } from "@/interfaces/IHeartRateVariability";


@Service()
export default class HeartRateVariabilityService {
  constructor(
      // Add services/models
      @Inject('heartRateVariabilityModel') private heartRateVariabilityModel: Models.HeartRateVariabilityModel, // connection to database and enables CRUD commands
      @Inject('logger') private logger,
      @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
    ) {}

    // add heart rate variability to database
    public async addHeartRateVariability(heartRateVariabilityDTO: IHeartRateVariabilityDTO): Promise<{ heartRateVariability: IHeartRateVariability}> {
      try {
        const heartRateVariabilityRecord = await this.heartRateVariabilityModel.create({
          ...heartRateVariabilityDTO,
        });
        const heartRateVariability : IHeartRateVariability = heartRateVariabilityRecord.toObject();
        return { heartRateVariability };
      } catch (e) {
        this.logger.error(e);
        throw e;
      }
    }

    // get heart rate variability from database
    public async getHeartRateVariabilityByID(id: String): Promise<{ heartRateVariability: IHeartRateVariability}> {
      try {
        const heartRateVariabilityRecord = await this.heartRateVariabilityModel.findById(id);
        const heartRateVariability : IHeartRateVariability = heartRateVariabilityRecord.toObject();
        return { heartRateVariability };
      } catch (e) {
        this.logger.error(e);
        throw e;
      }
    }

   // Deletes the heart rate variability associated with the given ID
   public async deleteHeartRateVariabilityByID(id: String): Promise<{ heartRateVariability : IHeartRateVariability }> {
   try {
       const heartRateVariabilityRecord = await this.heartRateVariabilityModel.findByIdAndDelete(id);
       const heartRateVariability : IHeartRateVariability = heartRateVariabilityRecord.toObject();
       return { heartRateVariability };
   } catch (e) {
       this.logger.error(e);
       throw e;
   }
   }
}
