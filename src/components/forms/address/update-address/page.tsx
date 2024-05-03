import { getStateAndCountries } from '@/server/data/get-state-and-countries';
import { UpdateAddressForm } from '../_components/UpdateAddressForm';

const page = async () => {
  const { countryNames, states } = await getStateAndCountries();

  return <UpdateAddressForm countryNames={countryNames} states={states} />;
};

export default page;
