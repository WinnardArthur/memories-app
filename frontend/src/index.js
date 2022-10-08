import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { GoogleOAuthProvider } from '@react-oauth/google';

const store = createStore(reducers, compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <GoogleOAuthProvider clientId='859020375720-o7fp4h6ro0sl0l7m1odvo4l0shaet80r.apps.googleusercontent.com'>
        <App />
      </GoogleOAuthProvider>
    </Provider>
);

