import React, { Component, Fragment, useState } from "react";
import { Body } from "../components/Body";
import { LoginForm } from "../components/LoginForm";
import { CustomAlert } from "../../../components/CustomAlert/index";

const Dashboard = () => {
  const [token, setToken] = useState(null);
  const [username, setusername] = useState(null);
  const [loginForm, setloginForm] = useState(true);

  const [openAlert, setOpenAlert] = React.useState(false);

  const logIn = async (username, password) => {
    const data = new FormData();
    data.append("username", username);
    data.append("password", password);

    let res = await fetch("http://127.0.0.1:8000/access/", {
      method: "POST",
      mode: "cors",
      cache: "default",
      body: data,
    });
    let response = await res.json();
    setToken(response.token);
    setusername(response.username)
    setloginForm(false);
  };

  const handleAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleOpen = () => {
    setloginForm(true);
  };

  const handleClose = (username, password) => {
    if (!token) {
      handleAlert();
    }
    setloginForm(false);
    if (username && password) {
      logIn(username, password);
    }
  };

  return (
    <Fragment>
      <Body token={token} />
      <LoginForm
        open={!token || loginForm}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
      <CustomAlert
        open={openAlert}
        handleClose={handleCloseAlert}
        msg={
          username
            ? "Welcome back " + username
            : "You need to log in, so you can use the app"
        }
      />
    </Fragment>
  );
};

export default Dashboard;
