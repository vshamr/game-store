import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import * as yup from "yup";
import { urlUsers } from "@/api/api";
import { Routes, serverError } from "@/constants/Routes";
import { InputText } from "@/components/loginization/inputText";
import Warnings from "@/components/loginization/warnings";

type SignUpPropsType = {
  checkAuthorization: Function;
  setUserName: Function;
}

function SignUp({ checkAuthorization, setUserName }: SignUpPropsType) {
  const [warning, setWarning] = useState("");

  const formik = useFormik({
    initialValues: { login: "", password: "", repeatedPassword: "" },
    validationSchema: yup.object({
      login: yup.string()
        .max(15, "Login must have less than 15 characters")
        .min(4, "Login must have more than 4 characters")
        .required("Login is required!"),
      password: yup.string()
        .min(6, "Password has to be longer than 6 characters!")
        .required("Password is required!")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      repeatedPassword: yup.string()
        .required("Please, repeat your password")
        .oneOf([yup.ref("password"), null], "Passwords must match")
    }),
    onSubmit: values => {
      const { login, password } = values;

      const signUpUser = async () => {
        try {
          const newUser = await axios.post(urlUsers, { login, password });
          checkAuthorization(true);
          setUserName(newUser.data.login);
        } catch (error) {
          if (error.response.status === serverError) {
            setWarning(error.response.data);
          }
        }
      };

      signUpUser();
    }
  });

  return (
    <>
      <div className="modal-container">
        <Link to={Routes.HOME} className="modal-close"><IoMdCloseCircle /></Link>
        <h3 className="modal-title">Registration</h3>
        {warning && <Warnings warning={warning} setWarning={setWarning} />}
        <div className="modal-form">
          <form onSubmit={formik.handleSubmit}>
            <InputText label="login" type="text" name="login" value={formik.values.login} onChange={formik.handleChange}
                       touched={formik.touched.login} error={formik.errors.login} />
            <InputText label="password" type="password" name="password" value={formik.values.password}
                       onChange={formik.handleChange} touched={formik.touched.password}
                       error={formik.errors.password} />
            <InputText label="repeatedPassword" type="password" name="repeat password"
                       value={formik.values.repeatedPassword} onChange={formik.handleChange}
                       touched={formik.touched.repeatedPassword} error={formik.errors.repeatedPassword} />
            <div className="modal-btn-container">
              <button type="submit" className="modal-btn">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
