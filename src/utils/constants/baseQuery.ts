import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {RootState} from '../../redux/store';
import {AuthActions} from '../../redux/slices/auth.slice';

const url = 'http://193.123.65.43:8082';

export const baseQuery = fetchBaseQuery({
  baseUrl: url,
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).auth.token;
    console.log(token);
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReAuth = async (
  args: FetchArgs,
  api: BaseQueryApi,
  extraOptions: any,
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    api.dispatch(AuthActions.logout());
  }

  if (result.error?.status === 'FETCH_ERROR') {
    return {
      message: 'Server Error',
      error: 'FETCH_ERROR',
      statusCode: 500,
    };
  }
  return result;
};
