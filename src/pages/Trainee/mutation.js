import { gql } from 'apollo-boost';

const CREATE_TRAINEE = gql`
mutation CreateTrainee($name: String!, $email: String!, $password: String!){
      createTrainee(user: {name: $name, email: $email, password: $password}){
          name,
          email,
          role,
      }
}
`;

const UPDATE_TRAINEE = gql`
mutation UpdateTrainee($id: ID!, $email: String, $name: String){
      updateTrainee( dataToUpdate: {id: $id, email: $email, name: $name})
}
`;

const DELETE_TRAINEE = gql`
mutation DeleteTrainee($id: ID!){
      deleteTrainee(id: $id)
}
`;

export { CREATE_TRAINEE, UPDATE_TRAINEE, DELETE_TRAINEE };
