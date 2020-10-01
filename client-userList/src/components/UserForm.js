import React, { useState, useContext, useEffect, Fragment } from "react";
import UserContext from "../context/user/userContext";
import AlertContext from "../context/alert/alertContext";
import Alert from "./Alert";

const UserForm = () => {
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const { addUser, editUser, current, clearCurrentUser } = userContext;

  useEffect(() => {
    if (current !== null) {
      setUser(current);
    } else {
      setUser({ name: "", email: "" });
    }
  }, [userContext, current]);

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const { name, email } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (current === null) {
      if (name === "" && email === "") {
        setAlert("Please fill out the details", "danger");
      } else if (name === "") {
        setAlert("Name is required", "danger");
      } else if (email === "") {
        setAlert("Email is required", "danger");
      } else if (!email.includes("@", ".")) {
        setAlert("Email is invalid", "danger");
      } else {
        addUser(user);
      }
    } else {
      console.log(user);
      editUser(user);
    }

    clearAll();
  };

  const clearAll = () => {
    clearCurrentUser();
  };

  return (
    <Fragment>
      <Alert />
      <form onSubmit={onSubmit} noValidate autoComplete="off">
        <h2 className="text-primary">{current ? "Edit User" : "Add User"}</h2>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
        />
        <div>
          <input
            type="submit"
            className="btn btn-light btn-block"
            style={{ borderRadius: "3px" }}
            value={current ? "Update User" : "Add User"}
          />
        </div>
        {current && (
          <div>
            <button className="btn btn-light btn-block" onClick={clearAll}>
              Clear
            </button>
          </div>
        )}
      </form>
    </Fragment>
  );
};

export default UserForm;
