interface IZOD {
  name?: string | string[];
  username?: string | string[];
  email?: string | string[];
  password?: string | string[];
  confirmPassword?: string | string[];
  confirm?: string | string[];
}

interface Iother {
  message?: string;
  server?: {};
}
interface State {
  zod?: IZOD | null;
  other?: Iother | null;
}

export const SignupFormInitialState: State = {
  zod: null,
  other: null,
};

type Action =
  | { type: 'SET_ZOD'; payload: IZOD }
  | { type: 'SET_OTHER'; payload: string }
  | { type: 'RESET' };

export const signupReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_ZOD':
      return { ...state, zod: action.payload };
    case 'SET_OTHER':
      return { ...state, other: action.payload };
    case 'RESET':
      return { ...SignupFormInitialState };
    default:
      return state;
  }
};
