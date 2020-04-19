import gql from 'graphql-tag';

export const getCountriesQuery = gql`
  {
    getAllCountries
  }
`;

export const getCitiesByCountriesQuery = gql`
  query getCitiesByCountries($countriesNames: [String]!) {
    getCitiesByCountries(countriesNames: $countriesNames)
  }
`;
