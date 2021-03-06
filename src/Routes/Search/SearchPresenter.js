import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FatText from "../../Components/FatText"
import Loader from '../../Components/Loader';
import UserCard from '../../Components/UserCard';
import SquarePost from '../../Components/SquarePost';

const Wrapper = styled.div`
    height: 100%;
`;

const Section = styled.div`
    margin-bottom: 50px;
    display: grid;
    grid-gap: 45px;
    grid-template-columns: repeat(4, 200px);
    grid-template-rows: 200px;
    grid-auto-rows: 200px;
    button {
        margin-top: 48px;
    }
`;

const PostSection = styled(Section)`
    grid-template-columns: repeat(4, 200px);
    grid-template-rows: 200px;
    grid-auto-rows: 200px;
`;

const SearchPresenter = ({ searchTerm, loading, data }) => {
    if(searchTerm === undefined){
        return (
            <Wrapper>
                <FatText text={"Search for something"} />
            </Wrapper>
        );
    } else if(loading === true){
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    } else if(data && data.searchUser && data.searchPost){
        return(
            <Wrapper>
                <Section>
                    {data.searchUser.length === 0? (
                        <FatText text="No Users Found" />
                    ) : (
                        data.searchUser.map(user => (
                            <UserCard 
                                key={user.id}
                                id={user.id}
                                url={user.avatar}
                                userName={user.userName}
                                isFollowing={user.isFollowing}
                                isSelf={user.isSelf}
                            />
                        ))
                    )}
                </Section>
                <PostSection>
                    {data.searchPost.length === 0? (
                        <FatText text="No Posts Found" />
                    ) : (
                        data.searchPost.map(post => (
                            <SquarePost 
                                key={post.id}
                                id={post.id}
                                file={post.files[0]}
                                likeCount={post.likeCount}
                                commentCount={post.commentCount}
                            />
                        ))
                    )}
                </PostSection>
            </Wrapper>
        );
    }
};

SearchPresenter.propTypes = {
    searchTerm: PropTypes.string,
    loading: PropTypes.bool
}

export default SearchPresenter;


