import * as yup from "yup";


export const signInShema = yup.object({
  login: yup.string()
    .max(15, "Login must have less than 15 characters")
    .min(4, "Login must have more than 4 characters")
    .required("Required!"),
  password: yup.string()
    .min(6, "Password has to be longer than 6 characters!")
    .required("Password is required!")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
});

export const signUpShema = yup.object({
  login: yup.string()
    .max(15, "Login must have less than 15 characters")
    .min(4, "Login must have more than 4 characters")
    .required("Required!"),
  password: yup.string()
    .min(6, "Password has to be longer than 6 characters!")
    .required("Password is required!")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  repeatedPassword: yup.string()
    .required("Please, repeat your password")
    .oneOf([yup.ref("password"), null], "Passwords must match")
});

export const userPageShema = yup.object({
  login: yup.string()
    .max(15, "Login must have less than 15 characters")
    .min(4, "Login must have more than 4 characters")
    .required("Required!"),
  address: yup.string()
    .max(20, "Address must be less than 20")
    .required("Required!"),
  phone: yup.number()
    .typeError("You must specify a number")
    .test(
      "maxDigits",
      "Phone number must have exactly 12 digits",
      (number) => String(number).length === 12
    )
    .required("Required!")
});

export const changePasswordShema = yup.object({
  password: yup.string()
    .min(6, "Password has to be longer than 6 characters!")
    .required("Password is required!")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  repeatedPassword: yup.string()
    .required('Please, repeat your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})
