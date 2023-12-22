import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: '7av501ju',
  dataset: 'production',
  apiVersion: '2023-12-18',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
