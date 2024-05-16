import React from "react";
import useHttpClient from "../api/useHttpClient";
import { LOGIN, SIGNUP } from "../../constants/apiEndpoints";

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
      await sendRequest(LOGIN(type), "POST", formData);
    } catch (error) {
      console.log(error);
    }
  };

  return { isLoading, handleSignup, handleLogin };
};

export default useEmailAuth;
