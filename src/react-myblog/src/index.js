import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './scss/styles.scss'
import { BrowserRouter } from 'react-router-dom'
import { PublicClientApplication } from "@azure/msal-browser"
import { MsalProvider } from "@azure/msal-react"
import { msalConfig } from "./authConfig"

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
