import Link from "next/link";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/actions/userAction";

async function Navbar() {
   const user = await currentUser();
   if(user) await syncUser();


   return (
      <nav className = "sticky top-0 backdrop-blur-sm z-20">
         <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
               <div className="flex items-center">
                  <Link href="/" className="text-xl font-bold text-primary font-mono tracking-wider">23FLEX</Link>
               </div>

               <DesktopNavbar/>
               <MobileNavbar/>
            </div>
         </div>
      </nav>
   );
}
export default Navbar;