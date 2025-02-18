import { useEffect, useRef } from "react";
import { Input } from "../input";

import styles from './style.module.css'


export const Signup = () => {
  const passRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);
  const repeatPassRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(genderRef.current?.id);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="Имя"
        inputPlaceholder="Ваше имя"
        type="text"
        ref={nameRef}
      />
      <Input
        label="Ник"
        inputPlaceholder="Ваш ник"
        type="text"
        ref={nickNameRef}
      />
      <Input
        label="Почта"
        inputPlaceholder="Введите почту"
        type="email"
        ref={emailRef}
      />
      <div className={styles.form__gender}>
        <p>Пол</p>
        <Input
          label="Мужской"
          type="radio"
          labelPosition="left"
          name="gender"
          id="men"
          ref={genderRef}
        />
        <Input
          label="Женский"
          type="radio"
          labelPosition="left"
          name="gender"
          id="woman"
          ref={genderRef}
        />
      </div>
      <Input
        label="Пароль"
        inputPlaceholder="Придумайте пароль"
        type="password"
        ref={passRef}
      />
      <Input
        label="Повторить пароль"
        inputPlaceholder="Повторите пароль"
        type="password"
        ref={repeatPassRef}
      />
      <button type="submit">Войти</button>
    </form>
  );
};
