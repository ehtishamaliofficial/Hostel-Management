import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from '../utils/constants/baseQuery';

const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: baseQuery,
  tagTypes: ['paymentApi'],
  endpoints: builder => ({
    outGoingPayment: builder.query<Array<Payment>, void>({
      query: () => ({
        url: '/api/v1/payment/outgoing',
        method: 'GET',
      }),
    }),

    incomingPayment: builder.query<Array<Payment>, void>({
      query: () => ({
        url: '/api/v1/payment/incoming',
        method: 'GET',
      }),
    }),
  }),
});

export default paymentApi;

export const {useOutGoingPaymentQuery, useIncomingPaymentQuery} = paymentApi;
