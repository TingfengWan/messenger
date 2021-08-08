import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import { AuthLayout, rightStyles as useStyles } from "./components/AuthLayout";

const SignUp = (props) => {
  const history = useHistory();
  const { user, register } = props;

  const classes = useStyles(props);

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <AuthLayout>
      <Box component="div" className={classes.header}>
        <Typography>Already have an account?</Typography>
        <Button color="inherit" className={classes.loginButtonRoute} onClick={() => history.push("/login")}>Login</Button>
      </Box>
      <Box component="form" className={classes.form} onSubmit={handleRegister}>
        <Box component="div" className={classes.titleFormContainer}>
          <Typography className={classes.titleForm}>Create an account.</Typography>
        </Box>
        <Box component="div" className={classes.inputContainer}>
          <FormControl margin="normal" required>
            <TextField
              className={classes.input}
              aria-label="username"
              label="Username"
              name="username"
              type="text"
              InputLabelProps={{style: {fontSize: "1.25rem"}}}
            />
          </FormControl>
          <FormControl margin="normal" required>
            <TextField
              className={classes.input}
              aria-label="email"
              label="E-mail address"
              name="email"
              type="text"
              InputLabelProps={{style: {fontSize: "1.25rem"}}}
            />
          </FormControl>
          <FormControl margin="normal" required>
            <TextField
              className={classes.input}
              label="Password"
              aria-label="password"
              fullWidth
              type="password"
              name="password"
              InputLabelProps={{style: {fontSize: "1.25rem"}}}
            />
          </FormControl>
        </Box>
        <Box component="div" className={classes.buttonContainer}>
          <Button color="primary" className={classes.buttonSubmit} type="submit" variant="contained" size="large">
                Create
          </Button>
        </Box>
      </Box>
  </AuthLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);