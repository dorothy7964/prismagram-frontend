import { gql } from "apollo-boost";

export const TOGGLEFOLLOW = gql`
    mutation toggleFollow($id: String!){
        toggleFollow(id: $id)
    }
`;