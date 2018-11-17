import * as React from "react";

interface IProps {
  title: string;
  items: string[];
  onClick: (text: string) => void;
}

export default ({ title, items, onClick }: IProps) => (
  <div className="navbar-item has-dropdown is-hoverable">
    <span className="navbar-link">{title}</span>
    <div className="navbar-dropdown is-boxed">
      {items.map(item => (
        <span
          key={item}
          className="navbar-item"
          onClick={() => {
            onClick(item);
          }}
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);
