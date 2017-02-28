const INITIAL_STATE = {
  all: [],
  problem: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_PROBLEMS':
      return { ...state, all: action.problems };
    case 'ADD_PROBLEM':
      return { ...state, problem: action.problem };
    default:
      return state;
  }
}
