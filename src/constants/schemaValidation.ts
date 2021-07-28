import * as yup from "yup";


export const signInShema = yup.object({
  login: yup.string()
    .max(15, 'Login must have less than 15 characters')
    .min(4, 'Login must have more than 4 characters')
    .required('Required!'),
  password: yup.string()
    .min(6, "Password has to be longer than 6 characters!")
    .required("Password is required!")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
})

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
})
