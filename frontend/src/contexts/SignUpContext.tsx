import { createContext, useContext, useState } from 'react';

type SignUpContextData = {
  page: Number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  signUpState: Object;
  setSignUpState: React.Dispatch<React.SetStateAction<any>>;
  signUpFlow: Object;
};

type SignUpProviderProps = {
  children?: React.ReactNode;
};
const SignUpContext = createContext<SignUpContextData>({} as SignUpContextData);

const SignUpProvider: React.FC<SignUpProviderProps> = ({ children }) => {
  const [page, setPage] = useState(0);
  const [signUpState, setSignUpState] = useState();
  const signUpFlow = [
    {
      page: 'Single Question Screen',
      props: {
        question: "What's your name",
        inputName: 'Name',
        stateName: 'name',
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
        stateName: 'phoneNumber',
      },
    },
    {
      page: 'Select One Screen',
      props: {
        question: 'What are your pronouns',
        stateName: 'pronouns',
        sections: [
          {
            answers: [
              'she/her/hers',
              'he/him/his',
              'they/them/theirs',
              'ze/hir/hirs',
            ],
            other: true,
            stateName: 'pronouns',
          },
        ],
      },
    },
    {
      page: 'Select Date Screen',
      props: {
        question: "What's your date of birth?",
        stateName: 'dob',
      },
    },
    {
      page: 'Single Question Screen',
      props: {
        question: 'Where do you live?',
        inputName: 'Zip Code',
        stateName: 'zipcode',
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
            answers: [
              'Lesbian',
              'Gay',
              'Bisexual',
              'Queer',
              'Asexual',
              'Straight',
            ],
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
      },
    },
    {
      page: 'Select One Screen',
      props: {
        question:
          'When it comes to taking care of your mental health, you are...',
        answers: ['Informed', 'Curious', 'Skeptical'],
      },
    },
  ];

  return (
    <SignUpContext.Provider
      value={{ page, setPage, signUpState, setSignUpState, signUpFlow}}>
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
