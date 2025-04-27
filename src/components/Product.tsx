import Image from 'next/image';
import asset3 from '@/assets/Kettle.png';
import asset4 from '@/assets/Kettle.png';
import asset5 from '@/assets/prouct.png';

export const Product = () => {
  return (
    <section className="bg-gradient-to-b from-white to-yellow-400 py-24 dark:bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#FACC15,#000000_100%)] overflow-clip">
      <div className="container">
        <div className="max-w-[540px] mx-auto">
          <div className="flex justify-center">
            <div className="text-sm inline-flex font-semibold border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight dark:border-[#fff]/20">
              Tingkatkan Konsistensi Kamu Bersama Kami
            </div>
          </div>
          <h2 className="text-center text-3xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter bg-gradient-to-b from-yellow-400 to-orange-400 text-transparent bg-clip-text mt-5">
            Sebuah cara yang lebih efektif untuk melacak progressmu
          </h2>
          <p className="text-center text-[22px] leading-[30px] tracking-tight text-black dark:text-white mt-5">
            Tingkatkan perjalanan kebugaranmu dengan 23Flex, aplikasi pelacak workout yang dirancang untuk membuat setiap latihan
            lebih terarah, efektif, dan personal.
          </p>
        </div>

        
        <div className="relative flex justify-center mt-10">
          <div className="relative w-full max-w-[600px]"> {/* Kontrol ukuran asset5 */}
            {/* Center asset5 */}
            <Image src={asset5} alt="Product" className="w-full" />

            
            <Image
              src={asset3}
              alt="kettle-top-right"
              className="absolute -top-20 -right-14 w-20 md:w-32 lg:w-40 scale-x-[-1]"
            />

            
            <Image
              src={asset4}
              alt="kettle-bottom-left"
              className="absolute -bottom-6 -left-14 w-20 md:w-32 lg:w-40"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
