import { Email } from "@mui/icons-material";

export default function ContactForm() {
  return (
    <div className="bg-backDropDark text-white text-xl p-4 w-full rounded-3xl">
      <form className="flex flex-col w-4/5 m-4">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="text-black p-1 rounded-xl mb-4"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="text-black p-1 rounded-xl mb-4"
        />

        <label htmlFor="orderId">Order ID</label>
        <input
          type="text"
          id="orderId"
          name="orderId"
          className="text-black p-1 rounded-xl mb-4"
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          className="text-black p-1 rounded-xl mb-4 h-24"
          maxLength="500"
        ></textarea>

        <button
          type="submit"
          className="bg-buttonPurple w-fit px-6 py-2 rounded-xl my-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
