import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { Field, FieldArray, reduxForm } from 'redux-form';
=======
import { Field, reduxForm } from 'redux-form';
>>>>>>> d637b7e7faa5b561d75c12ba1f2e2e8f2c64d078
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

<<<<<<< HEAD
export const renderTextareaField = ({ input, label, type, meta: { touched, error, warning } }) => (
=======
export const renderTextareaField = ({ input, label, type, meta: {touched, error, warning} }) => (
>>>>>>> d637b7e7faa5b561d75c12ba1f2e2e8f2c64d078
  <div className={`form-group ${touched && error ? 'has-danger' : ''}`}>
    <label>{label}</label>
    <textarea type={type} {...input} placeholder={label} className="form-control" />
    <div className="text-help">
      {touched ? error : ''}
    </div>
  </div>
)

<<<<<<< HEAD
export const renderTestsField = ({ fields, meta: { touched, error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})} className="btn btn-primary">Add Test Case</button>
      <div className="text-help">
        {touched ? error : ''}
      </div>
    </li>
    {fields.map((test, index) => 
      <li key={index} className="test-case-item">
        <h4 className="test-case-title">Test #{index + 1}</h4>
        <button type="button" title="Remove" onClick={() => fields.remove(index)} className="btn btn-danger" >
          x
        </button>
        <Field
          name={`${test}.test_input`}
          type="text"
          component={renderInputField}
          label="Input"/>
        <Field
          name={`${test}.test_output`}
          type="text"
          component={renderInputField}
          label="Output"/>
      </li>
    )}
  </ul>
)

=======
>>>>>>> d637b7e7faa5b561d75c12ba1f2e2e8f2c64d078
class ProblemsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    console.log('Submitting', props);
    this.props.createProblem(props)
      .then(() => {
        console.log('Problem created.');
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
<<<<<<< HEAD

        <FieldArray name="tests" component={renderTestsField}/>

        <button type="submit" disabled={submitting} className="btn btn-primary btn-submit">Submit</button>
=======
        <Field name="test_input" type="text" component={renderInputField} label="Test Input" />
        <Field name="test_output" type="text" component={renderInputField} label="Test Output" />

        <button type="submit" className="btn btn-primary btn-submit">Submit</button>
>>>>>>> d637b7e7faa5b561d75c12ba1f2e2e8f2c64d078
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

<<<<<<< HEAD
  if (!values.tests || !values.tests.length) {
    errors.tests = { _error: 'At least one test case must be entered' }
  } else {
    const testsArrayErrors = [];
    values.tests.forEach((test, testIndex) => {
      const testErrors = {};
      if (!test || !test.test_input) {
        testErrors.test_input = 'Required'
        testsArrayErrors[testIndex] = testErrors
      };
      if (!test || !test.test_output) {
        testErrors.test_output = 'Required'
        testsArrayErrors[testIndex] = testErrors
      };
    });
    if (testsArrayErrors.length) {
      errors.tests = testsArrayErrors;
    };
  }

=======
>>>>>>> d637b7e7faa5b561d75c12ba1f2e2e8f2c64d078
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