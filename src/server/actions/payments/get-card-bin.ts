'use server';

import axios from 'axios';

export const GetCardBin = async (cardNumber: string) => {
  try {
    const cardOptions = {
      method: 'POST',
      url: 'https://bin-ip-checker.p.rapidapi.com/',
      params: { bin: cardNumber },
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY_1,
        'X-RapidAPI-Host': 'bin-ip-checker.p.rapidapi.com',
      },
      data: { bin: cardNumber },
    };

    return await axios.request(cardOptions);
  } catch (error) {
    return null;
  }
};
