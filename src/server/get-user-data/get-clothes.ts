'use server';

import axios from 'axios';

export const getClothes = async (
  offset: number,
  CID: number,
  limit: number,
  sort: string
) => {
  const options = {
    method: 'GET',
    url: 'https://asos2.p.rapidapi.com/products/v2/list',
    params: {
      store: 'US',
      offset: offset,
      categoryId: CID,
      limit: limit,
      country: 'US',
      sort: sort,
      currency: 'USD',
      sizeSchema: 'US',
      lang: 'en-US',
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY_3,
      'X-RapidAPI-Host': 'asos2.p.rapidapi.com',
    },
  };

  console.log('api called');

  try {
    return await axios.request(options).then((res) => res.data);
  } catch (error) {
    options.headers['X-RapidAPI-Key'] = process.env.RAPIDAPI_KEY_3;
    return await axios.request(options).then((res) => res.data);
  }
};
