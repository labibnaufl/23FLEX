import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import asset1 from '@/assets/Dumbell.png';
import asset2 from '@/assets/Kettle.png';
import Image from "next/image";

export const CallToAction = () => {
   return (
      <section className="bg-gradient-to-b from-white to-yellow-400 py-24 overflow-x-clip dark:from-black dark:to-yellow-400 dark:bg-gradient-to-b">
         <div className="container">
            <div className="relative">
               <h2 className="pb-2 text-center text-3xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter bg-gradient-to-b from-yellow-400 to-orange-400 text-transparent bg-clip-text mt-5">
                  Bergabung dengan Kami Mulai Hari Ini
               </h2>

               <p className="text-center text-[22px] leading-[30px] tracking-tight text-black dark:text-white mt-5">
               "Mulai perjalananmu bersama 23Flex hari ini — catat, capai, dan rayakan setiap langkah kecilmu menuju versi terbaik dirimu!"
               </p>
               <Image 
                  src={asset1} 
                  alt="dumbell"
                  width={300}
                  className="hidden lg:block absolute -left-[30px] -top-[190px] transform rotate-[-30deg]"
               />

               <Image
                 src={asset2} 
                 alt="Kettle"
                 width={200}
                 className="hidden lg:block absolute -right-[100px] -buttom-[227px]"
               />
            </div>

            <div className="flex gap-2 mt-10 justify-center">
               <Button className="btn btn-primary">Sign In</Button>
               <Button className="gap-1" variant="secondary">
                  <span>Mulai Mencatat</span>
                  <ArrowRight className="h-5 w-5 "/>
               </Button>
            </div>
         </div>
      </section>
   );
};