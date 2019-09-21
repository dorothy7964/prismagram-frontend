import React from "react";
import styled from "styled-components";
import { HeartFull, HeartEmpty, Comment as CommentIcon } from "../Icons";
import Avatar from "../Avatar";
import FatText from "../FatText";

const Post = styled.div`
    ${props => props.theme.whiteBox};
    width: 100%;
    max-width: 600px;
    user-select: none;
    margin-bottom: 25px;
    a {
        color: inherit;
    }
`;

const Header = styled.header`
    padding: 15px;
    display: flex;
    align-items: center;
`;

const UserColumn = styled.div`
    margin-left: 10px;
`;

const Location = styled.span`
    display: block;
    margin-top: 5px;
    font-size: 12px;
`;

const Files = styled.div`
    position: relative;
    padding-bottom: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-shrink: 0;
`;

const File = styled.div`
    max-width: 100%;
    width: 100%;
    height: 600px;
    position: absolute;
    top: 0;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center;
`;

const Meta = styled.div`
    padding: 15px;
`;

const Button = styled.span`
    cursor: pointer;
`;

const Buttons = styled.div`
    ${Button} {
        &:first-child {
            margin-right: 10px;
        }
    }
    margin-bottom: 10px;
`;

const Caption = styled.div`
    margin: 10px 0px;
`;

const Comments = styled.ul`
    margin-top: 10px;
`;

const Comment = styled.li`
    margin-bottom: 7px;
    span {
        margin-right: 5px;
    }
`;

const Timestamp = styled.span`
    font-weight: 400;
    text-transform: uppercase;
    opacity: 0.5;
    display: block;
    font-size: 12px;
    margin: 10px 0px;
    padding-bottom: 10px;
    border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
`;

const Textarea = styled.div`
    border: none;
    width: 100%;
    resize: none;
    font-size: 14px;
    &:focus {
        outline: none;
    }
`;

export default ({
    location,
    caption,
    user: { userName, avatar },
    files,
    isLiked,
    likeCount,
    comments,
    createdAt
}) => (
    <Post>
        <Header>
            <Avatar size="sm" url={avatar} /> 
            <UserColumn>
                <FatText text={userName} />
                <Location>{location}</Location>
            </UserColumn>
        </Header>
        <Files>
            {files &&
                files.map((file) => (
                <File key={file.id} src={file.url} />
            ))}
        </Files>
        <Meta>
            <Buttons>
                <Button>
                    {isLiked? <HeartFull /> : <HeartEmpty />}
                </Button>
                <Button>
                    <CommentIcon />
                </Button>
            </Buttons>
            <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
            <Caption>
                <FatText text={userName} /> {caption}
            </Caption>
            <Comments>
                <Comment>
                    Comment
                </Comment>
                <Comment>
                    Comment
                </Comment>
                <Comment>
                    Comment
                </Comment>
            </Comments>
            <Timestamp>{createdAt}</Timestamp>
            <Textarea>
                Textarea
            </Textarea>
        </Meta>
    </Post>
);