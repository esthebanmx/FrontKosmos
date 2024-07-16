// import logo from './logo.svg';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { ConfigProvider } from 'antd';
import MainLayout from './containers/MainLayout';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#d5007f',
          // fontSize: '16'
        }
      }}
    >
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
