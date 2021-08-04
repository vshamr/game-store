import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import "./styles.css";
import { userPageShema } from "@/constants/schemaValidation";
import { usersAPI } from "@/api/api";
import { setUserNameAC } from "@/redux/reducer";
import Warnings from "@/components/loginization/warnings";
import { InputText } from "@/components/loginization/inputText";
import Modal from "@/components/modal";
import ChangePassword from "@/components/profilePage/changePassword";
import { RootStateType } from "@/components/header";


const ProfilePage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootStateType) => state.userId);
  const [warning, setWarning] = useState("");

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const openPasswordModal = () => setShowPasswordModal(true);

  const formik = useFormik({
    initialValues: {
      login: "",
      phone: "",
      address: ""
    },
    validationSchema: userPageShema,
    onSubmit: async (values) => {
      try {
        const updatedUser = await usersAPI.getProfile({ ...values });
        dispatch(setUserNameAC(updatedUser.data.login));
      } catch (error) {
        setWarning(error.message);
      }
    }
  });

  return (
    <section className="user-page">
      <div className="container">
        <div className="user-page_inner">
          <div className="user-page_img">
            <div className="user-page_avatar"></div>
            <button className="user-page-btn">Change profile image</button>
          </div>
          <form className="user-page_form" onSubmit={formik.handleSubmit}>
            <Warnings warning={warning} setWarning={setWarning} />
            <div className="user-page_form-box">
              <InputText label="login" type="login" value={formik.values.login} name="Name"
                         onChange={formik.handleChange} error={formik.errors.login} touched={formik.touched.login} />
              <InputText label="phone" type="tel" name="Phone number" value={formik.values.phone}
                         onChange={formik.handleChange} touched={formik.touched.phone} error={formik.errors.phone} />
              <InputText label="address" type="text" name="Address delivery" value={formik.values.address}
                         onChange={formik.handleChange} touched={formik.touched.address}
                         error={formik.errors.address} />
            </div>
            <div className="user-page_form-btn">
              <button className="user-page-btn">Save profile</button>
              <button className="user-page-btn" onClick={openPasswordModal}>Change password</button>
              {showPasswordModal && <Modal> <ChangePassword setShowPasswordModal={setShowPasswordModal}/> </Modal>}
            </div>

          </form>
        </div>
      </div>
    </section>
  );

};

export default ProfilePage;
