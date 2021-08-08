import React from "react";
import {
  Box,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BgImage from "../assets/images/bg-img.png";
import BubbleSvg from "../assets/bubble.svg";

const leftStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh"
  },
  leftSide: {
    backgroundImage: `url(${BgImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: "cover",
    width: "40%",
    [theme.breakpoints.down("md")]: {
      display: "none",
    }
  },
  cover: {
    background: "linear-gradient(0deg, rgba(134,185,255,1) 0%, rgba(58,141,255,1) 100%)",
    height: "100%",
    opacity: 0.85,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  contextContainer: {
    width: "80%",
    marginBottom: "140px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  chatBubbleImg: {
    height: "90px",
    marginBottom: "3rem",
  },

  title: {
    fontSize: 36,
    color: theme.palette.primary.contrastText
  },

  rightSide: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
}));

export const rightStyles = makeStyles((theme) => ({
  header: {
    width: "100%",
    display: "flex",
    margin: "4rem",
    marginRight: "12rem",
    alignItems: "center",
    justifyContent: "flex-end",
    color: theme.palette.grey[400]
  },
  registerButtonRoute: {
    marginLeft: "4rem",
    width: "12rem",
    height: "4rem",
    boxShadow: "0 2px 5px rgba(80,80,80,0.1)",
    color: theme.palette.primary.main,
  },
  loginButtonRoute: {
    marginLeft: "4rem",
    width: "10rem",
    height: "4rem",
    boxShadow: "0 2px 5px rgba(80,80,80,0.1)",
    color: theme.palette.primary.main,
  },
  titleFormContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  titleForm: {
    fontWeight: "bold",
    fontSize: "2rem",
  },
  form: {
    width: "65%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  inputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginBottom: "4rem"
  },
  input: {
    paddingTop: "1rem",
  },
  buttonContainer:{
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  buttonSubmit: {
    width: "13rem",
    height: "4rem",
  }
}));

export const AuthLayout = ({children}) => {
  const classes = leftStyles();
  return (
  <Box container justify="center" className={classes.root}>
  <Box component="div" className={classes.leftSide}>
    <Box component="div" className={classes.cover}>
      <Box component="div" className={classes.contextContainer}>
        <Box component="img" className={classes.chatBubbleImg} src={BubbleSvg} alt="bubble chat" />
        <Typography color="text.primary" className={classes.title}>Converse with anyone</Typography>
        <Typography className={classes.title}>with any language</Typography> 
      </Box>
    </Box>   
  </Box>
  <Box component="div" className={classes.rightSide}>
    {children}
  </Box>
</Box>
);
} 