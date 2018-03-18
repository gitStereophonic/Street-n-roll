// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { AboutUsPage } from './';

export default {
  path: 'about-us',
  name: 'О нас',
  childRoutes: [{ path: 'about-us-page', name: 'О нас', component: AboutUsPage, isIndex: true, autoIndexRoute: true }],
};