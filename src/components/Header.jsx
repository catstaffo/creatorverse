const Header = () => {
  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom border-primary">
        <a
          href="/"
          className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
        >
          <img
            src="/world-1-svgrepo-com.svg"
            alt="Company logo"
            width="40"
            height="32"
            className="me-2"
          />
          <span style={{ color: "#6610f2" }}>Creator</span>verse
        </a>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <a href="/" className="nav-link link-dark">
              Home
            </a>
          </li>
          <li>
            <a href="/creators" className="nav-link link-dark">
              Creator Profiles
            </a>
          </li>
          <li>
            <a href="/creators/add" className="nav-link link-dark">
              Add Profile
            </a>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
