import { useEffect, useState } from "react";

function Contacts() {
  const [users, setUsers] = useState([]);

  const fetchData = () => {
    fetch("/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data.found);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {users.length ? (
        <ul>
          {users.map((contact) => (
            <li key={contact.id} class="">
              <div class="row ">
                <div class="col-sm-2">
                  <img src={contact.image} alt="img" width="150" height="150" />
                </div>
                <div class="col-sm-10">
                  <h3>{contact.name}</h3>
                  <p>{contact.about}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          <i>No contacts</i>
        </p>
      )}
    </>
  );
}

export default Contacts;
