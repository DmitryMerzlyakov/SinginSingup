import { IDataSignIn, IDataSignUp, TFormValues, TSignupErrors, TSigninErrors } from "../models/interface";

const validateEmail = (email: string): string => {
  if (!email) {
    return "Пожалуйста, введите email.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Адрес электронной почты некорректен.";
  }
  return "";
};

const validatePass = (
  pass: string,
  repeatPass?: string
): string => {
  if (!pass) {
    return "Пожалуйста, введите пароль.";
  }
  if (pass.length < 6) {
    return "Пароль должен содержать минимум 6 символов.";
  }
  if (repeatPass && pass !== repeatPass) {
    return "Пароли не совпадают.";
  }
  return "";
};

const validateName = (name: string): string => {
  if (!name) {
    return "Пожалуйста, введите ваше имя.";
  }
  return "";
};

const validateNickName = (nickName: string): string => {
  if (!nickName) {
    return "Пожалуйста, введите ваш ник.";
  }
  return "";
};

const validateGender = (
  isMaleSelected: boolean,
  isFemaleSelected: boolean
): string => {
  if (!isMaleSelected && !isFemaleSelected) {
    return "Пожалуйста, укажите ваш пол.";
  }
  return "";
};

export const handleSubmit = <
    T extends "singin" | "singup",
    TErrors extends T extends "singin" ? TSigninErrors : TSignupErrors,
    TData extends T extends "singin" ? IDataSignIn : IDataSignUp
>(
    event: React.FormEvent,
    type: T,
    values: TFormValues,
    setErrors: (errors: TErrors) => void,
    onSubmit: (data: TData) => void
) => {
  event.preventDefault();

  const initialErrors: TErrors = type === "singin" ?
    ({ emailError: "", passError: "" } as TErrors)
      :
    ({
      nameError: "",
      nickNameError: "",
      emailError: "",
      passError: "",
      repeatPassError: "",
      genderError: ""
    } as TErrors);

  setErrors(initialErrors);

  const { name, nickName, email, pass, repeatPass, isMaleSelected, isFemaleSelected } = values;

  const errors: TSignupErrors = {
    nameError: type === "singup" ? validateName(name || "") : "",
    nickNameError: type === "singup" ? validateNickName(nickName || "") : "",
    emailError: validateEmail(email),
    passError: validatePass(pass, type === "singup" ? repeatPass : undefined),
    repeatPassError:
      type === "singup" && repeatPass && pass !== repeatPass
        ? "Пароли не совпадают."
        : "",
    genderError: type === "singup" ? validateGender(isMaleSelected || false, isFemaleSelected || false) : "",
  };

  const typedErrors: TErrors = type === "singin" ?
    ({emailError: errors.emailError, passError: errors.passError} as TErrors)
      :
    (errors as TErrors);

  if (Object.values(typedErrors).some((error) => error !== "")) {
    setErrors(typedErrors);
    return;
  }

  const formData = type === "singup"
    ? { name, nickName, email, gender: isMaleSelected ? "man" : "woman", pass }
    : { email, pass };

  onSubmit(formData as TData);
};
