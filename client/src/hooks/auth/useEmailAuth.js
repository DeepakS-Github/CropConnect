import React from "react";
import useHttpClient from "../api/useHttpClient";
import { LOGIN, SIGNUP, VERIFY } from "../../constants/apiEndpoints";

const useEmailAuth = () => {
  const { sendRequest, isLoading } = useHttpClient();

  const handleSignup = async (type, formData) => {
    try {
      await sendRequest(SIGNUP(type), "POST", formData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (type, formData) => {
    try {
      await sendRequest(LOGIN(type), "POST", formData, null, true, true);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyAccount = async (type, token) => {
    try {
      const resp = await sendRequest(
        VERIFY(type, token),
        "PATCH",
        null,
        null,
        false,
        true
      );
      console.log(resp.status);
      return resp.status;
    } catch (error) {
      console.log(error);
      return error.response.status;
    }
  };

  return { isLoading, handleSignup, handleLogin, verifyAccount };
};

export default useEmailAuth;
