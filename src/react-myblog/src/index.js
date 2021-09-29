import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './scss/styles.scss'
import { BrowserRouter } from 'react-router-dom'
import { PublicClientApplication } from "@azure/msal-browser"
import { MsalProvider } from "@azure/msal-react"
import { msalConfig } from "./authConfig"
import { Provider } from 'react-redux'
import store from './store'

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MsalProvider instance={msalInstance}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MsalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
