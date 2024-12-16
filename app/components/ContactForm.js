import { Email } from "@mui/icons-material";

export default function ContactForm() {
  return (
    <div className="bg-backDropDark text-white text-xl p-4 w-full rounded-3xl">
      <form className="flex flex-col w-4/5 m-4">
        <label htmlFor="name">name</label>
        <input
          type="text"
          name="name"
          className="text-black p-1 rounded-xl mb-4"
        ></input>
        <label htmlFor="email">email</label>
        <input type="email" className="text-black p-1 rounded-xl mb-4"></input>
        <label htmlFor="text">order Id</label>
        <input type="text" className="text-black p-1 rounded-xl mb-4"></input>
        <label htmlFor="text">message</label>
        <input
          type="text"
          className="text-black p-1 rounded-xl mb-4 h-24"
          maxLength="500"
        ></input>
        <button className="bg-buttonPurple w-fit px-6 py-2 rounded-xl my-4">
          Submit
        </button>
      </form>
    </div>
  );
}
