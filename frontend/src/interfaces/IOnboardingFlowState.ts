import { IUserInputDTO } from "./IUser";
import { IOnboardingDTO } from "./IOnboardingDTO";

export interface IOnboardingFlowState {
    user: IUserInputDTO,
    onboarding: IOnboardingDTO
}