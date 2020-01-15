import { gql } from "apollo-boost";

// TOGGLE_LIKE, ADD_COMMENT = Components/FullPost, Post 에서 동일하게 사용
export const TOGGLE_LIKE = gql`
    mutation toggelLike($postId: String!) {
        toggleLike(postId: $postId)
    }
`;
export const ADD_COMMENT = gql`
    mutation addComment($postId: String!, $text: String!) {
        addComment(postId: $postId, text: $text){
            id
            text
            user {
                userName
            }
        }
    }
`;