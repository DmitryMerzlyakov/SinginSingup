import { useEffect, useRef, useState } from "react";
import { Input } from "..";

import styles from "./style.module.css";

interface IErrors {
  emailError: string;
  passError: string;
}

interface ISigninProps {
  onSubmit: (formData: { email: string; pass: string }) => void;
}

export const Signin = ({ onSubmit }: ISigninProps) => {
  const passRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<IErrors>({
    emailError: "",
    passError: ""
  });

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!emailRef.current || !passRef.current) return;

    const email = emailRef.current.value.trim();
    const pass = passRef.current.value.trim();

    setErrors({
      emailError: "",
      passError: ""
    });

    if (!email) {
      setErrors((prev) => ({
        ...prev,
        emailError: "Пожалуйста, введите email.",
      }));
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors((prev) => ({
        ...prev,
        emailError: `Адреc ${email} некорректен`,
      }));
    }
   
    if (!pass) {
      setErrors((prev) => ({
        ...prev,
        passError: "Пожалуйста, введите пароль.",
      }));
    }
    if (pass.length < 6) {
      setErrors((prev) => ({
        ...prev,
        passError: "Пароль должен содержать минимум 6 символов.",
      }));
    }

    if (errors.emailError !== "" && errors.passError !== "") return;

    onSubmit({ email, pass });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
