import { CountryEdit } from '@/components/settings/editForms/CountryEdit';

const page = async ({}) => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const countriesRaw = await response.json();

  const countryNames = countriesRaw.map(
    (country: { name: { common: string } }) => country.name.common
  );

  return <CountryEdit countryNames={countryNames} />;
};

export default page;
