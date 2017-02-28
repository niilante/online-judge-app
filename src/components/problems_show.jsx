import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProblem } from './../actions/index';

class ProblemsShow extends Component {
  componentWillMount() {
    this.props.fetchProblem(this.props.params.id);
  }

  render() {
    return (
      <div>
        <h3>{this.props.problem.title}</h3>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { problem: state.problems.problem };
}

export default connect(mapStateToProps, { fetchProblem })(ProblemsShow);
