import React, { Fragment, useContext, useEffect } from "react";
import UserContext from "../context/user/userContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import User from "./User";
import Spinner from "./Spinner";

const UserList = () => {
  const userContext = useContext(UserContext);

  const { filtered, getUsers, users, loading } = userContext;

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  if (users.length === 0 && !loading) {
    return <h3>Please Add a User...</h3>;
  }

  return (
    <Fragment>
      {users.length > 0 && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((user) => (
                <CSSTransition key={user._id} timeout={500} classNames="item">
                  <User user={user} />
                </CSSTransition>
              ))
            : users.map((user) => (
                <CSSTransition key={user._id} timeout={500} classNames="item">
                  <User user={user} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default UserList;
