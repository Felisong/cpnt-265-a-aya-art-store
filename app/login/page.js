import Cookies from "js-cookie";
import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <form className="flex flex-col items-center justify-center text-white bg-backDropDark mt-20 md:mt-80 w-64 h-64 mx-auto rounded-xl">
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
      <button className="p-2" formAction={login}>
        Log in
      </button>
      <button formAction={signup}>Sign up</button>
    </form>
  );
}
