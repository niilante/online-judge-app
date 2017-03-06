import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { handleSolution, fetchProblem } from './../actions/index';

const renderTextareaField = ({ input, label, type, meta: {touched, error, warning} }) => (
  <div className={`form-group ${touched && error ? 'has-danger' : ''}`}>
    <label>{label}</label>
    <textarea type={type} {...input} placeholder={label} className="form-control" />
    <div className="text-help">
      {touched ? error : ''}
    </div>
  </div>
)

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
    const { handleSubmit, fetchProblem, handleSolution, pristine, reset, submitting, problem } = this.props;
    
    if (!problem) {
      return (
        <p>Loading</p>
      )
    }

    return (
      <form onSubmit={handleSubmit(this.submitSolution.bind(this))}>
        <h3>Submit a solution for "{problem.title}"</h3>

        <Field name="sourceInput" type="text" component={renderTextareaField} label="Your source" />

        <button type="submit" disabled={submitting} className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.sourceInput) {
    errors.sourceInput = 'Enter your solution';
  }

  return errors;
}

ProblemsSubmit = connect(
  state => ({
    problem: state.problems.problem
  }),
  { handleSolution, fetchProblem }
)(ProblemsSubmit);

ProblemsSubmit = reduxForm({
  form: 'SubmitSolutionForm',
  validate
})(ProblemsSubmit);

export default ProblemsSubmit;