import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './scss/styles.scss'

import { PublicClientApplication } from "@azure/msal-browser"
import { MsalProvider } from "@azure/msal-react"
import { msalConfig } from "./authConfig"

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <React.StrictMode>
      <MsalProvider instance={msalInstance}>
          <App />
      </MsalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
