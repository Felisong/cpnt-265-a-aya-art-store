import Image from "next/image";
import Socials from "./Socials";
import LinkButtons from "./LinkButtons";

export default function AboutCard() {
  return (
    <>
      <div className="flex flex-col bg-white items-center text-lg m-2 rounded-xl p-4 px-8 w-4/5 md:w-1/2 lg:w-1/4">
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
        <div className="flex flex-col items-center md:flex-row flex-wrap md:justify-center ">
          <LinkButtons
            text={{
              text: "Twitter (Vtuber)",
              href: "https://x.com/reikas_art",
            }}
          />
          <LinkButtons
            text={{ text: "Art Twitter", href: "https://x.com/Reikaowo" }}
          />

          <LinkButtons
            text={{ text: "Ko-fi", href: "https://ko-fi.com/reikasart" }}
          />
          <LinkButtons
            text={{
              text: "Vgen (Vtuber Shop)",
              href: "https://vgen.co/Reikasart",
            }}
          />
          <LinkButtons
            text={{
              text: "Twitch",
              href: "https://www.twitch.tv/ayaart",
            }}
          />
        </div>
      </div>
    </>
  );
}
