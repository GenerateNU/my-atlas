import { Service, Inject } from 'typedi';
import { IGPS, IGPSInputDTO } from '@/interfaces/IGPS';
import { EventDispatcher, EventDispatcherInterface } from '@/decorators/eventDispatcher';

@Service()
export default class GPSService {
  constructor(
    // Add here whatever services/models you need here
    @Inject('gpsModel') private gpsModel: Models.GPSModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async addGPS(gpsInputDTO: IGPSInputDTO): Promise<{ gps: IGPS }> {
    try {
      this.logger.debug(gpsInputDTO);
      const gpsRecord = await this.gpsModel.create({
        ...gpsInputDTO,
      });
      const gps: IGPS = gpsRecord.toObject();
      return { gps };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // Gets the gps information associated with the given userID (not the
  // objectID)
  public async getGPS(userID: string): Promise<{ gps: IGPS }> {
    try {
      const gpsRecord = await this.gpsModel.findOne({ userID: userID });
      const gps: IGPS = gpsRecord.toObject();
      return { gps };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // Deletes the gps information associated with the given userID (not the
  // objectID). Returns the deleted data
  public async deleteGPSByUserID(userID: string): Promise<{ gps: IGPS }> {
    try {
      const gpsRecord = await this.gpsModel.findOneAndDelete({ userID: userID });
      const gps: IGPS = gpsRecord.toObject();
      return { gps };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
