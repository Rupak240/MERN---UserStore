import React, { useReducer } from "react";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import axios from "axios";

import {
  GET_USER,
  ADD_USER,
  DELETE_USER,
  EDIT_USER,
  ERROR_USER,
  FILTER_USER,
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER, CLEAR_FILTER_USER
} from "../types";

const UserState = (props) => {
  const initialState = {
    users: [],
    current: null,
    loading: true,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // GET USERS
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/users");

      dispatch({ type: GET_USER, payload: res.data });
    } catch (error) {
      dispatch({ type: ERROR_USER, payload: error.response.msg });
    }
  };

  // ADD NEW USER
  const addUser = async (user) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      console.log(user)
      const res = await axios.post("/api/users", user, config);

      dispatch({ type: ADD_USER, payload: res.data });
    } catch (error) {
      dispatch({ type: ERROR_USER, payload: error.response.data.msg });
    }
  };

  // EDIT USER
  const editUser = async (user) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(`/api/users/${user._id}`, user, config);

      dispatch({ type: EDIT_USER, payload: res.data });
    } catch (error) {
      dispatch({ type: ERROR_USER, payload: error.response.msg });
    }
  };

  // DELETE USER
  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);

      dispatch({ type: DELETE_USER, payload: id });
    } catch (error) {
      dispatch({ type: ERROR_USER, payload: error.response.msg });
    }
  };

  // SET CURRENT USER
  const setCurrentUser = (user) => {
    dispatch({ type: SET_CURRENT_USER, payload: user });
  };


  // FILTER USER
  const filterUser = (text) => {
    dispatch({ type: FILTER_USER, payload: text });
  };

  // CLEAR CURRENT USER
  const clearCurrentUser = () => {
    dispatch({ type: CLEAR_CURRENT_USER });
  };

  // CLEAR FILTERED USER
  const clearFilteredUser = () => {
    dispatch({type: CLEAR_FILTER_USER})
  }


  return (
    <UserContext.Provider
      value={{
        users: state.users,
        filtered: state.filtered,
        current: state.current,
        loading: state.loading,
        error: state.error,
        getUsers,
        addUser,
        editUser,
        deleteUser,
        setCurrentUser,
        filterUser,
        clearCurrentUser, clearFilteredUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
