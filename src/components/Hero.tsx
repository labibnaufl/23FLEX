import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";
import asset1 from "@/assets/sports.png";
import Image from "next/image";
import asset2 from "@/assets/Dumbell.png"

export const Hero = () => {
  return (
    <section className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#fACC15,#FFFFFF_100%)] dark:bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#FACC15,#000000_100%)] overflow-x-clip
      ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="md:flex items-center gap-12">
          {/* Teks */}
          <div className="md:w-[478px]">
            <div className="text-sm inline-flex border font-semibold border-[#222]/10 px-3 py-1 rounded-lg tracking-tight dark:border-[#fff]/20 px-3 py-1 rounded-lg tracking-tight">
              Telah hadir!
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b  from-yellow-400 to-orange-400 text-transparent bg-clip-text mt-6 text-">
              23FLEX
            </h1>
            <p className="text-xl tracking-tight mt-6">
              Catat setiap set. Lacak setiap progres. Bangun rutinitas latihan yang terarah dan konsisten.  
              23Flex hadir untuk membantumu mencapai target kebugaran dengan fitur menu latihan, progres tracker, dan pengingat jadwal yang memudahkan.  
              Saatnya kamu <strong>#FlexYourJourney</strong>.
            </p>
            <div className="flex items-center mt-8">
              <Button>
                Mulai Sekarang <ArrowRightIcon className="h-5 w-5 ml-1" />
              </Button>
            </div>
          </div>

          {/* Gambar */}
          <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
            <Image 
            src={asset1} 
            alt="Sports" 
            className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0" 
            />
            <Image className="hidden lg:block absolute top-[450px] left-[750px] transform rotate-[-30deg]" 
            src={asset2} 
            alt="Dumbell" 
            width={300} 
            />
            <Image className="hidden lg:block absolute bottom-[450px] right-[650px] transform rotate-[-30deg]" 
            src={asset2} 
            alt="Dumbell" 
            width={250} 
            />

            
          </div>
        </div>
      </div>
    </section>
  );
};
