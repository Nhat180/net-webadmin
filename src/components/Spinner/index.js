import React from "react";
import "./spinner.css";
import Spinner from './spinner.gif';

const LoadingSpinnerButton = ({title, loading, onClick}) => {
  return (
    <button onClick={onClick} className='loading-spinner-button'>
    {
      loading ? <img src={Spinner} alt='spinner' /> : title + ' '     
    }
    </button>
  )
}

export default LoadingSpinnerButton