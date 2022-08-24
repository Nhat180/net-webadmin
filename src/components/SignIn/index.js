import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import SubNav from "../SubNav";
import "./SignIn.css";
import {required} from 'react-admin';
import LoadingSpinnerButton  from '../Spinner';
import Spinner from "../Spinner/spinner.gif"
import Navbar from '../Navbar1';

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signIn } = UserAuth();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('')
      try {
        await signIn(email, password)
        navigate('/menu')
      } catch (e) {
        setLoading(false);

        setError(e.message)
        
        console.log(e.message)
      }
    };

    return (
      <div>
        <Navbar/>
        <div  className='max-w-[700px] mx-auto my-16 p-4 container1'>
          {errorMessage && <div className="error">{errorMessage}</div>}
          <div class="section-title text-center">
            <h1>Login</h1>
          </div>
          <form >
            <div className='flex flex-col py-2'>
              <label className='py-2 font-medium'>Username</label>
              <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type='text' disabled={loading} validate={required()}/>
            </div>
            <div className='flex flex-col py-2'>
              <label className='py-2 font-medium'>Password</label>
              <input onChange={(e) => setPassword(e.target.value)} className='border p-3' type='password' disabled={loading} validate={required()}/>
            </div>
            {/* <LoadingSpinnerButton title ={'Sign In'} loading={loading} className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'
             onClick={(handleSubmit)} /> */}
            <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white loading-spinner-button' onClick={(handleSubmit)} >
              {
                loading ? <img src={Spinner} alt='spinner' /> :  'Sign In'     
              }
            </button>
          </form>
        </div>
      </div>
    );
  };

