"use client";
import Link from "next/link";
import Logo from "../navigation/Logo";
import UserIcon from "../navigation/UserIcon";

export default function Footer() {
  const year = new Date().getFullYear();

  const nav = [
    { name: "Home", href: "/", current: false, id: 1 },
    { name: "Products", href: "/products", current: false, id: 2 },
    { name: "Check Out", href: "/checkout", current: false, id: 3 },
    { name: "Contact", href: "/contact", current: false, id: 4 },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <header className="bg-backDropDark flex items-center justify-around pt-4">
      <div className="p-4 ">
        <Logo width={"w-48"} />
        <p className="text-white mt-12 pl-4">All Rights Reserved {year} </p>
      </div>
      <ul className="mx-4 flex flex-col m mb-4 items-start md:items-center md:text-center">
        <li>
          <UserIcon />
        </li>
        <li>
          <div className="  w-fit flex flex-col px-2">
            {nav.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-darkBlue text-white px-2 text-xl w-30"
                    : "text-white text-xl hover:bg-backDropPink hover:text-black",
                  "rounded-md py-2 px-1"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </li>
      </ul>
    </header>
  );
}
