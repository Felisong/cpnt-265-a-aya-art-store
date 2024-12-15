import Image from "next/image";
import Socials from "./Socials";

export default function AboutCard() {
  return (
    <>
      <div className="flex flex-col bg-white items-center text-lg m-2 rounded-xl p-4 px-8">
        <h2 className="text-4xl p-4"> About Reika </h2>
        <div className="border-red-700 border-8 rounded-full w-80 h-80 flex items-center justify-center my-6 ">
          <Image
            src="/icon.png"
            height="300"
            width="300"
            alt="icon of Reika's original character. Here is her links to socials and other sites."
            className="rounded-full p-2 w-full h-full"
          ></Image>
        </div>
        <Socials />
        <div>
          {" "}
          <button></button>
        </div>
        <div> 3 buttons </div>
        <div> 2 buttons</div>
      </div>
    </>
  );
}
