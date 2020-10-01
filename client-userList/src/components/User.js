import React, { useContext } from "react";
import PropTypes from "prop-types";
import UserContext from "../context/user/userContext";

const User = ({ user }) => {
  const userContext = useContext(UserContext);

  const { deleteUser, setCurrentUser, clearCurrentUser } = userContext;

  const { name, email, _id } = user;

  const onDelete = () => {
    deleteUser(_id);
    clearCurrentUser();
  };

  return (
    <div className="card">
      <p className="username">
        {name} {"-"} <span>{email}</span>
      </p>
      <div className="card-icons">
        <i className="fas fa-edit" onClick={() => setCurrentUser(user)}></i>
        <i className="fas fa-trash-alt" onClick={onDelete}></i>
      </div>
    </div>
  );
};

User.prototypes = {
  user: PropTypes.object.isRequired,
};

export default User;
