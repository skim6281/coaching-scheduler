import React from 'react';
import { BrowserRouter, RouterProvider, Routes, Route, createBrowserRouter } from 'react-router-dom';
import ROUTES from '../../routes';
import styles from './App.module.css';
import Coach from '../Coach';
import Student from '../Student';
import EventReport from '../EventReport';
import Nav from "../Nav";

const App = () => {
  const router = createBrowserRouter(ROUTES);
  return (
    // <RouterProvider router={router}/>
    <BrowserRouter basename="/">
      <Nav />
      <Routes>
        <Route path="/" element={<Coach />}/>
        <Route path="/student" element={<Student />}/>
        <Route path="/events/:eventId" element={<EventReport/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;