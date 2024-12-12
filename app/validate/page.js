import Link from "next/link";

export default function Validate() {
  return (
    <div>
      <h1> Account Creation Successful!</h1>
      <p>
        {" "}
        Please check your Email to verify your account for access to your
        dashboard.
      </p>
      <div>
        <Link href="https://mail.google.com/" target="blank">
          {" "}
          Gmail
        </Link>
        <Link href="https://outlook.live.com/"> Outlook</Link>
        <Link href="https://mail.yahoo.com/"> Yahoo</Link>
        <Link href="https://www.icloud.com/mail/"> Apple mail</Link>
      </div>
    </div>
  );
}
