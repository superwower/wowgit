import { IBranchST } from "../models/branch";

interface IProps {
  remote: string;
  branches: IBranchST[];
}

export default (props: IProps) => (
  <aside className="menu">
    <p className="menu-label">{props.remote}</p>
    <ul className="menu-list">
      {props.branches.map((branch, index) => (
        <li key={index}>
          <a>{branch.name}</a>
        </li>
      ))}
    </ul>
  </aside>
);
