import * as React from "react";

interface IProps {
  title: string;
  items: string[];
}

export default class NavbarDropdown extends React.Component<IProps> {
  public render() {
    return (
      <div className="navbar-item has-dropdown is-hoverable">
        <span className="navbar-link">{this.props.title}</span>
        <div className="navbar-dropdown is-boxed">
          {this.props.items.map((item: string) => (
            <span className="navbar-item">{item}</span>
          ))}
        </div>
      </div>
    );
  }
}
