import { Outlet, Link } from "react-router-dom";
import './App.css'

const Layout = () => {
  return (
    <>
        <nav className="navbar m-2 navbar-expand-lg navbar-light ">
        <a className="navbar-brand" href="#">Togyzq</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <a className="nav-link" ><Link to="/">Home</Link></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#"><Link to="/">Lol</Link></a>
            </li>

            <li className="nav-item">
                <a className="nav-link" href="#"><Link to="/">Lol</Link></a>
            </li>
            </ul>
            <form className="form-inline display-flex">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                </input>
            </form>
        </div>
        </nav>
    <Outlet/>
    </>
  )
};

export default Layout;