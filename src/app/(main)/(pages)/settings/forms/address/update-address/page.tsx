import { getStateAndCountries } from '@/server/data/getStateAndCountries';
import { UpdateAddressForm } from '../_components/UpdateAddressForm';

const page = async ({}) => {
  const { countryNames, states } = await getStateAndCountries();

  return <UpdateAddressForm countryNames={countryNames} states={states} />;
};

export default page;
