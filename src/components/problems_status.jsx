import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStatus } from './../actions/index';
import { Link } from 'react-router';

class ProblemsStatus extends Component {
  componentWillMount() {
    this.props.fetchStatus();
  }

  renderStatus() {
    if (!this.props.statusList || !this.props.statusList[0]) {
      return <p>Loading...</p>
    }

    return this.props.statusList.map((status) => {
      return (
        <Link key={status.id} to={`/problems/${status.problemId}`}>
          <button className="list-group-item" key={status.id}>
            Problem {status.problemId}
            <span className="badge">{status.status ? "Accepted" : "Wrong answer"}</span>
          </button>
        </Link>
      )
    })
  }

  render() {
    return (
      <div>
        <h3>Status</h3>
        <ul className="list-group">
          {this.renderStatus()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    statusList: state.status.all
  }
}

export default connect(mapStateToProps, { fetchStatus })(ProblemsStatus);
