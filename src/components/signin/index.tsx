import { useEffect, useRef, useState } from "react";
import { Input } from "..";

import styles from "./style.module.css";
import { IDataSignIn, IDataSignUp, TSigninErrors, TSignupErrors } from "../../models/interface";
import { handleSubmit } from "../../hooks/formValid";

interface ISigninProps {
  onSubmit: (data: IDataSignIn) => void;
}

const initialErrors: TSigninErrors = {
  emailError: "",
  passError: ""
}

export const Signin = ({ onSubmit }: ISigninProps) => {
  const passRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<TSigninErrors>(initialErrors);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleSingInSubmit = (event: React.FormEvent) => {
    const email = (emailRef.current?.value || "").trim();
    const pass = (passRef.current?.value || "").trim();

    handleSubmit<"singin", TSignupErrors, IDataSignUp>(
      event,
      "singin",
      { email, pass },
      (errors: TSigninErrors) => setErrors(errors),
      (formData: IDataSignIn) => {
        onSubmit({
          email: formData.email,
          pass: formData.pass,
        });
      }
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSingInSubmit}>
      <Input
        label="Почта"
        inputPlaceholder="Введите почту"
        type="email"
        ref={emailRef}
        isError={errors.emailError !== ""}
        hint={errors.emailError || " "}
      />
      <Input
        label="Пароль"
        inputPlaceholder="Введите пароль"
        type="password"
        ref={passRef}
        isError={errors.passError !== ""}
        hint={errors.passError || " "}
      />
      <button type="submit">submit</button>
    </form>
  );
};
