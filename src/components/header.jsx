import React, { Component } from 'react';
import { Link } from 'react-router';

class Nav extends Component {
  render() {
    return (
      <div className="cover-container">
        <div className="masthead clearfix">
          <div className="inner">
            <h3 className="masthead-brand">Online Judge App</h3>
            <nav>
              <ul className="nav masthead-nav">
                <li activeClassName="active"><Link to="/">Home</Link></li>
                <li activeClassName="active"><Link to="/problems">Problems</Link></li>
                <li activeClassName="active"><Link to="/ranking">Ranking</Link></li>
                <li activeClassName="active"><Link to="/status">Status</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}

export default Nav;
