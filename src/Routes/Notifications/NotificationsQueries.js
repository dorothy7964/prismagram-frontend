import { gql } from "apollo-boost";

export const ME = gql`
    query {
        me {
            followers {
                id
                userName
                avatar
                isFollowing
            }
        }
    }
`;