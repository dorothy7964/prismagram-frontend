import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import moment from "moment";
import { 
    HeartFull, HeartEmpty, 
    Comment as CommentIcon, 
    Next, Prev,
} from "../Icons";
import Avatar from "../Avatar";
import FatText from "../FatText";
import TimeIapse from "../TimeIapse";

const Post = styled.div`
    ${props => props.theme.whiteBox};
    max-width: 800px;
    width: 100%;
    height: 600px;
    display: flex;
    flex-direction: row;
    user-select: none;
    a {
        color: inherit;
    }
`;

const Files = styled.div`
    width: 55%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-shrink: 0;
`;

const File = styled.div`
    width: 100%;
    height:100%;
    position: absolute;
    top: 0;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center;
    opacity: ${props => (props.showing? 1 : 0)};
    transition: opacity 0.5s linear;
`;

const SlideButton = styled.div`
    cursor: pointer;
    position: absolute;
    top: 50%
    ${props => (props.type === "prev" ? "left: 10px" : "right: 10px")};
    opacity: 0.7;
    svg {
        color: red;
    }
`;

const Meta = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
`;

const Header = styled.header`
    padding: 15px;
    display: flex;
    align-items: center;
    border-bottom: ${props => props.theme.boxBorder};
`;

const UserColumn = styled.div`
    margin-left: 10px;
`;

const Location = styled.span`
    display: block;
    margin-top: 5px;
    font-size: 12px;
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
    padding: 15px;
    margin-bottom: 10px;
    border-bottom: ${props => props.theme.boxBorder};
    border-top: ${props => props.theme.boxBorder};
`;

const Timestamp = styled.span`
    font-weight: 400;
    text-transform: uppercase;
    opacity: 0.5;
    display: block;
    font-size: 12px;
    margin-top: 10px;
`;

const CommentsWrapper = styled.div`
    padding: 15px;
    flex: 1;
`;

const Caption = styled.div`
    margin: 10px 0;
`;

const Comments = styled.ul`
    word-wrap: break-word;
    margin-top: 10px;
    padding-right: 17px;
    line-height: 17px;
    height: 300px;
    overflow-x: hidden;
    overflow-y: auto;
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

const Textarea = styled(TextareaAutosize)`
    padding: 15px;
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
    location,
    caption,
    user: { userName, avatar },
    files,
    currentItem,
    slideNext,
    slidePrev,
    isLiked,
    toggleLike,
    comments,
    newComment,
    selfComments,
    onKeyPress,
    createdAt,
    loading
}) => (
    <Post>
        <Files>
            {files &&
                files.map((file, index) => (
                <File key={file.id} src={file.url} showing={index === currentItem} />
            ))}
            {files && files.length > 1 && (
                <React.Fragment>
                    <SlideButton type="prev" onClick={slidePrev}>
                        <Prev />
                    </SlideButton>
                    <SlideButton type="next" onClick={slideNext}>
                        <Next />
                    </SlideButton>
                </React.Fragment>
            )}
        </Files>
        <Meta>
            <Header>
                <Avatar size="sm" url={avatar} /> 
                <UserColumn>
                    <Link to={`/${userName}`}>
                        <FatText text={userName} />
                    </Link>
                    <Location>{location}</Location>
                </UserColumn>
            </Header>
            <CommentsWrapper>
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
            </CommentsWrapper>
            <Buttons>
                <Button onClick={toggleLike}>
                    {isLiked? <HeartFull /> : <HeartEmpty />}
                </Button>
                <Button>
                    <CommentIcon />
                </Button>
                <Timestamp>{ moment(createdAt).format("YYYY.MM.DD HH:MM") }</Timestamp>
            </Buttons>
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