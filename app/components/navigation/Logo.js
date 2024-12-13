import Link from "next/link";

export default function Logo({ width }) {
  return (
    <Link href="/">
      <img
        src="/Logo.svg"
        alt="The logo for Reika's online store, it is her username and a pink circle behind it."
        className={width}
      ></img>
    </Link>
  );
}
