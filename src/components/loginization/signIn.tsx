import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import { useFormik } from "formik";
import { urlUsers } from "@/api/api";
import * as yup from "yup";
import { Routes } from "@/constants/Routes";
import { InputText } from "@/components/loginization/inputText";
import Warnings from "@/components/loginization/warnings";
import "../modal/modal.css";

export interface PersonInterface {
  id: number;
  email: string;
  password: string;
}

type SignInPropsType = {
  checkAuthorization: Function;
  setUserName: Function;
};

type FormikErrorType = {
  email?: string;
  password?: string;
};

function SignIn({ checkAuthorization, setUserName }: SignInPropsType) {
  const [warning, setWarning] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      password: yup
        .string()
        .min(6, "Password has to be longer than 6 characters!")
        .required("Password is required!")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
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
      const checkUser = async () => {
        try {
          const data = await fetch(urlUsers);
          const response = await data.json();

          const user = response.find((person: PersonInterface) => person.email === values.email);

          if (!user) {
            throw new Error("Such user is not registraited");
          }

          if (user.password !== values.password) {
            throw new Error("Wrong password");
          }

          checkAuthorization(true);
          setUserName(values.email);
        } catch (error) {
          setWarning(error.message);
        }
      };

      checkUser();
    },
  });

  return (
    <div>
      <div className="modal-container">
        <Link to={Routes.HOME} className="modal-close">
          <IoMdCloseCircle />
        </Link>
        <h3 className="modal-title">Authorization</h3>
        {warning && <Warnings warning={warning} setWarning={setWarning} />}
        <div className="modal-form">
          <form onSubmit={formik.handleSubmit}>
            <InputText
              label="email"
              type="text"
              touched={formik.touched.email}
              error={formik.errors.email}
              {...formik.getFieldProps("email")}
            />
            <InputText
              label="password"
              type="password"
              touched={formik.touched.password}
              error={formik.errors.password}
              {...formik.getFieldProps("password")}
            />
            <div className="modal-btn-container">
              <button type="submit" className="modal-btn">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;


