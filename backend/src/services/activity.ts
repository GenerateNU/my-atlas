import { Service, Inject } from "typedi";
import { EventDispatcher, EventDispatcherInterface } from '../../src/decorators/eventDispatcher';
import { IActivity, IActivityDTO } from "../interfaces/IActivity";


@Service()
export default class ActivityService {
  constructor(
      // Add services/models
      @Inject('activityModel') private activityModel: Models.ActivityModel, // connection to database and enables CRUD commands
      @Inject('logger') private logger,
      @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
    ) {}

    // add activity to database
    public async addActivity(activityDTO: IActivityDTO): Promise<{activity: IActivity}> {
      try {
        const activityRecord = await this.activityModel.create({
          ...activityDTO,
        });
        const activity : IActivity = activityRecord.toObject();
        return { activity };
      } catch (e) {
        this.logger.error(e);
        throw e;
      }
    }

    // get activity from database
    public async getActivityInfoByIDAndDate(userID: String, date: Date): Promise<{ activity: IActivity}> {
      try {
        const activityRecord = await this.activityModel.findOne({userID: userID, date: date})
        const activity : IActivity = activityRecord.toObject();
        return { activity };
      } catch (e) {
        this.logger.error(e);
        throw e;
      }
    }

   // Deletes the activity associated with the given userID and date
   // Returns a message if successfully deleted activity information from the database
   public async deleteActivityByIDAndDate(userID: String, date: Date): Promise<{ activity : IActivity }> {
   try {
       const activityRecord = await this.activityModel.findOneAndDelete({userID: userID, date: date});
       const activity : IActivity = activityRecord.toObject();
       return { activity };
   } catch (e) {
       this.logger.error(e);
       throw e;
   }
   }

// updates activity in database
public async updateActivityByIDAndDate(activityDTO: IActivityDTO): Promise<{ activity: IActivity  }> {
  try {
    const userID = activityDTO.userID;
    const date = activityDTO.date;
    const activityRecord = await this.activityModel.findOneAndUpdate({userID: userID, date: date}, activityDTO,{
      new: true}); // new implies we want to return the new document
    const activity : IActivity = activityRecord.toObject();
    return { activity };
  } catch (e) {
    this.logger.error(e);
    throw e;
  }
}
}
