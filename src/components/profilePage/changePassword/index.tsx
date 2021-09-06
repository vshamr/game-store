import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CgCloseR } from "react-icons/all";
import { useFormik } from "formik";

import Warnings from "@/components/loginization/warnings";
import { InputText } from "@/components/loginization/inputText";
import { setUserPasswordAC } from "@/redux/user-reducer";
import { changePasswordShema } from "@/constants/schemaValidation";
import { usersAPI } from "@/api";

type ChangePasswordPropsType = {
  setShowPasswordModal: Function;
};

const ChangePassword = ({ setShowPasswordModal }: ChangePasswordPropsType) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userPage.userId);
  const [warning, setWarning] = useState("");

  const closePasswordModal = () => setShowPasswordModal(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
    },
    validationSchema: changePasswordShema,
    onSubmit: async (values) => {
      const { password } = values;

      try {
        const updatedPassword = await usersAPI.changePassword(userId, { password });
        dispatch(setUserPasswordAC(updatedPassword.data.password));
      } catch (error) {
        setWarning(error.message);
      }
    },
  });

  return (
    <div className="modal-container">
      <button onClick={closePasswordModal} type="button" className="modal-close">
        <CgCloseR />
      </button>
      <h3 className="modal-title">Change password</h3>
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
          <div className="modal-btn-container">
            <button type="submit" className="modal-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
