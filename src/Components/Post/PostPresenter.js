import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import moment from "moment";
import { HeartFull, HeartEmpty, Comment as CommentIcon, Send } from "../Icons";
import Avatar from "../Avatar";
import FatText from "../FatText";
import TimeIapse from "../TimeIapse";

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
    opacity: ${props => (props.showing? 1 : 0)};
    transition: opacity 0.5s linear;
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

const DetailButton = styled(Button)`
    display: block;
    margin-top: 10px;
    color: ${props => props.theme.darkGreyColor};
`;

const Caption = styled.div`
    margin: 10px 0px;
`;

const Comments = styled.ul`
    word-wrap: break-word;
    margin-top: 10px;
    line-height: 17px;
    height: 52px
    overflow: hidden;
`;

const Comment = styled.li`
    margin-bottom: 7px;
    span {
        margin-right: 5px;
    }
`;

const TimeForm = styled.div`
    display: inline-block;
    font-weight: 400;
    opacity: 0.5;
    font-size: 12px;
    padding-left: 5px;
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

const Textarea = styled(TextareaAutosize)`
    border: none;
    width: 100%;
    resize: none;
    font-size: 14px;
    &:focus {
        outline: none;
    }
    &:disabled {
        background-color: #fff;
    }
`;

export default ({
    id,
    location,
    caption,
    user: { userName, avatar },
    files,
    currentItem,
    isLiked,
    likeCount,
    commentCount,
    toggleLike,
    comments,
    newComment,
    selfComments,
    onKeyPress,
    createdAt,
    loading
}) => (
    <Post>
        <Header>
            <Avatar size="sm" url={avatar} /> 
            <UserColumn>
                <Link to={`/${userName}`}>
                    <FatText text={userName} />
                </Link>
                <Location>{location}</Location>
            </UserColumn>
        </Header>
        <Files>
            {files &&
                files.map((file, index) => (
                <File key={file.id} src={file.url} showing={index === currentItem} />
            ))}
        </Files>
        <Meta>
            <Buttons>
                <Button onClick={toggleLike}>
                    {isLiked? <HeartFull /> : <HeartEmpty />}
                </Button>
                <Button>
                    <Link to={`/FullFeed/${id}`}>
                        <CommentIcon />
                    </Link>
                </Button>
            </Buttons>
            <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
            <DetailButton>
                <Link to={`/FullFeed/${id}`}>
                    {commentCount > 2 ? `댓글 ${commentCount}개 모두 보기` : ""}
                </Link>
            </DetailButton>
            <Caption>
                <FatText text={userName} /> {caption}
            </Caption>
            {comments && (
                <Comments>
                    {selfComments.map(comment => (
                        <Comment key={comment.id}>
                            <FatText text={comment.user.userName} />
                            {comment.text}
                            <TimeForm>
                                <TimeIapse createAt={moment().format("YYYY-MM-DDTHH:mm:ssZ")} />
                            </TimeForm>
                        </Comment>
                    ))}
                    {comments.map(comment => (
                        <Comment key={comment.id}>
                            <FatText text={comment.user.userName} />
                            {comment.text}
                            <TimeForm>
                                <TimeIapse createAt={comment.createdAt} />
                            </TimeForm>
                        </Comment>
                    ))}
                </Comments>
            )}
            <Timestamp>{ moment(createdAt).format("YYYY.MM.DD HH:MM") }</Timestamp>
            <Textarea 
                placeholder={loading ? "Writing comment" : "Please write a comment"}
                value={newComment.value} 
                onChange={newComment.onChange} 
                onKeyPress={onKeyPress}
                disabled={loading}
            />
        </Meta>
    </Post>
);