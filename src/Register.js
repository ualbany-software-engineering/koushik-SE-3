import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function Register() {
  const [User, setUser] = useOutletContext();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();
      // Convert the file to base64 text
      reader.readAsDataURL(file);
      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

  const handleFileChange = async (e) => {
    const img = await getBase64(e.target.files[0]);
    setImage(img);
  };

  const clickRegister = (e) => {
    if (password !== password2) {
      setPassword("");
      setPassword2("");
      return;
    }

    if (password === "") {
      return;
    }

    let formData = new FormData();
    formData.append("file", image.data);

    fetch("/userRegister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
        about: about,
        image: image,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.ok) {
          // alert("saved!");
          setUser(result.found);
          return navigate("/profile");
        } else {
          // alert("not saved!");
        }
        setName("");
        setPassword("");
      });
  };

  return (
    <>
      <h3 className="mx-auto pt-5 w-50">Register</h3>
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
      <div className="input-group mb-3 w-50 mx-auto pt-4">
        <span className="input-group-text" id="password2"></span>
        <input
          type="text"
          className="form-control"
          placeholder="Repeat Password"
          aria-label="Repeat Password"
          aria-describedby="basic-addon1"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
      </div>
      <div class="input-group input-group mb-3 w-50 mx-auto pt-4 ">
        <span class="input-group-text">About</span>
        <textarea
          class="form-control"
          aria-label="Abouy"
          rows="4"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        ></textarea>
      </div>
      <div class="mb-3 mb-3 w-50 mx-auto pt-4">
        {image && <img src={image} alt="img" width="100" height="100" />}
      </div>
      <div class="input-group mb-3 mb-3 w-50 mx-auto pt-4">
        <label class="input-group-text" for="inputGroupFile01">
          Profile Image
        </label>
        <input
          type="file"
          class="form-control"
          id="inputGroupFile01"
          onChange={handleFileChange}
        />
      </div>
      <div className="d-grid gap-2 w-50 mx-auto pt-4 pb-5">
        <button
          onClick={clickRegister}
          className="btn btn-primary"
          type="button"
        >
          Register
        </button>
      </div>
    </>
  );
}
export default Register;
