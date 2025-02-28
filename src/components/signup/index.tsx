import { useEffect, useRef, useState } from "react";
import { Input } from "../input";

import styles from './style.module.css'
import { IDataSignUp, TSignupErrors } from "../../models/interface";
import { handleSubmit } from "../../hooks/formValid";

interface ISignipProps {
  onSubmit: (data: IDataSignUp) => void;
}

const initialErrors: TSignupErrors = {
  nameError: "",
  nickNameError: "",
  emailError: "",
  genderError: "",
  passError: "",
  repeatPassError: ""
}

export const Signup = ({ onSubmit }: ISignipProps) => {
  const manRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const womanRef = useRef<HTMLInputElement>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);
  const repeatPassRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<TSignupErrors>(initialErrors);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  const handleSingUpSubmit = (event: React.FormEvent) => {
    const name = (nameRef.current?.value || "").trim();
    const nickName = (nickNameRef.current?.value || "").trim();
    const email = (emailRef.current?.value || "").trim();
    const pass = (passRef.current?.value || "").trim();
    const repeatPass = (repeatPassRef.current?.value || "").trim();
    const isMaleSelected = manRef.current?.checked || false;
    const isFemaleSelected = womanRef.current?.checked || false;
  
    handleSubmit<"singup", TSignupErrors, IDataSignUp >(
      event,
      "singup",
      { name, nickName, email, pass, repeatPass, isMaleSelected, isFemaleSelected },
      (errors: TSignupErrors) => setErrors(errors),
      (formData: IDataSignUp) => {
        onSubmit({
          name: formData.name || "",
          nickName: formData.nickName || "",
          email: formData.email,
          gender: formData.gender,
          pass: formData.pass,
        });
      }
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSingUpSubmit}>
      <Input
        label="Имя"
        inputPlaceholder="Ваше имя"
        type="text"
        ref={nameRef}
        isError={errors.nameError !== ""}
        hint={errors.nameError || " "}
      />
      <Input
        label="Ник"
        inputPlaceholder="Ваш ник"
        type="text"
        ref={nickNameRef}
        isError={errors.nickNameError !== ""}
        hint={errors.nickNameError || " "}
      />
      <Input
        label="Почта"
        inputPlaceholder="Введите почту"
        type="email"
        ref={emailRef}
        isError={errors.emailError !== ""}
        hint={errors.emailError || " "}
      />
      <div className={styles.form__gender}>
        <p>Пол</p>
        <Input
          label="Мужской"
          type="radio"
          labelPosition="left"
          name="gender"
          id="man"
          ref={manRef}
        />
        <Input
          label="Женский"
          type="radio"
          labelPosition="left"
          name="gender"
          id="woman"
          ref={womanRef}
        />
        <p style={{color: "#ff4550"}}>{errors.genderError && errors.genderError}</p>
      </div>
      <Input
        label="Пароль"
        inputPlaceholder="Придумайте пароль"
        type="password"
        ref={passRef}
        isError={errors.passError !== ""}
        hint={errors.passError || " "}
      />
      <Input
        label="Повторить пароль"
        inputPlaceholder="Повторите пароль"
        type="password"
        ref={repeatPassRef}
        isError={errors.repeatPassError !== ""}
        hint={errors.repeatPassError || " "}
      />
      <button type="submit">submit</button>
    </form>
  );
};
