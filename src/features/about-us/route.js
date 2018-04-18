// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { AboutUsPage, PersonalDataProcessingPolicy, FeedbackPage, ProjectStatusPage } from './';

export default {
  path: 'about-us',
  name: 'О нас',
  childRoutes: [
    { path: 'about-us-page', name: 'О нас', component: AboutUsPage, isIndex: true, autoIndexRoute: true },
    {
      path: 'personal-data-processing-policy',
      name: 'Personal data processing policy',
      component: PersonalDataProcessingPolicy,
      autoIndexRoute: true,
    },
    { path: 'feedback', name: 'Обратная связь', component: FeedbackPage },
    { path: 'project-status', name: 'Project status page', component: ProjectStatusPage },
  ],
};
