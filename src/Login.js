import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [User, setUser] = useOutletContext();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const clickLogin = (e) => {
    fetch("userLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.ok) {
          setUser(result.found);
          console.log("result: ", result);

          return navigate("/profile");
        } else {
          //alert("not found!");
        }
        setName("");
        setPassword("");
      });
  };

  const clickLogout = async (e) => {
    await fetch("/userLogout");
    console.log("logging out!");
    setUser(null);
    navigate("/login");
  };

  if (!User) {
    return (
      <>
        <h3 className="mx-auto pt-5 w-50">Login</h3>
        <div className="input-group mb-3 w-50 mx-auto pt-4">
          <span className="input-group-text" id="name"></span>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            aria-label="Name"
            aria-describedby="basic-addon1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group mb-3 w-50 mx-auto pt-4">
          <span className="input-group-text" id="password"></span>
          <input
            type="text"
            className="form-control"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid gap-2 w-50 mx-auto pt-4">
          <button
            onClick={clickLogin}
            className="btn btn-primary"
            type="button"
          >
            Login
          </button>
        </div>

        <p className="small text-center fw-bold mt-2 pt-1 mb-0">
          Don't have an account?{" "}
          <Link to={"/profile"} className="link-danger">
            Register
          </Link>
        </p>
      </>
    );
  } else {
    return (
      <>
        <p className="small text-center w-50 mx-auto fw-bold mt-2 pt-1 mb-0">
          You are Logged in as: {User.name}
          <button className="btn btn-danger" onClick={clickLogout}>
            Logout
          </button>
        </p>
      </>
    );
  }
}

export default Login;
