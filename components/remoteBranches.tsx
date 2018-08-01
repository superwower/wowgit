interface IProps {
  remote: string;
  branches: string[];
}

export default (props: IProps) => (
  <aside className="menu">
    <p className="menu-label">{props.remote}</p>
    <ul className="menu-list">
      {props.branches.map(branch => (
        <li>
          <a>{branch}</a>
        </li>
      ))}
    </ul>
  </aside>
);
