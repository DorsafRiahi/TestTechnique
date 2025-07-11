import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserProfile from './components/UserProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="*" element={<h2 style={{ textAlign: 'center', color: '#d32f2f' }}>Page non trouvée</h2>} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;