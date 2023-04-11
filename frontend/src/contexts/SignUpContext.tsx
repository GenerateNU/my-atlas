import { createContext, useContext, useState } from 'react';
import { IOnboardingFlowState } from '../interfaces/IOnboardingFlowState';

type SignUpContextData = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  signUpState: IOnboardingFlowState;
  setSignUpState: React.Dispatch<React.SetStateAction<any>>;
  signUpFlow: Object;
  handleChange: (name: string, value: any) => void;
};

type SignUpProviderProps = {
  children?: React.ReactNode;
};
const SignUpContext = createContext<SignUpContextData>({} as SignUpContextData);

const SignUpProvider: React.FC<SignUpProviderProps> = ({ children }) => {
  const [page, setPage] = useState(0);
  const [signUpState, setSignUpState] = useState<IOnboardingFlowState>({
    user: {
      name: undefined,
      email: undefined,
      password: undefined,
      phoneNumber: undefined,
      dob: undefined,
      age: undefined,
    },
  });
  const signUpFlow = [
    {
      page: 'Sign Up Screen',
      props: {},
    },
    {
      page: 'Single Question Screen',
      props: {
        question: "What's your name",
        inputName: 'Name',
        stateName: 'name',
        progress: 14,
      },
    },
    {
      page: 'Transition Screen',
      props: {},
    },
    {
      page: 'Single Question Screen',
      props: {
        question: "What's your phone number",
        inputName: '',
        stateName: 'phoneNumber',
        progress: 28,
      },
    },
    {
      page: 'Select One Screen',
      props: {
        question: 'What are your pronouns',
        stateName: 'pronouns',
        sections: [
          {
            answers: ['she/her/hers', 'he/him/his', 'they/them/theirs', 'ze/hir/hirs'],
            other: true,
            stateName: 'pronouns',
          },
        ],
        progress: 43,
      },
    },
    {
      page: 'Select Date Screen',
      props: {
        question: "What's your date of birth?",
        inputName: "Enter date",
        stateName: 'dob',
        progress: 57,
      },
    },
    {
      page: 'Single Question Screen',
      props: {
        question: 'Where do you live?',
        inputName: 'Zip Code',
        stateName: 'zipcode',
        progress: 71,
      },
    },
    {
      page: 'Select One Screen',
      props: {
        question: 'Which best describes you?',
        skipButton: true,
        sections: [
          {
            title: 'Sex Assigned at Birth',
            answers: ['Female', 'Male'],
            other: true,
            stateName: 'sex',
          },
          {
            title: 'Gender Identity',
            answers: [
              'Woman',
              'Man',
              'Transgender woman',
              'Transgender man',
              'Non-binary',
              'Prefer not to say',
            ],
            other: false,
            stateName: 'genderIdentity',
          },
          {
            title: 'Sexual Orientation',
            answers: ['Lesbian', 'Gay', 'Bisexual', 'Queer', 'Asexual', 'Straight'],
            other: true,
            stateName: 'sexualOrientation',
          },
          {
            title: 'Ethnicity',
            answers: [
              'Native American',
              'Asian',
              'Black or African American',
              'Hispanic',
              'Pacific Islander',
              'White',
            ],
            other: false,
            stateName: 'ethnicity',
          },
          {
            title: 'Religion',
            answers: [
              'Protestant',
              'Roman Catholic',
              'Mormon',
              'Greek or Russian Orthodox',
              'Jewish',
              'Muslim',
              'Buddhist',
              'Hindu',
              'Athiest',
              'Agnostic',
              'Non-religious',
            ],
            other: false,
            stateName: 'religion',
          },
        ],
        progress: 86,
      },
    },
    {
      page: 'Select One Screen',
      props: {
        sections: [
          {
            question: 'When it comes to taking care of your mental health, you are...',
            answers: ['Informed', 'Curious', 'Skeptical'],
          },
        ],
        progress: 100,
      },
    },
  ];

  const handleChange = (name: string, value: any) => {
    console.log(value);
    console.log(signUpState);
    setSignUpState(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <SignUpContext.Provider
      value={{ page, setPage, signUpState, setSignUpState, signUpFlow, handleChange }}>
      {children}
    </SignUpContext.Provider>
  );
};

const useSignUp = (): SignUpContextData => {
  const context = useContext(SignUpContext);

  if (!context) {
    throw new Error('useSignUp must be used within an AuthProvider');
  }

  return context;
};

export { SignUpContext, SignUpProvider, useSignUp };
