import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Problems from './components/problems';
import Ranking from './components/ranking';
import About from './components/about';
import Welcome from './components/welcome';
import ProblemsNew from './components/problems_new';
import ProblemsShow from './components/problems_show';
import ProblemsSubmit from './components/problems_submit';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Welcome} />
    <Route path="problems" component={Problems} />
    <Route path="ranking" component={Ranking} />
    <Route path="about" component={About} />
    <Route path="problems/new" component={ProblemsNew} />
    <Route path="problems/:id" component={ProblemsShow} />
    <Route path="problems/:id/submit" component={ProblemsSubmit} />
  </Route>
);
