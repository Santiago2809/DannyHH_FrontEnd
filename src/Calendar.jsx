import React from 'react';
import { AppRouter } from './router';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './store';

export const Calendar = () => {
  return (
    <>
      <Provider store={ store }>
        <AppRouter /> 
        <ToastContainer 
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          />
        </Provider>
    </>
  )
};
