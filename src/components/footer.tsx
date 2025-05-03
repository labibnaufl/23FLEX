import Image from "next/image";
import logo from '@/assets/Logo.png';
import { XIcon } from "lucide-react";
import { YoutubeIcon } from "lucide-react";
import { InstagramIcon } from "lucide-react";
import { FacebookIcon } from "lucide-react";

export const Footer = () => {
   return (
     <footer className="bg-black text-[#BCBCBC] text-sm py-10 text-center">
      <div className="container">
        <div className="inline-flex relative mb-3">
         <Image src={logo} height={40} alt="23Flex Logo"/>
        </div>
        <nav className="flex flex-col gap-6 mt-6 md:flex-row md:justify-center">
          <a href="#">Tentang Kami</a>
          <a href="#"> Hubungi Kami</a>
          <a href="#"> Layanan Kami</a>
        </nav>
        <div className="flex justify-center gap-6 mt-6">
          <XIcon/>
          <YoutubeIcon/>
          <InstagramIcon/>
          <FacebookIcon/>
        </div>
        <p className="mt-6">&copy; 2025 23FLEX, Inc.  All rights reserved. </p>
      </div>
     </footer>
   );
 };
 