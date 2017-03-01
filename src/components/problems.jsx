import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchProblems } from './../actions/index';

class Problems extends Component {
  componentWillMount() {
    this.props.fetchProblems();
  }

  renderProblems() {
    if (this.props.problems.length === 0) {
      return (
        <p>There is no problem to solve.</p>
      )
    }

    return this.props.problems.map((problem) => {
      return (
        <Link key={problem.id} to={`problems/${problem.id}`}>
           <button className="list-group-item">
               <span className="badge">69</span>
               {problem.title}
           </button>
        </Link>
      )
    });
  }

  render() {
    return (
      <div>
        <h3>Problems</h3>
        <ul className="list-group">
          {this.renderProblems()}
        </ul>
        <div className="text-xs-right">
          <Link to="/problems/new" className="btn btn-primary">
            Create New Problem
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { problems: state.problems.all }
}

export default connect(mapStateToProps, { fetchProblems })(Problems);
