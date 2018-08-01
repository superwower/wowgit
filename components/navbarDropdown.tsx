interface IProps {
  title: string;
  items: string[];
}

export default (props: IProps) => (
  <div className="navbar-item has-dropdown is-hoverable">
    <span className="navbar-link">{props.title}</span>
    <div className="navbar-dropdown is-boxed">
      {props.items.map(item => <span className="navbar-item">{item}</span>)}
    </div>
  </div>
);
