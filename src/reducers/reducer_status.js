const INITIAL_STATE = {
  all: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_STATUS':
      return {
        ...state,
        all: action.status
      }
    default:
      return state;
  }
}
