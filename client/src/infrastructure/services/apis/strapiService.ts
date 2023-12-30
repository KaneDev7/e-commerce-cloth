// api.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Créer une instance de l'API avec RTK Query
export const strapiServie = createApi({
  reducerPath: 'strapidata',
  baseQuery: fetchBaseQuery({
    baseUrl: '/http://localhost:1337/api',
  }),
  
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/products`,
    }),

    createPost: builder.mutation({
      query: (newPost) => ({
        url: 'posts',
        method: 'POST',
        body: newPost,
      }),
    }),
  }),
});

// Exporter des hooks pour l'utilisation dans les composants
export const { useGetProductsQuery, useCreatePostMutation } = strapiServie;
