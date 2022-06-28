import logo from './logo.svg';
import { Router, Route, Routes } from "react-router-dom";
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import AddBrand from './Components/addBrand'
import AddProduct from './Components/addProduct';
import AllItems from "./Components/AllItems"
import Item from './Components/Item'
import Login from './Components/Authentication/login'
import SignUpForm from './Components/Authentication/signUpForm';
import SuccessfulSignup from './Components/SuccessfulSignUp';
import UserContext from './Context/Usercontext';
import Logout from './Components/logout'
import Prompt from './Components/prompt'
import SignInSuccessful from './Components/signinsuccessful';
import BarcodeScanner from './barcode';
import UpdatedSuccessfully from './Components/updatedsuccessfully';
import './App.css';

function App() {

  const [jwtToken, setjwtToken] = useState(null)

  useEffect(() => {
    try {
      const jwt = localStorage.getItem('token')
      const user = jwtDecode(jwt)
      console.log(user)
      setjwtToken(user)
    } catch (ex) {
    console.log(ex)
  }
},[])


return (
  <div className="App">

    <React.Fragment>
      <UserContext.Provider value ={jwtToken}>
      <Navbar />
      <Routes>
        <Route path="/"/>
        <Route index element={<Login />} />
        <Route path="additem" element={<AddProduct />} />
        <Route path="allitems/*" element={<AllItems />} />
        <Route path="addbrand" element={<AddBrand />} />
        <Route path="signup" element={<SignUpForm />} />
        <Route path="logout" element={<Logout />} />
        <Route path="prompt" element={<Prompt />} />
        <Route path="item/:id/edit" element={<Item />} />
        <Route path="barcode" element={<BarcodeScanner />} />
        <Route path="signinsuccessful" element={<SignInSuccessful />} />
        <Route path="signupsuccessful" element={<SuccessfulSignup />} />
        <Route path="updatesuccessful" element={<UpdatedSuccessfully />} />
      </Routes>
      </UserContext.Provider>
    </React.Fragment>

  </div>
);
}

export default App;
