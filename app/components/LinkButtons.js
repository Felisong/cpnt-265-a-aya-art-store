import Link from "next/link";

export default function LinkButtons({ text }) {
  return (
    <Link href={text.href}>
      <button className="bg-buttonPurple text-white p-4 text-2xl font-bold rounded-full flex m-2 hover:bg-purple-900">
        {text.text}
      </button>
    </Link>
  );
}
