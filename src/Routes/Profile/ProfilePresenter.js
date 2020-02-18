import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { FadeLoader } from "react-spinners";
import { css } from "@emotion/core";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import Button from "../../Components/Button";
import FollowButton from "../../Components/FollowButton";
import FatText from "../../Components/FatText";
import SquarePost from "../../Components/SquarePost";
import { Edit, Upload } from "../../Components/Icons";

const Wrapper = styled.div`
    min-height: 100vh;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 40px;
`;

const HeaderColumn = styled.div`
    position:relative;
`;

const override = css`
    position: absolute;
    top: 45%;
    left: 47%;
`;

const HiddenInput = styled.input`
    display: none;
`;

const ProfileUpload = styled.label`
    position:absolute;
    right: 0;
    bottom: 13px;
`;

const UserNameRow = styled.div`
    display: flex;
    align-items: center;
`;

const UserName = styled.span`
    font-size: 26px;
    display: block;
    margin-right: 10px;
`;

const ButtonLink = styled(Link)`
    margin-right: 10px;
`;

const Counts = styled.ul`
    display: flex;
    margin: 15px 0px;
`;

const Count = styled.li`
    font-size: 16px;
    &:not(:last-child) {
        margin-right: 10px;
    }
`;

const FullName = styled(FatText)`
    font-size: 16px;
`;

const Bio = styled.p`
    margin: 10px 0px;
`;

const Posts = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 293px);
    grid-template-rows: 293px;
    grid-auto-rows: 293px;
    grid-gap: 28px;;
`;

export default ({ data, 
    loading, 
    logOut, 
    fileLoading, 
    handleChange 
}) => {
    if(loading === true){
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    }else if(!loading && data && data.seeUser) {
        const {
            seeUser: {
                id,
                userName,
                fullName,
                isFollowing,
                isSelf,
                bio,
                avatar,
                followingCount,
                followersCount,
                postsCount,
                posts
            }
        } = data;
        return (
            <Wrapper>
                <Helmet>
                    <title>{userName} | Prismagram</title>
                </Helmet>
                <Header>
                    <HeaderColumn>
                        <Avatar size="lg" url={avatar} />
                        {isSelf && (
                            <ProfileUpload htmlFor="fileElem">
                                <Upload size="30" />
                            </ProfileUpload>
                        )}
                        {fileLoading && 
                            <FadeLoader
                                css={override}
                                size={35}
                                color={"#003569"}
                            />
                        }
                        <HiddenInput 
                            type="file" 
                            id="fileElem" 
                            accept="image/*" 
                            onChange={handleChange} 
                            multiple
                        />
                    </HeaderColumn>
                    <HeaderColumn>
                        <UserNameRow>
                            <UserName>{userName}</UserName>{" "}
                            {isSelf? (
                                <React.Fragment>
                                    <ButtonLink to={`/editProfile/${userName}`}>
                                        <Edit />
                                    </ButtonLink>
                                    <Button onClick={logOut} text="Log Out" />
                                </React.Fragment>
                            ) : (
                                <FollowButton id={id} isFollowing={isFollowing} />
                            )}
                        </UserNameRow>
                        <Counts>
                            <Count>
                                <FatText text={String(postsCount)} /> posts
                            </Count>
                            <Count>
                                <FatText text={String(followersCount)} /> followers
                            </Count>
                            <Count>
                                <FatText text={String(followingCount)} /> following
                            </Count>
                        </Counts>
                        <FullName text={fullName} />
                        <Bio>{bio}</Bio>
                    </HeaderColumn>
                </Header>
                <Posts>
                    {posts &&
                        posts.map(post => (
                            <SquarePost 
                                key={post.id}
                                id={post.id}
                                likeCount={post.likeCount}
                                commentCount={post.commentCount}
                                file={post.files[0]}
                                filesCount={post.files}
                            />
                    ))}
                </Posts>
            </Wrapper>
        );
    }
};