import Link from "next/link";
import NavbarDropdown from "../components/navbarDropdown";

export default () => (
  <div className="navbar is-primary">
    <div className="navbar-brand">
      <Link href="/">
        <span className="navbar-item">Wowgit</span>
      </Link>
    </div>

    <div className="navbar-menu">
      <div className="navbar-start">
        <NavbarDropdown
          title="Repository"
          items={["Repository1", "Repository2"]}
        />
        <NavbarDropdown title="Branch" items={["Branch1", "Branch2"]} />
      </div>
    </div>
  </div>
);
