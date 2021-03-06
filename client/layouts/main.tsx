import * as React from "react";

import Header from "../containers/header";

// tslint:disable-next-line
const style = require("../styles/style.scss");

export default ({ children }) => (
  <>
    <style dangerouslySetInnerHTML={{ __html: style }} />
    <Header />
    {children}
  </>
);
