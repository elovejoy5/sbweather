import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

async function main() {
  const disableMsw = Boolean(localStorage.getItem("disableMsw"));
  // app complains if we don't have a trailing slash
  if (window.location.pathname === "/sbweather") {
    window.location.pathname = "/sbweather/";
  }
  // dev? enable msw https://mswjs.io/docs/
  if (process.env.NODE_ENV === "development" && !disableMsw) {
    console.log(
      // eslint-disable-next-line
      "msw is enabled (at least some API calls being handled by msw). To disable: \n" +
        'localStorage.setItem("disableMsw",true)'
    );
    const { worker } = require("./mocks/browser");
    await worker.start({
      serviceWorker: {
        url: "/sbweather/mockServiceWorker.js",
      },
    });
  }

  if (process.env.NODE_ENV === "development" && disableMsw) {
    console.log(
      // eslint-disable-next-line
      "msw disabled. To enable: \n" + 'localStorage.removeItem("disableMsw")'
    );
  }

  // once we've figured out whether or not to enable msw, render the app
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  //
  // localStorage.setItem("disableMsw",true)
  const sbweatherDebug = Boolean(localStorage.getItem("sbweatherDebug"));
  if (sbweatherDebug) {
    console.log(
      "to limit debug messages: localStorage.removeItem('sbweatherDebug')"
    );
  } else {
    console.log(
      "to enable debug messages: localStorage.setItem('sbweatherDebug',true)"
    );
  }
}
main();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
