import Header from "../containers/header";
import style from "../styles/style.scss";

export default ({ children }) => (
  <div>
    <style dangerouslySetInnerHTML={{ __html: style }} />
    <Header />
    {children}
  </div>
);
