///////
interface State {
  zod?: {
    username?: string;
    password?: string;
  } | null;
  other?: string | null;
}

const initialState: State = {
  zod: null,
  other: null,
};

type Action =
  | { type: 'SET_ZOD'; payload: boolean }
  | { type: 'SET_OTHER'; payload: boolean }
  | { type: 'RESET' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_ZOD':
      return { ...state, zod: action.payload };
    case 'SET_OTHER':
      return { ...state, showFullImage: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};
///////