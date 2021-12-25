import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Box, Button, makeStyles, TextField, Typography } from "@material-ui/core";

import { updateEmail, updateUserInfo } from "../../actions/user-action";
import toastMessage from "../../utils/toast-message";

import { Capitalize } from "../../utils/string-util";

const useStyles = makeStyles((theme) => ({
  component: {
    padding: "30px 40px 0 40px",
  },
  form: {
    display: "flex",
    alignItems: "flex-start",
    margin: "20px 0",
  },
  saveBtn: {
    width: "150px",
    padding: "12px",
    color: "rgb(255, 255, 255)",
    borderRadius: "3px",
    fontSize: "16px",
    boxShadow: "none",
  },
  input: {
    width: "270px",
    fontSize: "14px",
    outline: "none",
    borderRadius: "2px",
    boxShadow: "none",
    marginRight: 10,
  },
  title: {
    fontSize: "18px",
    fontWeight: 600,
    paddingRight: "24px",
    display: "inline-block",
  },
  editLink: {
    display: "inline-block",
    fontSize: "14px",
    fontWeight: 500,
    color: "#222",
    cursor: "pointer",
  },
}));

function PersonalInfo() {
  const [isEditPInfo, setIsEditPInfo] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const { user } = useSelector((state) => state.userReducer);

  const [values, setValues] = useState({
    fname: user.fname,
    lname: user.lname,
    phone: user.phone,
    email: user.email,
  });

  const [errors, setErrors] = useState({
    fname: false,
    lname: false,
    email: false,
    phone: false,
  });

  const [errorMsg, setErrorMsg] = useState({
    fName: "",
    lName: "",
    phone: "",
    email: "",
  });

  const classes = useStyles();
  const initial = useRef(true);
  const dispatch = useDispatch();

  const [saveCountPInfo, setSaveCountPInfo] = useState(0);
  const [saveCountEmail, setSaveCountEmail] = useState(0);

  useEffect(() => {
    if (initial.current === false) {
      if (!errors.fname && !errors.lname) {
        axios
          .patch("/accounts/update-user-info", {
            id: user._id,
            fname: Capitalize(values.fname),
            lname: Capitalize(values.lname)
          })
          .then(() => {
            dispatch(
              updateUserInfo(
                Capitalize(values.fname),
                Capitalize(values.lname)
              )
            );
            toastMessage("Account details updated", "success");
          })
          .catch((e) => {
            toastMessage("Something went wrong.", "error");
          });
        setIsEditPInfo(false);
      }
    }
  }, [saveCountPInfo]);

  useEffect(() => {
    if (initial.current === true) {
      initial.current = false;
    } else {
      if (!errors.email) {
        axios
          .patch("/accounts/update-email", {
            id: user._id,
            email: values.email,
          })
          .then(() => {
            dispatch(updateEmail(values.email));
            toastMessage("Email updated", "success");
          })
          .catch((e) => {
            toastMessage("Something went wrong.", "error");
          });
        setIsEditEmail(false);
      }
    }
  }, [saveCountEmail]);

  const regName = /^[a-zA-Z]+$/;
  const regEmail =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  const validateName = (name, fieldName) => {
    if (name === "") {
      return {
        isError: true,
        errorMsg: `${fieldName} cannot be empty`,
      };
    } else if (name.length < 3) {
      return {
        isError: true,
        errorMsg: "Minimum 3 charterers",
      };
    } else if (name.length > 20) {
      return {
        isError: true,
        errorMsg: "Maximum 20 charterers",
      };
    } else if (!regName.test(name)) {
      return {
        isError: true,
        errorMsg: `Invalid ${fieldName}`,
      };
    } else {
      return {
        isError: false,
        errorMsg: "",
      };
    }
  };

  const validateEmail = (email) => {
    if (email === "") {
      return {
        isError: true,
        errorMsg: `Email address cannot be empty`,
      };
    } else if (!regEmail.test(email)) {
      return {
        isError: true,
        errorMsg: `Please enter a valid email`,
      };
    } else {
      return {
        isError: false,
        errorMsg: "",
      };
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const savePersonalInfo = () => {
    const validatedFName = validateName(values.fname, "First Name");
    const validatedLName = validateName(values.lname, "Last Name");

    setErrorMsg({
      ...errorMsg,
      fname: validatedFName.errorMsg,
      lname: validatedLName.errorMsg,
    });

    setErrors({
      ...errors,
      fname: validatedFName.isError,
      lname: validatedLName.isError,
    });
    setSaveCountPInfo((cnt) => cnt + 1);
  };

  const saveEmail = () => {
    const validatedEmail = validateEmail(values.email);

    setErrorMsg({
      ...errorMsg,
      email: validatedEmail.errorMsg,
    });

    setErrors({
      ...errors,
      email: validatedEmail.isError,
    });
    setSaveCountEmail((cnt) => cnt + 1);
  };

  return (
    <>
      <Box className={classes.component}>
        <Typography className={classes.title}>Personal Information</Typography>
        <span
          className={classes.editLink}
          onClick={() => setIsEditPInfo(!isEditPInfo)}
        >
          {isEditPInfo ? "Cancel" : "Edit"}
        </span>
        <Box className={classes.form}>
          <TextField
            label={isEditPInfo ? "First Name" : ""}
            placeholder="First Name"
            variant="outlined"
            className={classes.input}
            value={values.fname}
            name="fname"
            disabled={!isEditPInfo}
            onChange={handleChange}
            error={errors.fname}
            helperText={errors.fname && isEditPInfo && `${errorMsg.fname}`}
          />
          <TextField
            label={isEditPInfo ? "Last Name" : ""}
            placeholder="Last Name"
            variant="outlined"
            className={classes.input}
            value={values.lname}
            name="lname"
            disabled={!isEditPInfo}
            onChange={handleChange}
            error={errors.lname}
            helperText={errors.lname && isEditPInfo && `${errorMsg.lname}`}
          />
          {isEditPInfo && (
            <Button
              variant="contained"
              className={classes.saveBtn}
              style={{ background: "#222" }}
              onClick={savePersonalInfo}
            >
              SAVE
            </Button>
          )}
        </Box>
        <br />
        <Typography className={classes.title}>
          Email Address
        </Typography>
        <span
          className={classes.editLink}
          onClick={() => setIsEditEmail(!isEditEmail)}
        >
          {isEditEmail ? "Cancel" : "Edit"}
        </span>

        <Box className={classes.form}>
          <TextField
            label={isEditEmail ? "Email Address" : ""}
            variant="outlined"
            className={classes.input}
            value={values.email}
            name="email"
            placeholder="Email Address"
            disabled={!isEditEmail}
            onChange={handleChange}
            error={errors.email}
            helperText={errors.email && isEditEmail && `${errorMsg.email}`}
          />
          {isEditEmail && (
            <Button
              variant="contained"
              className={classes.saveBtn}
              style={{ background: "#222" }}
              onClick={saveEmail}
            >
              SAVE
            </Button>
          )}
        </Box>
        <br />
        <Typography className={classes.title} style={{ marginTop: 10 }}>
          Mobile Number
        </Typography>

        <Box className={classes.form}>
          <TextField
            variant="outlined"
            disabled
            className={classes.input}
            name="phone"
            value={values.phone}
          />
        </Box>
      </Box>
    </>
  );
}

export default PersonalInfo;
