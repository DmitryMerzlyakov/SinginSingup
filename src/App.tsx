import { useState } from "react";
import "./App.css";
import { Signin, Signup } from "./components";
import { IDataSignIn, IDataSignUp } from "./models/interface";

function App() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const handleSignIn = (data: IDataSignIn) => {
    console.log("Email:", data.email);
    console.log("Password:", data.pass);
  };

  const handleSignUp = (data: IDataSignUp) => {
    console.log("Name:", data.name);
    console.log("Nick Name:", data.nickName);
    console.log("Email:", data.email);
    console.log("Gender:", data.gender);
    console.log("Password:", data.pass);
  };


  return (
    <div className="wrapper">
      <button onClick={() => setIsVisible((prev: boolean) => !prev)}>
        {isVisible ? "Signin" : "Signup"}
      </button>
      {!isVisible && <Signin onSubmit={handleSignIn}/>}
      {isVisible && <Signup onSubmit={handleSignUp}/>}
    </div>
  );
}

export default App;
