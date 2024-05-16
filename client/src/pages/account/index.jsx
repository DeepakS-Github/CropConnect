import React, { useState } from "react";
import { useParams } from "react-router-dom";
import InputTag from "../../components/input/InputTag";
import SubmitButton from "../../components/button/SubmitButton";
import FormSwitch from "../../components/account/FormSwitch";
import SideImage from "../../components/account/SideImage";
import FormHeading from "../../components/account/FormHeading";

function LoginAndSignup() {
  const { type } = useParams();

  const [isSignInForm, setIsSignInForm] = useState(true);

  return (
    <section className="flex flex-row  md:h-screen">
      <SideImage type={type} />
      <div className="flex flex-col w-full lg:w-1/2 items-center justify-center px-6 py-8 lg:py-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-full">
          <FormHeading type={type} isSignInForm={isSignInForm} />
          <form className="space-y-4 md:space-y-6 w-3/5 mx-auto">
            {/* For Sign Up */}

            {!isSignInForm && (
              <>
                {/* Common for both seller and user */}
                <InputTag
                  label={"Name"}
                  placeholder={"John"}
                  type={"text"}
                  outlineColor={
                    type === "seller" ? "outline-green-700" : "outline-blue-600"
                  }
                />
                <InputTag
                  label={"Contact No."}
                  placeholder={"9876543210"}
                  type={"text"}
                  outlineColor={
                    type === "seller" ? "outline-green-700" : "outline-blue-600"
                  }
                />

                {/* For Seller Specific */}
                {type === "seller" && (
                  <InputTag
                    label={"Brand Name"}
                    placeholder={"JohnVeggies"}
                    type={"text"}
                    outlineColor={
                      type === "seller"
                        ? "outline-green-700"
                        : "outline-blue-600"
                    }
                  />
                )}
              </>
            )}

            {/* For Sign In */}
            <InputTag
              label={"Email"}
              placeholder={"john@doe.com"}
              type={"email"}
              outlineColor={
                type === "seller" ? "outline-green-700" : "outline-blue-600"
              }
            />
            <InputTag
              label={"Password"}
              placeholder={"••••••••"}
              type={"password"}
              outlineColor={
                type === "seller" ? "outline-green-700" : "outline-blue-600"
              }
            />

            <SubmitButton
              text={isSignInForm ? "Sign In" : "Create account"}
              bgColor={type === "seller" ? "bg-green-700" : "bg-blue-600"}
              hoverBgColor={type === "seller" ? "bg-green-600" : "bg-blue-700"}
            />
            <FormSwitch
              type={type}
              isSignInForm={isSignInForm}
              setIsSignInForm={setIsSignInForm}
            />
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginAndSignup;
