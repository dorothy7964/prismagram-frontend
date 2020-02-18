import { gql } from "apollo-boost";

export const LOG_OUT = gql`
    mutation logUserOut {
        logUserOut @client
    }
`;

export const EDIT_PROFILE = gql`
    mutation editUser(
        $avatar: String
    ) {
        editUser( avatar: $avatar ){
            avatar
        }
    }
`;