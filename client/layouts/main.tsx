import * as React from "react";
import { Provider } from "react-redux";

import Header from "../containers/header";
import { store } from "../models";
import style from "../styles/style.scss";

export default ({ children }) => (
  <Provider store={store}>
    <div>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <Header />
      {children}
    </div>
  </Provider>
);
