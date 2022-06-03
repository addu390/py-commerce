import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    marginTop: 10,
    padding: 20,
    backgroundColor: "#222",
    textAlign: "center",
    color: "#fff",
  },
  text: {
    fontSize: 16,
  },
  link:{ 
    color: "#222", 
    padding: 3, 
    marginRight: 3,
  },
});

function Footer() {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Typography className={classes.text}>
        Created by <a href="https://pyblog.xyz/about">Adesh Nalpet Adimurthy</a>
      </Typography>
    </Box>
  );
}

export default Footer;
