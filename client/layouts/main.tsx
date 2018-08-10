import * as React from "react";

import Header from "../containers/header";

/* tslint:disable */
const style = require("../styles/style.scss");

export default ({ children }) => (
  <div>
    <style dangerouslySetInnerHTML={{ __html: style }} />
    <Header />
    {children}
  </div>
);
