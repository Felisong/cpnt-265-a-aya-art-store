"use client";
import Cookies from "js-cookie";
import { login, signup } from "./actions";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPwValid, setIsPwValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  // errors
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  useEffect(() => {
    if (isEmailValid && isPwValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isEmailValid, isPwValid]);

  function EmailValidation(e) {
    const value = e.target.value;
    setEmail(value);
    if (value.match(emailRegex) && value.length !== 0) {
      setIsEmailValid(true);
      setEmailErr("");
    } else {
      setIsEmailValid(false);
      setEmailErr("Please fill in a valid email with @.");
    }
  }
  function passwordValidation(e) {
    const value = e.target.value;
    setPassword(value);
    if (passwordRegex.test(value)) {
      setPasswordErr("");
      setIsPwValid(true);
    } else {
      setPasswordErr(
        "Password must have 1 lowercase letter, 1 uppercase letter and 1 number"
      );
      setIsPwValid(false);
    }
  }

  // console.log(isFormValid);
  return (
    <div className="bg-[url('/gemini-generated-background.png')] bg-cover bg-center h-[75vh] flex items-center justify-center relative">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <form className="relative z-10  bg-backDropPink p-8 text-lg rounded shadow-lg flex flex-col w-4/5 md:w-1/3">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          className="text-black"
          onChange={(e) => {
            EmailValidation(e);
          }}
          required
        />
        {!isEmailValid ? (
          <p className="text-sm text-red-900"> {emailErr}</p>
        ) : (
          <p className="text-sm text-red-900"> {emailErr}</p>
        )}
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          className="text-black"
          minLength={8}
          onChange={(e) => {
            passwordValidation(e);
          }}
          required
        />
        {!isPwValid ? (
          <p className="text-sm text-red-900"> {passwordErr}</p>
        ) : (
          <p className="text-sm text-red-900"> {passwordErr}</p>
        )}

        {isLoggingIn ? (
          <button
            className="p-2 bg-buttonPurple m-3 mt-4 text-white rounded-3xl "
            disabled={!isFormValid}
            formAction={login}
          >
            Log in
          </button>
        ) : (
          <button
            className="p-2 bg-buttonPurple m-3  text-white rounded-3xl "
            disabled={!isFormValid}
            formAction={signup}
          >
            Sign up
          </button>
        )}
        {isLoggingIn ? (
          <p className="text-center text-lg"> Want to create an account?</p>
        ) : (
          <p className="text-center text-lg"> Want to log in?</p>
        )}
        <button
          className="text-buttonPurple bg-white rounded-3xl w-fit px-2 flex mx-auto mt-2 hover:bg-buttonPurple hover:text-white"
          onClick={(e) => {
            e.preventDefault();
            isLoggingIn ? setIsLoggingIn(false) : setIsLoggingIn(true);
          }}
        >
          {" "}
          Click here.{" "}
        </button>
      </form>
    </div>
  );
}
