import React, { useContext, useRef, useEffect } from "react";
import UserContext from "../context/user/userContext";

const UserFilter = () => {
  const userContext = useContext(UserContext);
  const text = useRef("");

  const { filtered, filterUser, clearFilteredUser } = userContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterUser(e.target.value);
    } else {
      clearFilteredUser();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Search Users by name..."
        onChange={onChange}
      />
    </form>
  );
};

export default UserFilter;
