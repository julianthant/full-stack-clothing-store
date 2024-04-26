import { IntegralCF } from '@/app/fonts/fonts';
import Image from 'next/image';

export const DressStyleComponent = () => {
  return (
    <div className="container">
      <div className="space-y-10 rounded-[23px] bg-foreground-100 py-16 px-8">
        <h1
          className={`lg:text-5xl md:text-4xl text-3xl font-bold ${IntegralCF.className} text-center`}
        >
          BROWSE BY DRESS STYLE
        </h1>
        <div className="grid md:grid-rows-2 md:grid-cols-5 gap-4">
          <div className="relative rounded-2xl md:col-span-2 h-[192px] overflow-hidden bg-white/95">
            <Image
              src="https://utfs.io/f/d9ad37f7-b90a-4e90-ba01-b6eef5158be3-x9gmmj.jpg"
              alt="Casual"
              width={360}
              height={192}
              className="absolute sm:right-[-120px] sm:top-[-73px] right-[-90px] top-[-70px] w-auto h-auto"
              priority
              loading="eager"
            />
            <p className="absolute 2xl:top-6 top-4 2xl:left-10 xl:left-8 left-6 2xl:text-3xl xl:text-2xl text-xl font-bold">
              Casual
            </p>
          </div>

          <div className="relative rounded-2xl md:col-span-3 h-[192px] overflow-hidden bg-white/95">
            <Image
              src="https://utfs.io/f/5dced6e1-a5d8-47f3-ba80-7cb959290774-yw9t73.jpg"
              alt="Formal"
              width={300}
              height={192}
              className="absolute sm:right-[-20px] right-[-90px] top-[-90px] w-auto h-auto"
              priority
              loading="eager"
            />
            <p className="absolute 2xl:top-6 top-4 2xl:left-10 xl:left-8 left-6 2xl:text-3xl xl:text-2xl text-xl font-bold">
              Formal
            </p>
          </div>

          <div className="relative rounded-2xl md:col-span-3 h-[192px] overflow-hidden bg-white/95">
            <Image
              src="https://utfs.io/f/3534301a-4f36-4ddd-888b-a1e898f83ec2-19rwli.webp"
              alt="Party"
              width={500}
              height={192}
              className="absolute sm:right-[-60px] right-[-50px] sm:top-[-120px] top-[-63px] w-auto h-auto"
              priority
              loading="eager"
            />
            <p className="absolute 2xl:top-6 top-4 2xl:left-10 xl:left-8 left-6 2xl:text-3xl xl:text-2xl text-xl font-bold">
              Party
            </p>
          </div>

          <div className="relative rounded-2xl md:col-span-2 h-[192px] overflow-hidden bg-white/95">
            <Image
              src="https://utfs.io/f/0b59284d-0e80-4829-a641-31eedfbd9b56-1jmj.jpg"
              alt="Gym"
              width={300}
              height={192}
              className="absolute sm:right-[-47px] right-[-42px] sm:top-[-85px] top-[-74px] w-auto h-auto"
              priority
              loading="eager"
            />
            <p className="absolute 2xl:top-6 top-4 2xl:left-10 xl:left-8 left-6 2xl:text-3xl xl:text-2xl text-xl font-bold">
              Gym
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
