import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { CgCloseR } from "react-icons/all";

import "../modal/styles.css";
import { urlUsers } from "@/api";
import { Routes } from "@/constants/Routes";
import { InputText } from "@/components/loginization/inputText";
import Warnings from "@/components/loginization/warnings";
import { signInShema } from "@/constants/schemaValidation";
import { logIn } from "@/redux/user-reducer";

export interface PersonInterface {
  id: number;
  login: string;
  password: string;
  isAdmin: false;
}

function SignIn(): JSX.Element {
  const dispatch = useDispatch();
  const [warning, setWarning] = useState("");

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: signInShema,
    onSubmit: async (values) => {
      try {
        const data = await fetch(urlUsers);
        const response = await data.json();

        const user = response.find((person: PersonInterface) => person.login === values.login);
        if (!user) {
          throw new Error("You need to create an account");
        }
        if (user.password !== values.password) {
          throw new Error("Wrong password");
        }
        dispatch(logIn(values.login, values.password));
      } catch (error) {
        setWarning(error.message);
      }
    },
  });

  return (
    <div className="modal-container">
      <Link to={Routes.HOME} className="modal-close">
        <CgCloseR />
      </Link>
      <h3 className="modal-title">Authorization</h3>
      {warning && <Warnings warning={warning} setWarning={setWarning} />}
      <form onSubmit={formik.handleSubmit}>
        <InputText
          label="login"
          type="text"
          name="login"
          value={formik.values.login}
          onChange={formik.handleChange}
          touched={formik.touched.login}
          error={formik.errors.login}
        />
        <InputText
          label="password"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          touched={formik.touched.password}
          error={formik.errors.password}
        />
        <div className="modal-btn-container">
          <button type="submit" className="modal-btn">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
