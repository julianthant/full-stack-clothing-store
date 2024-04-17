import Image from 'next/image';

export const DressStyleComponent = () => {
  return (
    <div className="container">
      <div className="space-y-10 rounded-[23px] bg-foreground-100 py-16 px-8">
        <h1 className="bold-integral font-bold lg:text-5xl text-3xl text-center">
          BROWSE BY DRESS STYLE
        </h1>
        <div className="grid md:grid-rows-2 md:grid-cols-5 gap-4">
          <div className="relative rounded-2xl md:col-span-2 h-[192px] overflow-hidden bg-white/95">
            <Image
              src="https://utfs.io/f/d9ad37f7-b90a-4e90-ba01-b6eef5158be3-x9gmmj.jpg"
              alt="Casual"
              width={360}
              height={192}
              className="absolute sm:right-[-120px] sm:top-[-73px] right-[-90px] top-[-70px]"
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
              className="absolute sm:right-[-20px] right-[-90px] top-[-90px]"
              priority
              loading="eager"
            />
            <p className="absolute 2xl:top-6 top-4 2xl:left-10 xl:left-8 left-6 2xl:text-3xl xl:text-2xl text-xl font-bold">
              Formal
            </p>
          </div>

          <div className="relative rounded-2xl md:col-span-3 h-[192px] overflow-hidden bg-white/95">
            <Image
              src="https://utfs.io/f/76a530ff-9b52-4bdd-961b-189284974839-19rwli.jpg"
              alt="Party"
              width={500}
              height={192}
              className="absolute sm:right-[-60px] right-[-50px] sm:top-[-120px] top-[-63px]"
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
              className="absolute sm:right-[-47px] right-[-42px] sm:top-[-85px] top-[-74px]"
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
