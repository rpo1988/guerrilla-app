import { gql } from '@apollo/client';

export const GET_PROPERTIES = gql`
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
