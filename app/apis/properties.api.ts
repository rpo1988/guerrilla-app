import request, { Variables, gql } from 'graphql-request';
import config from '../config/contentful';
import { IPropertiesResponse } from '../models/properties.model';

/* Queries */
const GET_PROPERTIES = gql`
  query GetProperties($offset: Int!, $limit: Int, $category: String) {
    propertyCollection(
      skip: $offset
      limit: $limit
      where: { category: $category }
      order: title_ASC
    ) {
      total
      items {
        id
        title
        address
        category
        image {
          url
        }
      }
    }
  }
`;

/* Methods */
export const getProperties: (variables: Variables) => Promise<IPropertiesResponse> = (variables) =>
  request(config.baseUrl, GET_PROPERTIES, variables, {
    ...(config.accessToken ? { Authorization: `Bearer ${config.accessToken}` } : {}),
  });
