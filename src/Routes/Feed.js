import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";

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
            comments {
                id
                text
            }
            isLiked
            likeCount
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
    const { data, loading } = useQuery(FEED_QUERY);
    if(data){console.log(data.seeFeed)};
    return (
        <Wrapper>
            <Helmet>
                <title>Feed | Prismagram</title>
            </Helmet>
            {loading && <Loader />}
            {!loading &&
              data &&
              data.seeFeed &&
              "we have photos"
             }
            
        </Wrapper>
    );
};