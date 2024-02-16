import axios from "axios";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function App() {
  const url = "http://localhost:3001/posts";
  const [data, setdata] = useState([]);

  useEffect(() => {
    Fdata();
  }, []);

  const Fdata = () => {
    axios.get(url).then((res) => {
      console.log(res.data);
      setdata(res.data);
    });
  };

  // post

  const [Udata, setUdata] = useState([]);

  const chang = (e) => {
    setUdata({ ...Udata, [e.target.name]: e.target.value });
  };

  const Submit = () => {
    axios.post("http://localhost:3001/posts", Udata).then((res) => {
      console.log(res);
      Fdata();
    });
  };

  // delete

  const DeleteData = (id) => {
    axios.delete(`http://localhost:3001/posts/${id}`).then((res) => {
      const delet = data.filter((e) => e.id !== id);
      setdata(delet);
    });
  };

  // edit

  const [Edata, setEdata] = useState(null);

  const Editdata = (index) => {
    const edit = data[index];
    setEdata(edit);
  };

  const onchangeEdit = (e) => {
    setEdata({ ...Edata, [e.target.name]: e.target.value });
  };

  const edithandal = (id) => {
    axios.put(`http://localhost:3001/posts/${id}`, Edata).then((res) => {
      Fdata();
      setEdata(null);
    });
  };

  return (
    <>
      <input type="text" name="firstName" onChange={chang} />
      <input type="text" name="lastName" onChange={chang} />
      <button onClick={Submit}>Submit</button>

      {/* edit */}

      {Edata && (
        <>
          <input
            type="text"
            name="firstName"
            value={Edata.firstName}
            onChange={onchangeEdit}
          />
          <input
            type="text"
            name="lastName"
            value={Edata.lastName}
            onChange={onchangeEdit}
          />
          <button onClick={() => edithandal(Edata.id)}>Edit</button>
        </>
      )}

      {/* sow data */}

      {data.map((i, index) => {
        return (
          <div key={index}>
            <>{i.firstName}</>
            <>{i.lastName}</>
            <button onClick={() => DeleteData(i.id)}>Delete</button>
            <button
              onClick={() => {
                Editdata(index);
              }}
            >
              Edit
            </button>
          </div>
        );
      })}
    </>
  );
}

export default App;
