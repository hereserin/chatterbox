import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from "./app";
import { ActionCableProvider } from "react-actioncable-provider";
// import registerServiceWorker from "./registerServiceWorker";

// import ActionCable from "actioncable";

// const cable = ActionCable.createConsumer('ws://test.example.com/cable');

// <ActionCableProvider cable={cable}>...</ActionCableProvider>;

const Root = ({ store }) => {
  return (
    <ActionCableProvider url={"ws://localhost:3000/cable"}>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </ActionCableProvider>
  );
};

export default Root;
