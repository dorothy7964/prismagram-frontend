import { gql } from "apollo-boost";

// Feed 에서 사용
export const FEED_QUERY = gql`
    query paginateFeed($pageNumber: Int!, $items: Int!){
        paginateFeed(pageNumber: $pageNumber, items: $items){
            id
            location
            caption
            user {
                id
                userName
                avatar
            }
            files {
                id
                url
            }
            isLiked
            likeCount
            commentCount
            comments {
                id
                text
                user {
                    id
                    userName
                }
                createdAt
            }
            createdAt
        }
    }
`;

// TOGGLE_LIKE, ADD_COMMENT = FullPost, Post 에서 동일하게 사용
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

// GET_USER = EditProfile, Profile 에서 동일하게 사용
export const GET_USER = gql`
    query seeUser($userName: String!){
        seeUser(userName: $userName){
            id
            userName
            email
            fullName
            firstName
            lastName
            isFollowing
            isSelf
            bio
            avatar
            followingCount
            followersCount
            postsCount
            posts {
                id
                files {
                    url
                }
                likeCount
                commentCount
            }
        }
    }
`;