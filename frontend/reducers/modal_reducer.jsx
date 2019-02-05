import { OPEN_MODAL, CLOSE_MODAL } from "./../actions/modal_actions";

const initialState = false;

const modalReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case OPEN_MODAL:
      return true;
    case CLOSE_MODAL:
      return initialState;
    default:
      return state;
  }
};

export default modalReducer;
