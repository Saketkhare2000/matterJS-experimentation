import Image from "next/image";
import { Inter, DM_Sans } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
const dmSans = DM_Sans({ subsets: ["latin"] });
console.log(dmSans.className);
export default function Home() {
    return (
        <main
            className={`flex min-h-screen flex-col items-center w-full ${dmSans.className}`}
        >
            <h2 className="text-xl font-bold text-white">Checkout blogs</h2>

            <Button variant="outline" className="w-fit">
                <Link href="/blog">Blog</Link>
            </Button>
        </main>
    );
}
