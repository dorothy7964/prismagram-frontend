import { gql } from "apollo-boost";

export const EDIT_PROFILE = gql`
    mutation editUser(
        $userName: String
        $email: String
        $firstName: String
        $lastName: String
        $bio: String
        $avatar: String
    ) {
        editUser(
            userName: $userName
            email: $email
            firstName: $firstName
            lastName: $lastName
            bio: $bio
            avatar: $avatar
        ){
            userName
        }
    }
`;