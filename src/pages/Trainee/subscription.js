import { gql } from 'apollo-boost';

const UPDATE_TRAINEE_SUB = gql`
  subscription {
    traineeUpdated{
      originalId
      name
      email
    }
  }
`;

const DELETE_TRAINEE_SUB = gql`
  subscription{
    traineeDeleted
  }
`;

export { UPDATE_TRAINEE_SUB, DELETE_TRAINEE_SUB };
