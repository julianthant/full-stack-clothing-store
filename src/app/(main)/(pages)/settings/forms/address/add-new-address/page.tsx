import { AddAddressForm } from '../_components/AddAddressForm';

const page = async ({}) => {
  try {
    const [countriesResponse, statesResponse] = await Promise.all([
      fetch('https://restcountries.com/v3.1/all'),
      fetch('https://api.census.gov/data/2010/dec/sf1?get=NAME&for=state:*'),
    ]);

    const countriesRaw = await countriesResponse.json();
    const statesRaw = await statesResponse.json();

    const countryNames = countriesRaw.map(
      (country: { name: { common: string } }) => country.name.common
    );

    statesRaw.shift();
    const states = statesRaw.map((stateData: String) => stateData[0]);

    return <AddAddressForm countryNames={countryNames} states={states} />;
  } catch (error) {
    console.error('Error:', error);
  }
};

export default page;
