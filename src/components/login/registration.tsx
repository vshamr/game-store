import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import * as yup from "yup";
import { useFormik } from "formik";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type FormikErrorType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

function Registration() {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: yup.object().shape({
      password: yup
        .string()
        .min(6, "Password has to be longer than 6 characters!")
        .required("Password is required!")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      firstName: yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
      lastName: yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    }),
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }
      return errors;
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...formik.getFieldProps("firstName")}
                />
                {formik.errors.firstName ? <div style={{ color: "red" }}>{formik.errors.firstName}</div> : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoComplete="lname"
                  {...formik.getFieldProps("lastName")}
                />
                {formik.errors.lastName ? <div style={{ color: "red" }}>{formik.errors.lastName}</div> : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  {...formik.getFieldProps("email")}
                />
                {formik.errors.email ? <div style={{ color: "red" }}>{formik.errors.email}</div> : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...formik.getFieldProps("password")}
                />
                {formik.errors.password ? <div style={{ color: "red" }}>{formik.errors.password}</div> : null}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </form>
    </Container>
  );
}

export default Registration;
