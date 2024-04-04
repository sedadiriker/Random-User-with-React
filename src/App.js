import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Accordion from "react-bootstrap/Accordion";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [newUserBtn, setNewUserBtn] = useState("New User")

const handleNewUser = () => {
  getUser()
}
  const getUser = async () => {
    setNewUserBtn("...Loading")
    const URL = "https://randomuser.me/api/";

    try {
      const res = await axios(URL);

      if (res.status !== 200) {
        throw new Error("Api isteği başarısız");
      }

      const data = res.data;
      setData(data);
      setNewUserBtn("New User")
    } catch (error) {
      setNewUserBtn("New User")
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    }
  };

  // veriyi çağırma
  useEffect(() => {
    if (!data) {
      getUser();
    }
  }, []);

  //loading
  useEffect(() => {
    const time = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(time);
  }, []);

  const handleAddUser = () => {
    users.some((user) => user.name === data.results[0].name)
      ? Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Bu kullanıcı zaten mevcut!",
        })
      : setUsers([...users, data.results[0]]);
  };
  // console.log(users)
  const handleDelete = (id) => {
   setUsers(users.filter((user) => user.id.value !== id))
  };
  return (
    <div className="App d-flex justify-content-center align-items-center flex-column py-5">
      <h1 className="title">Random User</h1>
      {loading ? (
        <Spinner className="text-danger" animation="border" role="status">
        </Spinner>
      ) : (
        <div className="w-100">
          <div className="person-card m-auto w-75 d-flex justify-content-evenly align-items-center py-5 rounded-4">
            <div className="person-image  rounded-3 p-3 d-flex justify-content-center">
              <img
                className="rounded-circle w-75"
                src={data.results[0].picture.large}
                alt=""
              />
            </div>
            <div className="accordion-info w-50">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="custom-accordion-header">
                    NAME
                  </Accordion.Header>
                  <Accordion.Body>
                    {`${data.results[0].name.first} ${data.results[0].name.last}`}
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header className="custom-accordion-header">
                    EMAİL
                  </Accordion.Header>
                  <Accordion.Body>{data.results[0].email}</Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header className="custom-accordion-header">
                    BIRTHDAY
                  </Accordion.Header>
                  <Accordion.Body>
                    {new Date(data.results[0].dob.date).toLocaleDateString(
                      "tr-TR"
                    )}
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header className="custom-accordion-header">
                    ADRESS
                  </Accordion.Header>
                  <Accordion.Body>
                    {`${data.results[0].location.street.name}, ${
                      data.results[0].location.street.number
                    } ${data.results[0].location.city}, ${
                      data.results[0].location.state
                    }, ${data.results[0].location.country.toUpperCase()}, ${
                      data.results[0].location.postcode
                    }`}
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                  <Accordion.Header className="custom-accordion-header">
                    PHONE
                  </Accordion.Header>
                  <Accordion.Body>{data.results[0].phone}</Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">
                  <Accordion.Header className="custom-accordion-header">
                    USERNAME / PASSWORD
                  </Accordion.Header>
                  <Accordion.Body>
                    {
                      <>
                        <p>
                          <span className="fw-bold">Username : </span>
                          {data.results[0].login.username}
                        </p>
                        <p>
                          <span className="fw-bold">Password : </span>
                          {data.results[0].login.password}
                        </p>
                      </>
                    }
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
          <div className="btns d-flex justify-content-center gap-3 mt-3">
            <button onClick={handleNewUser} className="btn new-user">
             {newUserBtn}
            </button>
            <button onClick={handleAddUser} className="btn add-user">
              Add User
            </button>
          </div>

          <div className="added-user-card m-auto mt-4">
            {users.length > 0 && (
              <div className="added-users mt-4 p-3">
                              <h3 className="text-center text-uppercase text-success bg-body-secondary w-50 m-auto my-2"> User List</h3>

                <div className="user-header d-flex justify-content-between text-center mb-2 gap-2">
                  <h4 className="w-25 rounded-1 py-1">Name</h4>
                  <h4 className="w-25 rounded-1 py-1">Email</h4>
                  <h4 className="w-25 rounded-1 py-1">Phone</h4>
                  <h4 className="w-25 rounded-1 py-1">Birthday</h4>
                </div>

                {users.map((user) => (
                  <div className="d-flex position-relative" key={user.id.value}>
                    {" "}
                    <div className="user-info d-flex align-items-center justify-content-between text-center mb-1 py-2 w-100">
                      <div className=" name w-25">{`${user.name.first} ${user.name.last}`}</div>
                      <div className="email w-25">{user.email}</div>
                      <div className="phone w-25">{user.phone}</div>
                      <div className="birthday w-25">
                        {new Date(user.dob.date).toLocaleDateString("tr-TR")}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(user.id.value)}
                      className="btn delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
