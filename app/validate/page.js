import Link from "next/link";

export default function Validate() {
  return (
    <div className="bg-[url('/gemini-generated-background.png')] bg-cover bg-center h-fit flex items-center justify-center relative md:h-[100vh] ">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10  bg-backDropPink p-8 w-4/5 rounded-3xl my-20 lg:w-3/5">
        <h1 className="text-2xl md:text-3xl lg:text-4xl py-4">
          {" "}
          Account Creation Successful!
        </h1>
        <p className="text-lg">
          {" "}
          Please check your Email to verify your account for access to your
          dashboard.
        </p>
        <div className="text-white my-4">
          <Link
            href="https://mail.google.com/"
            target="blank"
            className="bg-buttonPurple m-4 p-2 rounded-3xl "
          >
            {" "}
            Gmail
          </Link>
          <Link
            href="https://outlook.live.com/"
            target="blank"
            className="bg-buttonPurple m-4 p-2 rounded-3xl "
          >
            {" "}
            Outlook
          </Link>
          <Link
            href="https://mail.yahoo.com/"
            target="blank"
            className="bg-buttonPurple m-4 p-2 rounded-3xl "
          >
            {" "}
            Yahoo
          </Link>
          <Link
            href="https://www.icloud.com/mail/"
            target="blank"
            className="bg-buttonPurple m-4 p-2 rounded-3xl "
          >
            {" "}
            Apple mail
          </Link>
        </div>
      </div>
    </div>
  );
}
