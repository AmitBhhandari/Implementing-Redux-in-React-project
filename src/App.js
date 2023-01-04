import React from "react";
import "./App.css";

import { Route, Redirect } from "react-router-dom";

import Welcome from "./Components/Pages/Welcome";
import IncompleteProfile from "./Components/Pages/IncompleteProfile";
import ForgotPassword from "./Components/Pages/ForgetPassword";
import Expenses from "./Components/Pages/Expenses";


import SignUp from "./Components/Pages/SignUp";
import SignIn from "./Components/Pages/SignIn";
import Header from "./Components/Layout/Header";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";

import { ExpenseActions } from "./Components/store/ExpenseReducer";


function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();       

  const getExpenseFetching = async () => {
    try {
      const response = await fetch(
        "https://expense-tracker-b10e3-default-rtdb.firebaseio.com//expenses.json",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      let itemsArray = [];
      let expensesAmount;
      if (!!data) {
        itemsArray = Object.keys(data).map((expense) => {
          return {
            id: expense,
            money: data[expense].money,
            description: data[expense].description,
            category: data[expense].category,
          };
        });
      }
      expensesAmount = itemsArray.reduce((curNumber, expense) => {
        return curNumber + Number(expense.money);
      }, 0);
      dispatch(
        ExpenseActions.addExpense({
          itemsArray: itemsArray,
          expensesAmount: expensesAmount,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  
  
  return (
    <React.Fragment>
      <Header />
       {isLoggedIn && (
        <Route path="*">
          <Redirect to="/expenses" />
        </Route>
      )}

         {!isLoggedIn && (
        <Route path="*">
          <Redirect to="/" />
        </Route>
      )}


      <Route path="/signUp">
        <SignUp />
      </Route>
      <Route path="/signIn">
        <SignIn />

     

      </Route>
      <Route path="/incompleteProfile">
        <IncompleteProfile />


      </Route>
      <Route path="/forgotPassword">
        <ForgotPassword />
      </Route>
      
     
        <Route path="/expenses">
          {isLoggedIn ? <Expenses /> : <Redirect to="/signIn" />}
        </Route>

         <Route path="/welcome">
        {isLoggedIn ? <Welcome /> : <Redirect to="/signIn" />}
      </Route>
      
    </React.Fragment>
  );
}

export default App;
