import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route } from "react-router-dom"
import "./index.css"
import App from "./App"
import ImagesList from "./../src/ImageList/ImageList"
import * as serviceWorker from "./serviceWorker"

ReactDOM.render(
  <BrowserRouter>
      <Route exact path="/" component={App} />
      <Route path="/images" component={ImagesList} />
  </BrowserRouter>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
