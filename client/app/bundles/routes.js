import React from 'react';
import Coach from "./components/Coach";
import Student from "./components/Student";
import EventReport from './components/EventReport';

const ROUTES = [
  {
    path: '/',
    element: <Coach/>
  },
  {
    path: '/student',
    element: <Student/>
  },
  {
    path: '/events/:eventId',
    element: <EventReport/>
  }
]

export default ROUTES;