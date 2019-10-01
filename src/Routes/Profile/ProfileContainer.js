import React from "react";
import { withRouter } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import ProfilePresenter from "./ProfilePresenter";


const GET_USER = gql`
    query seeUser($userName: String!){
        seeUser(userName: $userName){
            id
            userName
            fullName
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

export default withRouter(({ match: { params: { userName } } }) => {
    const { data, loading } = useQuery(GET_USER, {
        variables: { userName }
    });
    
    return <ProfilePresenter data={data} loading={loading} />;
});

