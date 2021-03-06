import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CgCloseR } from "react-icons/all";
import { useFormik } from "formik";

import Warnings from "@/components/loginization/warnings";
import { logIn } from "@/redux/user-reducer";
import { changePasswordShema } from "@/constants/schemaValidation";
import { usersAPI } from "@/api";
import { ReducersType } from "@/redux/redux-store";
import InputText from "@/components/loginization/inputText";

type ChangePasswordPropsType = {
  setShowPasswordModal: Function;
};

const ChangePassword = ({ setShowPasswordModal }: ChangePasswordPropsType) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: ReducersType) => state.userPage.userId);
  const [warning, setWarning] = useState("");

  const closePasswordModal = () => setShowPasswordModal(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      repeatPassword: ""
    },
    validationSchema: changePasswordShema,
    onSubmit: async (values) => {
      const { password } = values;
      try {
        const updatedPassword = await usersAPI.changePassword(userId, { password });
        dispatch(logIn(updatedPassword.data.password));
        alert("Password has been changed");
      } catch (error) {
        setWarning(error.message);
      }
    }
  });

  return (
    <div className="modal">
      <div className="modal__container">
        <button onClick={closePasswordModal} type="button" className="modal__close-btn">
          <CgCloseR />
        </button>
        <h3 className="modal__title">Change password</h3>
        <Warnings warning={warning} setWarning={setWarning} />
        <div className="modal-form">
          <form onSubmit={formik.handleSubmit}>
            <InputText
              label="password"
              type="password"
              name="new password"
              value={formik.values.password}
              onChange={formik.handleChange}
              touched={formik.touched.password}
              error={formik.errors.password}
            />
            <InputText
              label="repeatPassword"
              type="password"
              name="repeat password"
              value={formik.values.repeatPassword}
              onChange={formik.handleChange}
              touched={formik.touched.repeatPassword}
              error={formik.errors.repeatPassword}
            />
            <div className="modal__btn-container">
              <button type="submit" className="modal__btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
