import React from "react";
import classNames from "classnames";

import styles from "./styles.module.css";

export type TLabelPosition = "bottom" | "left" | "right" | "top";
export type TIconPosition = "end" | "start";

export interface IInputProps {
  /**
   * autoFocus prop
   * */
  autoFocus?: boolean;
  /**
   * className prop
   * */
  className?: string;
  /**
   * If 'true' the input will be disabled
   * */
  disabled?: boolean;
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
  iconLabel?: React.ReactNode;
  /**
   * Placeholder's icon
   * */
  iconPlaceholder?: React.ReactNode;
  /**
   * The icon position (default position 'end')
   * */
  iconPosition?: TIconPosition;
  /**
   * Component id
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
   * If 'true' the input hint will change color
   * */
  isSuccess?: boolean;
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
    autoFocus = false,
    isError = false,
    isSuccess = false,
    iconPlaceholder,
    iconPosition = "end",
    type = "text",
    value,
    labelPosition = "top",
    onChange,
    label,
    hint,
    inputPlaceholder,
    className,
    iconLabel,
    id,
    name,
    disabled,
    ref
  }: IInputProps
) => {
  return (
    <div
      className={classNames(
        styles.wrapper,
        isError && styles.wrapperError,
        isSuccess && styles.wrapperSuccess,
        styles[`labelPosition__${labelPosition}`],
        styles[`iconPosition__${iconPosition}`],
        !label && styles.labelHidden,
        !hint && styles.hintHidden,
        className
      )}
    >
      {label && (
        <label className={styles.label} htmlFor={id}>
          <p className={styles.label_text}>{label}</p>
          <span className={styles.label_icon}>{iconLabel}</span>
        </label>
      )}
      <div className={styles.input_wrapper}>
        <input
          autoFocus={autoFocus}
          className={styles.input}
          disabled={disabled}
          name={name}
          id={id}
          onChange={onChange}
          placeholder={inputPlaceholder}
          type={type}
          value={value}
          ref={ref}
        />
        <span className={styles.input_icon}>{iconPlaceholder}</span>
        {hint && (
          <span
            className={classNames(
              styles.input_hint,
              isSuccess && styles.input_hint__success
            )}
          >
            {hint}
          </span>
        )}
      </div>
    </div>
  );
};
