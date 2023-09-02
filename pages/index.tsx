import Image from "next/image";
import { Inter, DM_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const dmSans = DM_Sans({ subsets: ["latin"] });
console.log(dmSans.className);
export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${dmSans.className}`}
    >
      <h2 className="text-xl font-bold text-white">This is matterjs</h2>
    </main>
  );
}
