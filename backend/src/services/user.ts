import { Service, Inject } from 'typedi';
import { IUser, IUserInputDTO } from '@/interfaces/IUser';
import MailerService from './mailer';
import { EventDispatcher, EventDispatcherInterface } from '@/decorators/eventDispatcher';

@Service()
export default class UserService {
  constructor(
    // Add here whatever services/models you need here
    @Inject('userModel') private userModel: Models.UserModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async addUser(userInputDTO: IUserInputDTO): Promise<{ user: IUser }> {
    try {
      const userRecord = await this.userModel.create({
        ...userInputDTO,
        salt: 'salty',
      });
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      return { user };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getUser(id: string): Promise<{ user: IUser }> {
    try {
      const userRecord = await this.userModel.findById(id);
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      return { user };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getUserFromEmail(email: string): Promise<{ user: IUser }> {
    try {
      const userRecord = await this.userModel.findOne({ email: email });
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      return { user };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
