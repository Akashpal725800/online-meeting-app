import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">HMLogo Meet</Link>

        <div>
          <Link className="btn btn-outline-light me-2" to="/">
            Meetings
          </Link>
          <Link className="btn btn-outline-light" to="/create">
            Create
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
