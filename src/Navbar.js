import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [user, setUser] = useState(null);

  const fetchData = () => {
    fetch("/session", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.ok) {
          setUser(data.found);
        } else {
          setUser(null);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <Link class="navbar-brand" to="/app">
            <img src="/logo512.png" alt="" width="30" height="24" />
          </Link>
        </div>
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/login"} className="btn">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="btn">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/contacts"} className="btn">
                  Contacts
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/profile"} className="btn">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/*<p className="container-fluid">you are logged in as: </p>*/}
      </nav>
      <div id="detail">
        <Outlet context={[user, setUser]} />
      </div>
    </>
  );
}
export default Navbar;
