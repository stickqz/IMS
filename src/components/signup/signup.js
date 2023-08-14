import React, { useState } from 'react';
import './signup.css';

function Signup() {
  const [activeTab, setActiveTab] = useState('loginAdmin');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (activeTab === 'loginAdmin') {
      console.log(' ');
    } else if (activeTab === 'loginUser') {
      console.log(' ');
    }
  };

  return (
    <div className='container'>
      <div className='firsthalf'>
        <h1> Login to Your Account</h1>
        <div className='tabs'>
          <div className='tab-label'>Admin</div>
          <label
            className={`switch ${activeTab === 'loginUser' ? 'user' : 'admin'}`}
          >
            <input
              type='checkbox'
              onChange={() =>
                handleTabChange(
                  activeTab === 'loginAdmin' ? 'loginUser' : 'loginAdmin'
                )
              }
            />
            <span className='slider'></span>
          </label>
          <div className='tab-label'>User</div>
        </div>
        <div className='login-form'>
          <form onSubmit={handleLogin}>
            <label className='name-field'>Username :</label>
            <input type='text' placeholder='Enter Username' />
            <br />
            <label className='name-field'>Password :</label>
            <input type='password' placeholder='Enter Password' />
            <br />
            <button type='submit' className='login-button'>
              {activeTab === 'loginAdmin' ? 'Login As Admin' : 'Login As User'}
            </button>
          </form>
        </div>
      </div>
      <div className='secondhalf'>
            <h3>New Here?</h3>
             <p>Sign Up and discover a great
             <br/> amount of new Opportunities!</p>
            <div className='button-container'>
         <button
           className={`create-account-button ${activeTab === 'newAdmin' ? 'active' : ''}`}
           onClick={() => handleTabChange('newAdmin')}>
            Create Account
         </button>
        </div>
    </div>
    </div>
  );
}

export default Signup;
