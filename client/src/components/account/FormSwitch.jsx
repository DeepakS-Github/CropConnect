import React from "react";

const FormSwitch = ({type, isSignInForm, setIsSignInForm}) => {
  return (
    <p className="text-sm text-center font-medium text-gray-500 dark:text-gray-400">
      {isSignInForm?"Don’t have an account yet?":"Already have an account?"}{" "}
      <button
        className={`font-medium ${
          type === "seller" ? "text-green-700" : "text-blue-600"
        } hover:underline`}
        onClick={() => setIsSignInForm((prev)=>!prev)}
      >
        {isSignInForm?"Create an account":"Sign In"}
      </button>
    </p>
  );
};

export default FormSwitch;
