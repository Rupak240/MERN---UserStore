import React from "react";
import UserFilter from "./UserFilter";
import UserForm from "./UserForm";
import UserList from "./UserList";

const Home = () => {
  return (
    <div className="grid-2">
      <div style={{ padding: "0 2rem" }}>
        <UserForm />
      </div>
      <div style={{ padding: "0 2rem" }}>
        <UserFilter />
        <UserList />
      </div>
    </div>
  );
};

export default Home;
