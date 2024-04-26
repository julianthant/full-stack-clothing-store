import { getStateAndCountries } from '@/server/data/getStateAndCountries';
import { AddAddressForm } from '../_components/AddAddressForm';

const page = async ({}) => {
  const { countryNames, states } = await getStateAndCountries();

  return <AddAddressForm countryNames={countryNames} states={states} />;
};

export default page;
