import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import './index.css';
import './language';
import Layout from './Layout';
import reportWebVitals from './reportWebVitals';
import styled from 'styled-components';

import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

const Centered = styled.div`
  display: flex;
  justifyContent: center;
  alignItems: center;
  height: 100%;
`;

ReactDOM.render(
  <React.StrictMode>
    <Centered>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </SnackbarProvider>
    </Centered>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
