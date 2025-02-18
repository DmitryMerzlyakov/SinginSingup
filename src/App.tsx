import { useState } from "react";
import "./App.css";
import { Signin, Signup } from "./components";

function App() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const handleSignIn = (data: { email: string; password: string }) => {
    console.log("Email:", data.email);
    console.log("Password:", data.password);
  };

  return (
    <div className="wrapper">
      <button onClick={() => setIsVisible((prev: boolean) => !prev)}>
        {isVisible ? "Signin" : "Signup"}
      </button>
      {!isVisible && <Signin onSubmit={handleSignIn}/>}
      {isVisible && <Signup />}
    </div>
  );
}

export default App;
