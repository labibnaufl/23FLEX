import { currentUser } from "@clerk/nextjs/server";
import { HomeIcon, UserIcon, GoalIcon, DumbbellIcon, ClipboardIcon} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import ModeToggle from "./ModeToggle";

export default async function DesktopNavbar() {
  const user = await currentUser();

  return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />

      {/* Link ke Beranda */}
      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Beranda</span>
        </Link>
      </Button>

      {/* Jika user sudah login */}
      {user ? (
        <>
          {/* Link ke Rekomendasi Latihan */}
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/recommendation">
              <GoalIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Rekomendasi Latihan</span>
            </Link>
          </Button>

          {/* Link ke Latihan (misalnya halaman exercise) */}
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/exercise">
              <DumbbellIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Latihan</span>
            </Link>
          </Button>

           {/* Link ke Catatan Latihan */}
           <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/schedule">
              <ClipboardIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Catatan Latihan</span>
            </Link>
          </Button>

          {/* Link ke Profil */}
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link
              href={`/profile/${
                user.username ??
                user.emailAddresses?.[0]?.emailAddress?.split("@")[0] ??
                "pengguna"
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Profil</span>
            </Link>
          </Button>

          {/* Tombol User */}
          <UserButton />
        </>
      ) : (
        <SignInButton mode="modal">
          <Button variant="default">Masuk</Button>
        </SignInButton>
      )}
    </div>
  );
}
