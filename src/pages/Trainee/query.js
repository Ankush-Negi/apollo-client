import { gql } from 'apollo-boost';

const GET_TRAINEE = gql`
query GetAllTrainee($skip: Int, $limit: Int){
    getAllTrainee(options:{skip: $skip,limit: $limit}){
        records {
            _id,
            name,
            email,
            role,
            originalId,
            createdAt
        }
        count,
    }
}
`;

export {
  GET_TRAINEE,
};
