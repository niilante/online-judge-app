import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createProblem } from '../actions/index';
import { Link } from 'react-router';

export const renderInputField = ({ input, label, type, meta: {touched, error, warning} }) => (
  <div className={`form-group ${touched && error ? 'has-danger' : ''}`}>
    <label>{label}</label>
    <input type={type} {...input} placeholder={label} className="form-control" />
    <div className="text-help">
      {touched ? error : ''}
    </div>
  </div>
)

export const renderTextareaField = ({ input, label, type, meta: {touched, error, warning} }) => (
  <div className={`form-group ${touched && error ? 'has-danger' : ''}`}>
    <label>{label}</label>
    <textarea type={type} {...input} placeholder={label} className="form-control" />
    <div className="text-help">
      {touched ? error : ''}
    </div>
  </div>
)

class ProblemsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createProblem(props)
      .then(() => {
        console.log('Created.');
        this.context.router.push('problems');
      });
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, createProblem } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Problem</h3>

        <Field name="title" type="text" component={renderInputField} label="Title" />
        <Field name="content" type="text" component={renderTextareaField} label="Content" />
        <Field name="test_input" type="text" component={renderInputField} label="Test Input" />
        <Field name="test_output" type="text" component={renderInputField} label="Test Output" />

        <button type="submit" className="btn btn-primary btn-submit">Submit</button>
        <Link to="/problems" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a title';
  }

  if (!values.content) {
    errors.content = 'Enter content';
  }

  return errors;
}

ProblemsNew = reduxForm({
  form: 'ProblemsNewForm',
  validate
})(ProblemsNew);

ProblemsNew = connect(
  null,
  { createProblem }
)(ProblemsNew);

export default ProblemsNew;