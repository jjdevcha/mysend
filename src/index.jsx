import ReactDOM from "react-dom/client"
import React from "react"
import { Provider } from "react-redux"

import "./input.css"
import App from "./App"
import store from "./store/index"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
