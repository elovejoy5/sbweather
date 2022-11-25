import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

async function main() {
  if (process.env.NODE_ENV === "development") {
    if (window.location.pathname === "/sbweather") {
      window.location.pathname = "/sbweather/";
      return;
    }
    const { worker } = require("./mocks/browser");
    await worker.start({
      serviceWorker: {
        url: "/sbweather/mockServiceWorker.js",
      },
    });
  }
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
main();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
