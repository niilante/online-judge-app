import firebase, { firebaseRef } from './../firebase/index';
import querystring from 'querystring';
import axios from 'axios';

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
      content: props.content,
      test_input: props.test_input,
      test_output: props.test_output
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
      parsedProblem.test_output = problem.test_output;
      parsedProblem.test_input = problem.test_input;

      dispatch(addProblem(parsedProblem));
    });
  };
}

export var removeProblem = () => {
  return {
    type: 'REMOVE_PROBLEM'
  }
}

export function handleSolution(props) {
  return (dispatch, getState) => {
    const { sourceInput, problemId } = props;
    const { problem } = getState().problems;
    const RUN_URL = 'https://api.hackerearth.com/v3/code/run/';
    const CLIENT_SECRET = 'd0955b2b668249b62099b6e76833a8d36be8a24a';

    const data = {
      'client_secret': CLIENT_SECRET,
      'async': 0,
      'source': sourceInput,
      'lang': "C",
      'time_limit': 5,
      'memory_limit': 262144,
      'input': problem.test_input
    }

    return axios.post(RUN_URL, querystring.stringify(data))
      .then((res) => {
        // console.log(data.input,res.data.run_status.output.trim(), problem.test_output.trim());
        var status = {
          problemId: problemId,
          status: res.data.run_status.output.trim() === problem.test_output.trim()
        };
        var statusRef = firebaseRef.child('status').push(status);

        return statusRef.then(() => {
          dispatch(addStatus({
            ...status,
            statusId: statusRef.key
          }));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function addStatus(status) {
  return {
    type: 'ADD_STATUS',
    status
  }
}

export function fetchStatus () {
  return (dispatch, getState) => {
    var statusRef = firebaseRef.child('status');

    return statusRef.once('value').then((snapshot) => {
      var status = snapshot.val() || {};
      var parsedStatus = [];

      Object.keys(status).forEach((statusId) => {
        parsedStatus.push({
          id: statusId,
          ...status[statusId]
        });
      });

      dispatch(addStatus(parsedStatus));
    });
  }
}
