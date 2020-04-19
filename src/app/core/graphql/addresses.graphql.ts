import gql from 'graphql-tag';

export const getCountriesQuery = gql`
  {
    getAllCountries
  }
`;

export const getCitiesByCountryQuery = gql`
  query getCitiesByCountry($countryName: String!) {
    getCitiesByCountry(countryName: $countryName)
  }
`;
