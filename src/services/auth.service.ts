import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from '../utils/constants/baseQuery';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  tagTypes: ['Auth'],
  endpoints: builder => ({
    login: builder.mutation<LoginServiceResponse, LoginFormValues>({
      query: data => ({
        url: '/api/v1/user/authenticate',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export default authApi;

export const {useLoginMutation} = authApi;
