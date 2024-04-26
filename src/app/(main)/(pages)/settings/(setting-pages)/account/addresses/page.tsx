import { AddressComponent } from './_components/AdresssComponent';

const page = () => {
  return (
    <div className="lg:grid flex flex-col gap-4 relative 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 dark:bg-black max-lg:min-h-[700px]">
      <AddressComponent />
    </div>
  );
};

export default page;
