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
      content: props.content
    };
    var problemRef = firebaseRef.child('problems').push(problem);

    problem.tests = [];

    props.tests.map((test) => {
      var testCase = {
        test_input: test.test_input,
        test_output: test.test_output
      };
      problem.tests.push(testCase);
      var problemTestRef = firebaseRef.child(`problems/${problemRef.key}/tests`).push(testCase);
    });

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
      parsedProblem.tests = [];

      Object.keys(problem.tests).forEach((testId) => {
        parsedProblem.tests.push({
          id: testId,
          ...problem.tests[testId]
        });
      });

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
    const { tests } = getState().problems.problem;
    const RUN_URL = 'https://api.hackerearth.com/v3/code/run/';
    const CLIENT_SECRET = 'd0955b2b668249b62099b6e76833a8d36be8a24a';

    var scoreIndex = 0;
    var isTrue = true;

    tests.map((test) => {
      const data = {
        'client_secret': CLIENT_SECRET,
        'async': 0,
        'source': sourceInput,
        'lang': "C",
        'time_limit': 5,
        'memory_limit': 262144,
        'input': test.test_input
      }

      return axios.post(RUN_URL, querystring.stringify(data))
        .then((res) => {
          console.log(res.data.run_status.output.trim(), test.test_output.trim());
          
          if ((res.data.run_status.output.trim() === test.test_output.trim()) && isTrue) {
            scoreIndex = scoreIndex + 1;
          } else {
            isTrue = false;
          }
 
          var status = {
            problemId: problemId,
            status: isTrue,
            score: scoreIndex
          }

          if (tests[tests.length-1].id === test.id) {
            var statusRef = firebaseRef.child('status').push(status);

            return statusRef.then(() => {
              dispatch(addStatus({
                ...status,
                statusId: statusRef.key
              }));
            });
          }

        })
        .catch((err) => {
          console.log(err);
        });
    });

    // setTimeout(() => {
    //   var statusRef = firebaseRef.child('status').push(status);

    //   return statusRef.then(() => {
    //     dispatch(addStatus({
    //       ...status,
    //       statusId: statusRef.key
    //     }));
    //   });
    // }, 5000);
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
