interface IZOD {
  username?: string;
  password?: string;
}
interface State {
  zod?: IZOD | null;
  other?: string | null;
}

export const LoginForimInitialState: State = {
  zod: null,
  other: null,
};

type Action =
  | { type: 'SET_ZOD'; payload: IZOD }
  | { type: 'SET_OTHER'; payload: string }
  | { type: 'RESET' };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_ZOD':
      return { ...state, zod: action.payload };
    case 'SET_OTHER':
      return { ...state, other: action.payload };
    case 'RESET':
      return { ...LoginForimInitialState };
    default:
      return state;
  }
};
