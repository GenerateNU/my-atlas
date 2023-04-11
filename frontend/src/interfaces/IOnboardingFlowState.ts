import { IUserInputDTO } from "./IUser";

export interface IOnboardingFlowState {
    user: IUserInputDTO,
    soughtCare: boolean,
    spirituality: boolean
}