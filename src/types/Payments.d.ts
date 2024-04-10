interface PaymentMethod {
  id: string;
  userId: string;
  bankName: string;
  cardType: string;
  cardScheme: string;
  cardHolder: string;
  cardNumber: string;
  lastFourNumbers: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  default: boolean;
}
