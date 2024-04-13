import { CountryEditForm } from '@/components/settings/account/forms/CountryEditForm';

const page = async ({}) => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const countriesRaw = await response.json();

  const countryNames = countriesRaw.map(
    (country: { name: { common: string } }) => country.name.common
  );

  return <CountryEditForm countryNames={countryNames} />;
};

export default page;