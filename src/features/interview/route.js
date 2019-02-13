// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import { InterviewPage } from './';

export default {
  path: 'interview',
  name: 'Опрос',
  childRoutes: [
    { path: 'interview-page', name: 'Опрос', component: InterviewPage, isIndex: true, autoIndexRoute: true },
  ],
};
