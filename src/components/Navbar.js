import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className='container'>
        <NavLink className="navbar-brand" to="/" >Home</NavLink>
        <ul className="navbar-nav" style={{flexDirection : 'row'}}>
          <li className="nav-item me-3">
            <NavLink
              activeClassName="active"
              className="nav-link"
              aria-current="page"
              to="/admin">
              Admin
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="active"
              className="nav-link"
              aria-current="page"
              to="/blogs">
              Blogs
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;