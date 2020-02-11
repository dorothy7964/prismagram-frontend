import { gql } from '@apollo/client';

export const SEE_LIKE = gql`
    query {
        seeLike {
            id
            readCheck
            user {
                id
                userName
                avatar
            }
            post {
                id
            }
        }
    }
`;

export const READ_LIKE = gql`
    mutation readLike($likeId: String!){
        readLike(likeId: $likeId)
    }
`;