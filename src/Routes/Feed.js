import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { gql, useQuery } from '@apollo/client';
import Loader from "../Components/Loader";
import Post from "../Components/Post";

const FEED_QUERY = gql`
    {
        seeFeed {
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

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 80vh;
`;

export default () => {
    const { data, loading } = useQuery(FEED_QUERY,{
        fetchPolicy: "cache-and-network"
    });
    return (
        <Wrapper>
            <Helmet>
                <title>Feed | Prismagram</title>
            </Helmet>
            {loading && <Loader />}
            {!loading &&
              data &&
              data.seeFeed &&
              data.seeFeed.map(post => (
                <Post 
                    key={post.id}
                    id={post.id}
                    location={post.location}
                    caption={post.caption}
                    user={post.user}
                    files={post.files}
                    isLiked={post.isLiked}
                    likeCount={post.likeCount}
                    commentCount={post.commentCount}
                    comments={post.comments}
                    createdAt={post.createdAt}
                />
            ))}
        </Wrapper>
    );
};