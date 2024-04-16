import Image from 'next/image';

export const DressStyleComponent = () => {
  return (
    <div className="container">
      <div className="space-y-10 rounded-[23px] bg-foreground-100 py-16 px-8">
        <h1 className="bold-integral font-bold sm:text-4xl text-3xl text-center">
          BROWSE BY DRESS STYLE
        </h1>
        <div className="grid md:grid-rows-2 md:grid-cols-5 gap-4">
          <div className="relative rounded-2xl md:col-span-2 h-[192px] overflow-hidden bg-white/95">
            <Image
              src="/images/Casual.jpg"
              alt="Casual"
              width={300}
              height={192}
              className="absolute sm:right-[-120px] sm:top-[-73px] right-[-90px] top-[-70px]"
            />
            <p className="absolute 2xl:top-6 top-4 2xl:left-10 xl:left-8 left-6 2xl:text-3xl xl:text-2xl text-xl font-bold">
              Casual
            </p>
          </div>

          <div className="relative rounded-2xl md:col-span-3 h-[192px] overflow-hidden bg-white/95">
            <Image
              src="/images/Formal.jpg"
              alt="Formal"
              width={300}
              height={192}
              className="absolute sm:right-[-20px] right-[-90px] top-[-90px]"
            />
            <p className="absolute 2xl:top-6 top-4 2xl:left-10 xl:left-8 left-6 2xl:text-3xl xl:text-2xl text-xl font-bold">
              Formal
            </p>
          </div>

          <div className="relative rounded-2xl md:col-span-3 h-[192px] overflow-hidden bg-white/95">
            <Image
              src="/images/Party.jpg"
              alt="Party"
              width={500}
              height={192}
              className="absolute sm:right-[-60px] right-[-50px] sm:top-[-120px] top-[-63px]"
            />
            <p className="absolute 2xl:top-6 top-4 2xl:left-10 xl:left-8 left-6 2xl:text-3xl xl:text-2xl text-xl font-bold">
              Party
            </p>
          </div>

          <div className="relative rounded-2xl md:col-span-2 h-[192px] overflow-hidden bg-white/95">
            <Image
              src="/images/Gym.jpg"
              alt="Gym"
              width={300}
              height={192}
              className="absolute sm:right-[-47px] right-[-42px] sm:top-[-85px] top-[-74px]"
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
