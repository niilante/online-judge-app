import React, { Component } from 'react';
import { Link } from 'react-router';

class Welcome extends Component {
  render() {
    return (
      <div className="inner cover">
        <p className="lead">Learn programming, practice algorithms and take the challenge.</p>
        <p className="lead">
          <Link to="problems" className="btn btn-lg btn-default"><span className="glyphicon glyphicon-th-list"></span>Browse Problems</Link>
        </p>
      </div>
    );
  }
}

export default Welcome;
