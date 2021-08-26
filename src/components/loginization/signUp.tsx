import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useFormik } from "formik";
import { CgCloseR } from "react-icons/all";

import { urlUsers } from "@/api";
import { Routes, serverError } from "@/constants/Routes";
import { InputText } from "@/components/loginization/inputText";
import Warnings from "@/components/loginization/warnings";
import { signUpShema } from "@/constants/schemaValidation";
import { logInAC, setUserNameAC } from "@/redux/user-reducer";

function SignUp() {
  const dispatch = useDispatch();
  const [warning, setWarning] = useState("");

  const formik = useFormik({
    initialValues: { login: "", password: "", repeatedPassword: "" },
    validationSchema: signUpShema,
    onSubmit: async (values) => {
      const { login, password } = values;
      try {
        const newUser = await axios.post(urlUsers, { login, password });
        dispatch(logInAC());
        dispatch(setUserNameAC(newUser.data.login));
      } catch (error) {
        if (error.response.status === serverError) {
          setWarning(error.response.data);
        }
      }
    }
  });

  return (
    <div className="modal-container">
      <Link to={Routes.HOME} className="modal-close"><CgCloseR /></Link>
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
  );
}

export default SignUp;
