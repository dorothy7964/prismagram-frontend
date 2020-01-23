import React, { useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";
import { gql, useQuery } from '@apollo/client';
import Loader from "../Components/Loader";
import Post from "../Components/Post";

const FEED_QUERY = gql`
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

const Wrapper = styled.div`
    min-height: 80vh;
`;

const ScrollableDiv = styled(InfiniteScroll)`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* 스크롤 숨기기 */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
    }
`

const Spinners = css`
    display: block;
    margin: 0 auto;
`;

export default () => {
    const [hasMore, setHasMore] = useState(true);
    const items = 4;
    const { data, fetchMore } = useQuery(FEED_QUERY, {
        variables: {
            pageNumber: 0,
            items
        },
        fetchPolicy: "cache-and-network"
    });
    
    const onLoadMore = () => {
        console.log(data.paginateFeed.length);
        fetchMore({
            variables: {
                pageNumber: data.paginateFeed.length,
                items
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                console.log('prev', fetchMoreResult);
                if (!fetchMoreResult) {
                    console.log("false")
                    setHasMore(false);
                    return prev;
                }
                if (fetchMoreResult.paginateFeed.length < items) {
                    setHasMore(false);
                }
                return Object.assign({}, prev, {
                    paginateFeed: [...prev.paginateFeed, ...fetchMoreResult.paginateFeed]
                });
            }
        })
    }

    if (!data){
        return(
            <Wrapper>
                <Loader />
            </Wrapper>
        )
    } else if (data && data.paginateFeed){
        return (
            <Wrapper>
                <Helmet>
                    <title>Feed | Prismagram</title>
                </Helmet>
                <ScrollableDiv
                    dataLength={data.paginateFeed.length}
                    next={onLoadMore}
                    hasMore={hasMore}
                    loader={<ClipLoader
                        css={Spinners}
                        size={35}
                        color={"#c7c7c7"}
                    />}
                >
                    {data.paginateFeed.map(post => (
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
                </ScrollableDiv>
            </Wrapper>
        );
    }
};