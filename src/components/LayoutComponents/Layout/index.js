import React from "react";
import Routes from "../../../routes";
import { Link, HashRouter as Router } from "react-router-dom";

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <nav className="navigation">
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/missions">Missions</Link>
              </li>
              <li>
                <Link to="/launchpads">Launchpads</Link>
              </li>
            </ul>
          </nav>
          <div className="content">
            <Routes />
          </div>
        </Router>
      </div>
    );
  }
}

export default Layout;
