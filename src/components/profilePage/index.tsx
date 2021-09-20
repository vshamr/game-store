import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import "./styles.css";
import { userPageShema } from "@/constants/schemaValidation";
import { usersAPI } from "@/api";
import { logIn, setUserProfile } from "@/redux/user-reducer";
import Warnings from "@/components/loginization/warnings";
import Modal from "@/components/modal";
import ChangePassword from "@/components/profilePage/changePassword";
import { ReducersType } from "@/redux/redux-store";
import InputText from "@/components/loginization/inputText";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state: ReducersType) => state.userPage.userName);
  const [userImage, setUserImage] = useState(null);
  const [newUserName, setNewUserName] = useState(userName);
  const [warning, setWarning] = useState("");

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const openPasswordModal = () => setShowPasswordModal(true);

  const formik = useFormik({
    initialValues: {
      login: "",
      phone: "",
      address: "",
    },
    validationSchema: userPageShema,
    onSubmit: async (values) => {
      try {
        const updatedUser = await usersAPI.getProfile({ ...values });
        const saveUserProfile = await usersAPI.saveProfile({ ...values });
        dispatch(logIn(updatedUser.data.login));
        dispatch(setUserProfile(saveUserProfile.data.values));
      } catch (error) {
        setWarning(error.message);
      }
    },
  });

  const displayImage = (): JSX.Element => {
    if (userImage === null) {
      return <div className="user-page__no-avatar" />;
    }
    return <img className="user-page__avatar" src={userImage} alt="User image" />;
  };

  return (
    <section className="user-page">
      <div className="container">
        <div className="user-page__inner">
          <div className="user-page__img">
            {displayImage()}
            <label htmlFor="file-upload" className="user-page__btn">
              Change profile image
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={(e): void => setUserImage(URL.createObjectURL(e.target.files[0]))}
            />
          </div>
          <form className="user-page__form" onSubmit={formik.handleSubmit}>
            <div className="user-page__form-box">
              <InputText
                label="login"
                type="login"
                value={newUserName}
                name="Name"
                onChange={(e): void => setNewUserName(e.target.value)}
                error={formik.errors.login}
                touched={formik.touched.login}
              />
              <InputText
                label="phone"
                type="number"
                name="Phone number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                touched={formik.touched.phone}
                error={formik.errors.phone}
              />
              <InputText
                label="address"
                type="text"
                name="Address delivery"
                value={formik.values.address}
                onChange={formik.handleChange}
                touched={formik.touched.address}
                error={formik.errors.address}
              />
            </div>
            <Warnings warning={warning} setWarning={setWarning} />
            <div className="user-page__form-btn">
              <button className="user-page__btn" type="button">
                Save profile
              </button>
              <button className="user-page__btn" type="button" onClick={openPasswordModal}>
                Change password
              </button>
              {showPasswordModal && (
                <Modal>
                  <ChangePassword setShowPasswordModal={setShowPasswordModal} />
                </Modal>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
