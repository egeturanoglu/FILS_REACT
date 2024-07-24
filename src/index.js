import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Presentation from './Pages/Presentation/presentation.js';
import Extras from './Pages/Extras/Extras.js';
import Videos from './Pages/Videos/videos.js';
import Project from './Pages/Project/project.js';
import Announcement from './Pages/Announcement/announcement.js';
import HomePage from './Pages/login/HomePage.js';
import Profile from './Pages/Profile/profile.js';
import LoginSignup from './Pages/LoginSignup/LoginSignup.js';
import CoorHome from './Pages/login/CoorHome.js';
import Interns from './Pages/Interns/Interns.js';
import CoorProfile from './Pages/Profile/CoorProfile.js';
import ManageProject from './Pages/ManageProject/ManageProject.js';
import Documents from './Pages/Documents/Documents.js';
import { AuthProvider } from './Pages/AuthContext.js';
import ProtectedRoute from './Pages/ProtectedRoute.js';
import Glossary from './Pages/ExtrasFolder/Glossary.js';
import FAQs from './Pages/ExtrasFolder/FAQs.js';
import ExternalLinks from './Pages/ExtrasFolder/ExternalLinks.js';
import FeedbackForm from './Pages/ExtrasFolder/FeedbackForm.js';
import FeedbackManagement from './Pages/FeedbackManagement/FeedbackManagement.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
    {
    path: 'feedback_management',
    element: (
      <ProtectedRoute>
        <FeedbackManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: 'feedback',
    element: (
      <ProtectedRoute>
        <FeedbackForm />
      </ProtectedRoute>
    ),
  },
  {
    path: 'external_links',
    element: (
      <ProtectedRoute>
        <ExternalLinks />
      </ProtectedRoute>
    ),
  },
  {
    path: 'faqs',
    element: (
      <ProtectedRoute>
        <FAQs />
      </ProtectedRoute>
    ),
  },
  {
    path: 'glossary',
    element: (
      <ProtectedRoute>
        <Glossary />
      </ProtectedRoute>
    ),
  },
  {
    path: 'login/home',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: 'presentations',
    element: (
      <ProtectedRoute>
        <Presentation />
      </ProtectedRoute>
    ),
  },
  {
    path: 'extras',
    element: (
      <ProtectedRoute>
        <Extras />
      </ProtectedRoute>
    ),
  },
  {
    path: 'videos',
    element: (
      <ProtectedRoute>
        <Videos />
      </ProtectedRoute>
    ),
  },
  {
    path: 'project',
    element: (
      <ProtectedRoute>
        <Project />
      </ProtectedRoute>
    ),
  },
  {
    path: 'announcements',
    element: (
      <ProtectedRoute>
        <Announcement />
      </ProtectedRoute>
    ),
  },
  {
    path: 'login',
    element: <LoginSignup />,
  },
  {
    path: 'login/home_coor',
    element: (
      <ProtectedRoute>
        <CoorHome />
      </ProtectedRoute>
    ),
  },
  {
    path: 'interns',
    element: (
      <ProtectedRoute>
        <Interns />
      </ProtectedRoute>
    ),
  },
  {
    path: 'profile_coor',
    element: (
      <ProtectedRoute>
        <CoorProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: 'manage-project/:internId',
    element: (
      <ProtectedRoute>
        <ManageProject />
      </ProtectedRoute>
    ),
  },
  {
    path: 'documents',
    element: (
      <ProtectedRoute>
        <Documents />
      </ProtectedRoute>
    ),
  },
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

reportWebVitals();
