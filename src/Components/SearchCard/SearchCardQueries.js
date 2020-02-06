import { gql } from "apollo-boost";

export const SEARCH = gql`
    query search($term: String!){
        searchUser(term: $term){
            id
            avatar
            userName
            isSelf
        }
    }
`;
