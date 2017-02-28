import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { createProblem } from '../actions/index';
import { Link } from 'react-router';

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
    const { fields: { title, content, test_input, test_output }, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Problem</h3>

        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            {title.touched ? title.error: ''}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea type="text" className="form-control" {...content} />
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
        </div>

        <div className={`form-group ${test_input.touched && test_input.invalid ? 'has-danger' : ''}`}>
          <label>Input value</label>
          <input type="text" className="form-control" {...test_input} />
          <div className="text-help">
            {test_input.touched ? test_input.error : ''}
          </div>
        </div>

        <div className={`form-group ${test_output.touched && test_output.invalid ? 'has-danger' : ''}`}>
          <label>Output value</label>
          <input type="text" className="form-control" {...test_output} />
          <div className="text-help">
            {test_output.touched ? test_output.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-submit">Submit</button>
        <Link to="/problems" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a title';
  }

  if (!values.content) {
    errors.content = 'Enter content';
  }

  if (!values.test_input) {
    errors.test_input = 'Enter test input';
  }

  if (!values.test_output) {
    errors.test_output = 'Enter test output';
  }

  return errors;
}

export default reduxForm({
  form: 'ProblemsNewForm',
  fields: [ 'title', 'content', 'test_input', 'test_output' ],
  validate
}, null, { createProblem })(ProblemsNew);
