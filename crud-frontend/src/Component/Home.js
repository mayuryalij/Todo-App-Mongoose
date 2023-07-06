import React, { useState, useEffect } from "react";
import axios from "axios";

const baseURL = "http://localhost:4000";

function HomeComponent() {
  const [loader, setloader] = useState(true);

  const [contactList, setcontactList] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/contactlist/`)
      .then((res) => {
        setcontactList(res.data);
        setloader(false);
      })
      .catch((err) => {
        console.log("Error ", err);
        setloader(false);
      });
  }, [loader]);

  const [formData, setformData] = useState({
    fullname: "",
    address: "",
    ph_number: "",
  });

  const [editId, setEditId] = useState(null);

  const { fullname, address, ph_number } = formData;

  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editId) {
      axios
        .post(`${baseURL}/contactlist/add`, formData)
        .then(() => {
          console.log("Added Successfully");
          setformData({
            fullname: "",
            address: "",
            ph_number: "",
          });
          setloader(true);
        })
        .catch((err) => {
          console.log("API ERROR ", err);
        });
    } else {
      axios
        .put(`${baseURL}/contactlist/update/${editId}`, formData)
        .then(() => {
          console.log("Updated Successfully");
          setloader(true);
          setformData({
            fullname: "",
            address: "",
            ph_number: "",
          });
        })
        .catch((err) => {
          console.log("API ERROR ", err);
        });
    }
  };

  const handleEdit = (item) => {
    setformData({
      fullname: item.fullname,
      address: item.address,
      ph_number: item.ph_number,
    });
    setEditId(item._id);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${baseURL}/contactlist/delete/${id}`)
      .then(() => {
        console.log("Delete Successfully");
        setloader(true);
      })
      .catch((err) => {
        console.log("API ERROR ", err);
      });
  };

  return (
    <div>
      {loader ? (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <div className="container">
          <div className="row" style={{ marginTop: "50px" }}>
            <div className="col-lg-4  col-sm-3 col-md-6 ">
              <form onSubmit={(e) => handleSubmit(e)} className="shadow p-4">
                <div className="mb-3 mt-3">
                  <label htmlFor="fullname" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullname"
                    placeholder="Enter name"
                    name="fullname"
                    value={fullname}
                    minLength={5}
                    maxLength={25}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Enter address"
                    name="address"
                    value={address}
                    minLength={3}
                    maxLength={50}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
                <div className="mb-3 mt-3">
                  <label htmlFor="ph_number" className="form-label">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ph_number"
                    placeholder="Enter phone number"
                    name="ph_number"
                    minLength={10}
                    maxLength={10}
                    value={ph_number}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </form>
            </div>
            <div className="col-lg-8  col-sm-9 col-md-6">
              <div className="table-responsive">
                <table className="table table-bordered shadow">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Full Name</th>
                      <th>Address</th>
                      <th>Mobile Number</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactList.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.fullname}</td>
                          <td>{item.address}</td>
                          <td>{item.ph_number}</td>
                          <td className="text-center">
                            <button
                              className="btn btn-primary mx-2"
                              onClick={() => handleEdit(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger  mx-2"
                              onClick={() => handleDelete(item._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeComponent;
