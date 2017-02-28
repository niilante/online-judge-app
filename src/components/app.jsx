import React, { Component } from 'react';

import Header from './header';
import Footer from './footer';

export default class App extends Component {
  render() {
    return (
      <div className="site-wrapper-inner">
        <Header />
        <div className="col-centered col-xs-10 col-sm-8 col-md-6 col-lg-6">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
