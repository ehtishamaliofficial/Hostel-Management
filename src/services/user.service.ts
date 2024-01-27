import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery, baseQueryWithReAuth} from '../utils/constants/baseQuery';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['userApi'],
  endpoints: builder => ({
    getAllUsers: builder.query<Array<User>, void>({
      query: () => ({
        url: '/api/v1/user',
        method: 'GET',
      }),
    }),
  }),
});

export default userApi;

export const {useGetAllUsersQuery} = userApi;
