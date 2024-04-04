import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Accordion from 'react-bootstrap/Accordion';


function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const getUser = async () => {
    const URL = "https://randomuser.me/api/";

    try {
      const res = await axios(URL);

      if (res.status !== 200) {
        throw new Error("Api isteği başarısız");
      }

      const data = res.data;
      setData(data);
    } catch (error) {
      console.log(error);
      setErr(error);
    }
  };
  // veriyi çağırma
  useEffect(() => {
    getUser();
  }, []);

  //loading
  useEffect(() => {
    const time = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(time);
  }, []);
console.log(data)
  return (
    <div className="App d-flex justify-content-center align-items-center">
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden border border-5">Loading...</span>
        </Spinner>
      ) : (
        <div className="person-card">
          <div className="person-image">
            <img src={data.results[0].picture.large} alt="" />
          </div>
          <div className="accordion-info">
          <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>NAME</Accordion.Header>
        <Accordion.Body>
          {
          `${data.results[0].name.first} ${data.results[0].name.last}`
          }
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1">
        <Accordion.Header>EMAİL</Accordion.Header>
        <Accordion.Body>
          {data.results[0].email}
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
