import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import { useFormik } from "formik";
import { urlUsers } from "@/api/api";
import { Routes } from "@/constants/Routes";
import { InputText } from "@/components/loginization/inputText";
import Warnings from "@/components/loginization/warnings";
import "../modal/modal.css";
import { signInShema } from "@/constants/schemaValidation";

export interface PersonInterface {
  id: number;
  login: string;
  password: string;
}

type SignInPropsType = {
  updateIsAuthorized: Function;
  setUserName: Function;
};

function SignIn({ updateIsAuthorized, setUserName }: SignInPropsType) {
  const [warning, setWarning] = useState("");

  const formik = useFormik({
    initialValues: {
      login: "",
      password: ""
    },
    validationSchema: signInShema,
    onSubmit:async (values) => {
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
        updateIsAuthorized(true);
        setUserName(values.login);
      } catch (error) {
        setWarning(error.message);
      }
    }
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
            <InputText label="login" type="text" name="login" value={formik.values.login} onChange={formik.handleChange}
                       touched={formik.touched.login} error={formik.errors.login} />
            <InputText label="password" type="password" name="password" value={formik.values.password}
                       onChange={formik.handleChange} touched={formik.touched.password}
                       error={formik.errors.password} />
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


