// "src": ,
//       "alt": "A journal with a pink cute hamster staring at you"

// import { Widgets } from "@mui/icons-material"

//     },
//     {
//       "src": "/pokemon-25th-anniversary-mewtwo-and-mew-totes-bag-1.webp",
//       "alt": "A cloth bag with an illustration of Mewtwo and Mew from pokemon."
//     },
//     {
//       "src": "/kingdom-hearts-tamagotchi-keychain-sora-roxas-double-sided-clear-acrylic-1.webp",
//       "alt": "2 keychains that look like tomagachis. chibi-fied (cute and chubby cheeked) drawn characters from Kingdom Hearts. The characters are Sora, and Roxas. "
//     }
//   ]
// }
import Image from "next/image";
export default function ImageCarousel() {
  return (
    <div className="bg-backDropPink p-4">
      <Image
        src="/hamster-collection-reusable-sticker-book-size-a5-50-sheets-stationary-1.webp"
        alt="A journal with a pink cute hamster staring at you"
        className="flex w-full lg:w-3/4 mx-auto  lg:border-4 lg:border-backDropDark rounded-xl"
        width={1300}
        height={600}
      />
    </div>
  );
}
