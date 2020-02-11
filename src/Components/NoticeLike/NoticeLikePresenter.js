import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Logo, HeartEmpty } from "../Icons";
import Avatar from "../Avatar";
import FatText from '../FatText';

const Container = styled.div`
    position: relative;
`;

const LoaderContainer = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const NotifiWrapper = styled.div`
    position: absolute;
    top: 40px;
    right: 0px;
    width: 319px;
    height: 270px;
	background: #fff;
    ${props => props.theme.whiteBox}
    &::after, &::before {
        bottom: 100%;
        left: 50%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }
    &::after {
        left: 299px;
        border-color: rgba(0, 0, 0, 0);
        border-bottom-color: #fff;
        border-width: 9px;
        margin-left: -9px;
    }
    &::before {
        left: 299px;
        border-color: rgba(230, 230, 230, 0);
        border-bottom-color: ${props => props.theme.borderColor}
        border-width: 10px;
        margin-left: -10px;
    }
`;

const NotiScroll = styled.div`
    overflow-y: scroll;
    height: inherit;
`;

const NotiLink = styled(Link)`
    ${props => props.theme.whiteBox_bottom}
    display: inline-block;
    width: 100%;
    padding: 10px 0;
`;

const NotifiContainer = styled.div`
    ${props => props.theme.whiteBox_bottom}
    display: flex;
    align-items: center;
    width:100%;
    height: 45px;
    padding: 10px;
`;

const NotiAvatar = styled(Avatar)`
  
`;

const NotiFatText = styled(FatText)`
    margin-left: 10px;
    width: 100%;
    text-align: start;
    overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
	word-wrap:break-word; 
	word-break:break-all;
`;

export default ({ 
    data,
    loading,
    toggleButton, 
    handleClick
}) => {
    if(loading === true){
        return (
            <React.Fragment>
                {toggleButton === false? 
                    (
                        <Container>
                            <HeartEmpty />
                        </Container>
                    ) : (
                        <Container>
                            <HeartEmpty />
                            <NotifiWrapper>
                                <LoaderContainer>
                                    <Logo size={36} />
                                </LoaderContainer>
                            </NotifiWrapper>
                        </Container>
                    )}
            </React.Fragment>
        );
    } else if(!loading && data && data.seeLike) {
        return (
            <Container>
                <HeartEmpty />
                {toggleButton === false? 
                    "" : (
                            <NotifiWrapper>
                                <NotiScroll>
                                    <NotiLink to="/Notifications">
                                        <FatText text="팔로우 유저 보기" />
                                    </NotiLink>
                                        {data.seeLike.map(likeUser => (
                                            likeUser.readCheck === false &&
                                             <NotifiContainer 
                                                onClick={() => handleClick(
                                                    likeUser.id,
                                                    likeUser.post.id
                                                )} 
                                                key={likeUser.user.id}
                                            >
                                                <NotiAvatar size={"sm"} url={likeUser.user.avatar} />
                                                <NotiFatText 
                                                    text={`${likeUser.user.userName}님이 좋아요를 눌렀습니다.`} 
                                                />
                                            </NotifiContainer>
                                        ))}
                                </NotiScroll>
                            </NotifiWrapper>
                        )
                }
            </Container>
        );
    }
};