import React from "react";
import { Link } from "react-router-dom";


import classes from "./Welcome.module.css"
import { useSelector } from "react-redux";

const Welcome = () => {
  const idToken = useSelector((state) => state.auth.idToken);
    const verifyEmailHandler = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDhd2ZRBrGww8WdRmaYJda8bVMMDEJP-DU",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: idToken,
            requestType: "VERIFY_EMAIL",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data.email);
      } else {
        alert(data.error.message);
      }
    };
  return (
    <div>
      <h2 className={classes.title}>Welcome To Expense Tracker</h2>
      <p className={classes.status}>
        Your Profile is incomplete.
        <Link to="/incompleteProfile"> Complete Profile</Link>
      </p>
      <button onClick={verifyEmailHandler}>Verify Email</button>
    </div>
  );
};

export default Welcome;