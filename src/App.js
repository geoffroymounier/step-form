import React from 'react';
import UserForm from './pages/userForm';
import formData from './data/userForm.json';
import './App.css';

function App() {
  return (
    <UserForm formData={formData} />
  );
}

export default App;
