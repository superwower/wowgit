export default () => (
  <div className="navbar is-transparent">
    <div className="navbar-brand">
      <a className="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28"></img>
      </a>
    </div>

    <div className="navbar-menu">
      <div className="navbar-start">
        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link" href="/documentation/overview/start/">
            Docs
          </a>
          <div className="navbar-dropdown is-boxed">
            <a className="navbar-item" href="/documentation/overview/start/">
              Overview
            </a>
            <a className="navbar-item" href="https://bulma.io/documentation/modifiers/syntax/">
              Modifiers
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
)
