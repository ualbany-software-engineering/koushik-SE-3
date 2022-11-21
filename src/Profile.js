import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useOutletContext();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

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
          setName(data.found.name);
          setImage(data.found.image);
          setAbout(data.found.about);
        } else {
          setUser(null);
          return navigate("/login");
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = async (e) => {
    const img = await getBase64(e.target.files[0]);
    setImage(img);
  };

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

  const clickUpdate = (e) => {
    let formData = new FormData();
    formData.append("file", image.data);

    fetch("/userUpdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        password: user.password,
        mods: {
          name: name,
          about: about,
          image:image
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          // alert("saved!");
          setUser(data.found);
          setName(data.found.name);
          setImage(data.found.image);
          setAbout(data.found.about);
        } else {
          // alert("not saved!");
        }
      });
  };

  if (!user) {
    return navigate("/login");
  }

  return (
    <>
      <h3 className="mx-auto pt-5 w-50">Profile</h3>
      <div class="mb-3 mb-3 w-50 mx-auto pt-4">
        {image && <img src={image} alt="img" width="200" height="200" />}
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

      <div className=" d-flex p-2 bd-highlight justify-content-evenly pt-4 pb-5">
        <button
          onClick={clickUpdate}
          className="btn btn-success btn-lg"
          type="button"
        >
          Update
        </button>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="btn btn-warning btn-lg"
          type="button"
        >
          Cancel
        </button>
      </div>
    </>
  );
}
export default Register;
