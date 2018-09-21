import * as React from "react";

interface IProps {
  title: string;
  items: string[];
  onClick: ({ id }) => void;
}

export default ({ title, items, onClick }: IProps) => (
  <div className="navbar-item has-dropdown is-hoverable">
    <span className="navbar-link">{title}</span>
    <div className="navbar-dropdown is-boxed">
      {items.map(item => (
        <span
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
