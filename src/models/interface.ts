export interface IDataSignUp { 
  name: string;
  nickName: string;
  email: string;
  gender: string;
  pass: string; 
}

export interface IDataSignIn { 
  email: string;
  pass: string; 
}

export interface IErrors {
  emailError: string;
  passError: string;
  nameError: string;
  nickNameError: string;
  genderError: string;
  repeatPassError: string;
};

export type TSigninErrors = Pick<IErrors, "emailError" | "passError">;

export type TSignupErrors = IErrors;

export type TFormValues = {
  name?: string;
  nickName?: string;
  email: string;
  pass: string;
  repeatPass?: string;
  isMaleSelected?: boolean;
  isFemaleSelected?: boolean;
};
