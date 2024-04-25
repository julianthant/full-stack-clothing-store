import 'server-only'
import axios from 'axios'

import { db } from './database/db'

export async function getAllAddresses(userId: string) {
  const addresses = await db.address.findMany({
    where: { userId },
  })

  return addresses
}

export async function getUniqueAddress(id: string) {
  const address = await db.address.findUnique({
    where: { id },
  })

  return address

}

export async function getAllPayments(userId: string) {
  const paymentMethods = await db.payment.findMany({
    where: { userId },
  })

  return paymentMethods
}

export async function getUniquePayment(id: string) {
  const payment = await db.payment.findUnique({
    where: { id },
  })

  return payment
}

export async function getClothesByCategory(category: string, offset: number, per_page: number, currentSort: string) {
  const options = {
        method: 'GET',
        url: 'https://asos2.p.rapidapi.com/products/v2/list',
        params: {
          store: 'US',
          offset: offset,
          categoryId: category,
          limit: per_page,
          country: 'US',
          sort: currentSort,
          currency: 'USD',
          sizeSchema: 'US',
          lang: 'en-US',
        },
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'asos2.p.rapidapi.com',
        },
      };

  const clothes = await axios.request(options).then((res) => res.data);

  return clothes
}

export async function getCountryDialCodes() {
  const response = await axios.get('https://restcountries.com/v2/all');
  const phoneCodes = response.data
    .filter(
      (country: { callingCodes: string[] }) => country.callingCodes[0] !== null
    )
    .map((country: { name: string; callingCodes: string[] }) => ({
      name: country.name,
      dialCode: country.callingCodes[0],
    }));

  return phoneCodes
}