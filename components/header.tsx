import Link from 'next/link'

export default () => (
  <div className="navbar is-primary">
    <div className="navbar-brand">
      <Link href="/">
        <span className="navbar-item">
          Wowgit
        </span>
      </Link>
    </div>

    <div className="navbar-menu">
      <div className="navbar-start">
      <div className="navbar-item has-dropdown is-hoverable">
          <span className="navbar-link">
            Repository
          </span>
          <div className="navbar-dropdown is-boxed">
            <span className="navbar-item">Repo 1</span>
            <span className="navbar-item">Repo 2</span>
          </div>
        </div>
        <div className="navbar-item has-dropdown is-hoverable">
          <span className="navbar-link">
            Branch
          </span>
          <div className="navbar-dropdown is-boxed">
            <span className="navbar-item">Branch 1</span>
            <span className="navbar-item">Branch 2</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)
