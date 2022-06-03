import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Route, Switch, useHistory } from "react-router";
import { useSelector } from "react-redux";

import Favorites from "../components/favorites/favorites";
import Sidebar from "../components/account/sidebar";
import PersonalInfo from "../components/account/profile-info";
import ManageAddresses from "../components/address/manage-address";
import LoaderSpinner from "../components/load-spinner";
import ToastMessageContainer from "../components/toast";

const useStyles = makeStyles((theme) => ({
  component: {
    marginTop: 55,
    padding: "30px 6%",
    display: "flex",
  },
  leftComponent: {
    paddingRight: 15,
    [theme.breakpoints.between(0, 960)]: {
      paddingRight: 0,
      marginBottom: 20,
    },
  },
}));

function MyAccountsPage() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticate } = useSelector((state) => state.userReducer);
  const history = useHistory();
  useEffect(() => {
    if (!isAuthenticate) {
      history.replace("/login?ref=account");
    }
    setIsLoading(false);
  }, [isAuthenticate]);
  return isLoading ? (
    <LoaderSpinner />
  ) : (
    <div>
      <Grid container className={classes.component}>
        <Grid
          item
          lg={3}
          md={3}
          sm={12}
          xs={12}
          className={classes.leftComponent}
        >
          <Sidebar />
        </Grid>
        <Grid style={{ background: "#fff" }} item lg={9} md={9} sm={12} xs={12}>
          <Switch>
            <Route exact path="/account">
              <PersonalInfo />
            </Route>
            <Route exact path="/favorites">
              <Favorites />
            </Route>
            <Route exact path="/account/addresses">
              <ManageAddresses />
            </Route>
            <Route>
              <PersonalInfo />
            </Route>
          </Switch>
        </Grid>
      </Grid>
      <ToastMessageContainer />
    </div>
  );
}

export default MyAccountsPage;
