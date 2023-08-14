import React from 'react'
import './signup.css'

function signup() {
  return (
    <div className='container'>
        <div className='firsthalf'>
        <h3>One of Us?</h3>
             <p>If you already have an account,
             <br/> just sign in. we've missed you!</p>
            <div className='button-container'>
         <button
           className={`create-account-button `}>
            sign in
         </button>
         </div>

        </div>
        <div className='secondhalf'>
           <h1>Create Free Account</h1>
           <div className='signup-form'>
           <form >
                   <label className='name-field'>Username :</label>
                   <input type='text' placeholder='Enter Username' />
                <br/>
                <label className='name-field'>Email :</label>
                <input type='email' placeholder='Enter Email' />
                <br />
                <label className='name-field'>Password :</label>
                   <input type='password' placeholder='Enter Password' />
               <br />
               
                 <div className='button-container'>
               <button type='submit' className='create-account-button'>Sign Up
            </button>
            </div>
            </form>
            </div>
               
               
          
        
        </div>

    </div>
  )
}

export default signup