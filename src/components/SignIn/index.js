import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import SubNav from "../SubNav";
import "./SignIn.css";


export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signIn } = UserAuth();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('')
      try {
        await signIn(email, password)
        navigate('/menu')
      } catch (e) {
        setError(e.message)
        console.log(e.message)
      }
    };

    return (
      <div>
        <SubNav content="Sign In"></SubNav>
        <div  className='max-w-[700px] mx-auto my-16 p-4 container1'>
            <div class="section-title text-center">
              <h1>Login</h1>
            </div><form onSubmit={handleSubmit}>
            <div className='flex flex-col py-2'>
              <label className='py-2 font-medium'>Username</label>
              <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type='text' />
            </div>
            <div className='flex flex-col py-2'>
              <label className='py-2 font-medium'>Password</label>
              <input onChange={(e) => setPassword(e.target.value)} className='border p-3' type='password' />
            </div>
            <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  };

