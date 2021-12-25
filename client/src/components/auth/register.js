import React, { useState } from "react";
import { useSelector } from "react-redux";
import SignupStep1 from "./register-phone";
import SignupStep2 from "./register-profile";
import OTPVerify from "./login-verify";

function Register() {
  const [action, setAction] = useState({
    openStep1: true,
    openStep2: false,
    openOTPVerify: false
  });
  const {
    phoneNumber
  } = useSelector(state => state.userReducer);

  const handleActions = actions => {
    setAction(actions);
  };

  return <>
      {action.openStep1 && <SignupStep1 handleActions={handleActions} />}
      {action.openOTPVerify && <OTPVerify handleActions={handleActions} phoneNumber={phoneNumber} />}
      {action.openStep2 && <SignupStep2 />}
    </>;
}

export default Register;