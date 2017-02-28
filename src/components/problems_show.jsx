import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProblem, removeProblem } from './../actions/index';
import { Link } from 'react-router';

class ProblemsShow extends Component {
  componentWillMount() {
    this.props.fetchProblem(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.removeProblem();
  }

  render() {
    if (!this.props.problem) {
      return (
        <p>Loading...</p>
      );
    };

    const { title, content, id } = this.props.problem;

    return (
      <div>
        <h3>{title}</h3>
        <p>{content}</p>
        <Link to={`/problems/${id}/submit`} className="btn btn-primary btn-submit">
          Submit Solution
        </Link>
        <Link to="/problems" className="btn btn-danger">Go Back</Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { problem: state.problems.problem };
}

export default connect(mapStateToProps, { fetchProblem, removeProblem })(ProblemsShow);
