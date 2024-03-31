import { PhoneNumberEdit } from '@/components/settings/editForms/PhoneNumberEdit';

const page = async ({}) => {
  const response = await fetch('https://restcountries.com/v2/all');
  const data = await response.json();
  const phoneCodes = data
    .filter(
      (country: { callingCodes: string[] }) => country.callingCodes[0] !== null
    )
    .map((country: { name: string; callingCodes: string[] }) => ({
      name: country.name,
      dialCode: country.callingCodes[0],
    }));

  return <PhoneNumberEdit phoneCodes={phoneCodes} />;
};

export default page;
