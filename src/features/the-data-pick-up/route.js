// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { DataPickUp } from './';

export default {
  path: 'thisIsPrivateDataPickUpPageForOlga',
  name: 'The data pick up',
  autoIndexRoute: true,
  childRoutes: [
    {
      path: 'def',
      name: 'Default page',
      component: DataPickUp,
      isIndex: true,
      autoIndexRoute: true,
    },
  ],
};
