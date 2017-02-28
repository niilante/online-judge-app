import firebase, { firebaseRef } from './../firebase/index';

export var addProblem = (problem) => {
  return {
    type: 'ADD_PROBLEM',
    problem
  }
}

export function createProblem(props) {
  return (dispatch, getState) => {
    var problem = {
      title: props.title,
      content: props.content
    };
    var problemRef = firebaseRef.child('problems').push(problem);

    return problemRef.then(() => {
      dispatch(addProblem({
        ...problem,
        id: problemRef.key
      }));
    });
  };
};

export var addProblems = (problems) => {
  return {
    type: 'ADD_PROBLEMS',
    problems
  }
}

export function fetchProblems() {
  return (dispatch, getState) => {
    var problemsRef = firebaseRef.child('problems');

    return problemsRef.once('value').then((snapshot) => {
      var problems = snapshot.val() || {};
      var parsedProblems = [];

      Object.keys(problems).forEach((problemId) => {
        parsedProblems.push({
          id: problemId,
          ...problems[problemId]
        });
      });

      dispatch(addProblems(parsedProblems));
    });
  };
}

export function fetchProblem(id) {
  return (dispatch, getState) => {
    var problemRef = firebaseRef.child(`/problems/${id}`);

    return problemRef.once('value').then((snapshot) => {
      var problem = snapshot.val();

      var parsedProblem = {};

      parsedProblem.id = id;
      parsedProblem.title = problem.title;
      parsedProblem.content = problem.content;
      
      dispatch(addProblem(parsedProblem));
    });
  };
}
