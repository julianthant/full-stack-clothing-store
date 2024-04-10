interface Address {
  id: string;
  userId: string;
  fullName: string;
  streetAddress: string;
  streetOptional: string | null;
  city: string;
  country: string;
  states: string | null;
  zipCode: string;
  phoneNumber: string;
  deliveryInstructions: string | null;
  defaultAddress: boolean;
}
