import React from "react";

import styles from "./styles.module.css";
import classNames from "classnames";

export type TLabelPosition = "bottom" | "left" | "right" | "top";
export type TIconPosition = "end" | "start";

export interface IInputProps {
  /**
   * The input's hint
   * */
  hint?: string;
  /**
   * The input's name
   * */
  name?: string;
  /**
   * Label's icon
   * */
  id?: string;
  /**
   * The input's placeholder
   * */
  inputPlaceholder?: string;
  /**
   * If 'true' the input border and the input hint will change color
   * */
  isError?: boolean;
  /**
   * The label for the input
   * */
  label?: React.ReactNode | string;
  /**
   * The label position (default position 'top')
   * */
  labelPosition?: TLabelPosition;
  /**
   * The input handler
   * */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * The input type. 'password' | 'text'
   * */
  type?: React.HTMLInputTypeAttribute;
  /**
   * The input value
   * */
  value?: string;
  /**
   * The input ref
   * */
  ref: React.RefObject<HTMLInputElement | null>
}

export const Input = (
  {
    isError = false,
    type = "text",
    value,
    labelPosition = "top",
    onChange,
    label,
    hint,
    inputPlaceholder,
    id,
    name,
    ref
  }: IInputProps
) => {
  return (
    <div
      className={classNames(
        styles.wrapper,
        isError && styles.wrapperError,
        styles[`labelPosition__${labelPosition}`],
        !label && styles.labelHidden,
        !hint && styles.hintHidden,
      )}
    >
      {label && (
        <label className={styles.label} htmlFor={id}>
          <p className={styles.label_text}>{label}</p>
        </label>
      )}
      <div className={styles.input_wrapper}>
        <input
          className={styles.input}
          name={name}
          id={id}
          onChange={onChange}
          placeholder={inputPlaceholder}
          type={type}
          value={value}
          ref={ref}
        />
        {hint && 
          <span className={styles.input_hint}>{hint}</span>
        }
      </div>
    </div>
  );
};
