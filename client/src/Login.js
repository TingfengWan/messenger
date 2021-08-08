import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  Link,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { AuthLayout, rightStyles as useStyles } from "./components/AuthLayout";

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;
  const classes = useStyles(props);

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    await login({ email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <AuthLayout>
        <Box component="div" className={classes.header}>
          <Typography>Don't have an account?</Typography>
          <Button color="inherit" className={classes.registerButtonRoute} onClick={() => history.push("/register")}>Create account</Button>
        </Box>
        <Box component="form" className={classes.form} onSubmit={handleLogin}>
          <Box component="div" className={classes.titleFormContainer}>
            <Typography className={classes.titleForm}>Welcome back!</Typography>
          </Box>
          <Box component="div" className={classes.inputContainer}>
            <FormControl margin="normal" required>
              <TextField
                className={classes.input}
                color="primary"
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
                color="primary"
                label="Password"
                aria-label="password"
                fullWidth
                type="password"
                name="password"
                InputLabelProps={{style: {fontSize: "1.25rem"}}}
                InputProps={{
                  endAdornment: <Link>Forgot?</Link>,
                }}
              />
            </FormControl>
          </Box>
          <Box component="div" className={classes.buttonContainer}>
            <Button color="primary" className={classes.buttonSubmit} type="submit" variant="contained" size="large">
                  Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);