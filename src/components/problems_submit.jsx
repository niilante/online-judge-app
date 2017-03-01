import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { handleSolution, fetchProblem } from './../actions/index';

class ProblemsSubmit extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    this.props.fetchProblem(this.props.params.id);
  }

  submitSolution(props) {
    props.problemId = this.props.params.id;
    this.props.handleSolution(props)
      .then(() => {
        this.context.router.push('/status');        
      })
  }

  render() {
    if (!this.props.problem) {
      return (
        <p>Loading</p>
      )
    }

    const { fields: { sourceInput }, handleSubmit, problem: { title } } = this.props;

    return (
      <form onSubmit={handleSubmit(this.submitSolution.bind(this))}>
        <h3>Submit A Solution For {title}</h3>
        <div className="form-group">
          <textarea type="text" className="form-control" {...sourceInput} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return { problem: state.problems.problem };
}

export default reduxForm({
  form: 'SubmitSolutionForm',
  fields: [ 'sourceInput' ]
}, mapStateToProps, { handleSolution, fetchProblem })(ProblemsSubmit);
