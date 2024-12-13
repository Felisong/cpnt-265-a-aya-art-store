"use client";
import Cookies from "js-cookie";
import { login, signup } from "./actions";
import { useState } from "react";

export default function LoginPage() {
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  return (
    <div className="bg-[url('/gemini-generated-background.png')] bg-cover bg-center h-[75vh] flex items-center justify-center relative">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <form className="relative z-10  bg-backDropPink p-8 text-lg rounded shadow-lg flex flex-col">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          className="text-black"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          className="text-black"
          required
        />
        <button
          className="p-2 bg-buttonPurple m-3 mt-4 text-white rounded-3xl "
          formAction={login}
        >
          Log in
        </button>
        <button
          className="p-2 bg-buttonPurple m-3  text-white rounded-3xl "
          formAction={signup}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
