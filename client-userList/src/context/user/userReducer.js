import {
  GET_USER,
  ADD_USER,
  DELETE_USER,
  EDIT_USER,
  ERROR_USER,
  FILTER_USER,
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER, CLEAR_FILTER_USER
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, users: action.payload, loading: false };

    case ADD_USER:
      return { ...state, users: [action.payload, ...state.users], loading: false };

    case EDIT_USER:
      return {
        ...state, loading: false,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };

    case DELETE_USER:
      return {
        ...state, loading: false,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    case SET_CURRENT_USER:
      return { ...state, current: action.payload };

    case CLEAR_CURRENT_USER:
      return { ...state, current: null };

    case FILTER_USER:
      return {
        ...state,
        filtered: state.users.filter((user) => {
          const { name } = user;
          const regex = new RegExp(`${action.payload}`, "gi");
          return name.match(regex);
        }),
      };

      case CLEAR_FILTER_USER: return {...state, filtered: null}

    case ERROR_USER:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
