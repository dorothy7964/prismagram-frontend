import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import moment from "moment";
import TextareaAutosize from "react-textarea-autosize";
import { Link } from "react-router-dom";
import { Send } from "../../Components/Icons";
import Avatar from "../../Components/Avatar";
import FatText from '../../Components/FatText';
import TimeIapse from "../../Components/TimeIapse";


const Wrapper = styled.div`
    min-height: 70vh;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const ChatWrapper = styled.div`
    ${props => props.theme.whiteBox};
`;

const ChatTop = styled.div`
    ${props => props.theme.whiteBox_bottom};
    display: flex;
    align-items: center;
    width: 450px;
    padding: 20px;
`;

const CardAvatar = styled(Avatar)``;

const CardLink = styled(Link)`
    color: inherit;
    margin-left: 10px;
    width: 350px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const ChatContents = styled.div`
    ${props => props.theme.whiteBox_bottom};
    padding: 20px;
    width: 450px;
    height: 380px;
    overflow-y: scroll;
`;

const MessageContainer  = styled.div`
    display:flex;
    flex-direction: row;
    margin-bottom: 5px;
`;

const ColumBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
`;

const MessageBubble = styled.div`
    background-color: ${props => props.bg} !important;
    ${props => props.theme.whiteBox};
    padding: 7px 5px;
    font-size:12px;
    max-width: 300px;
`;

const TimeForm = styled.div`
    display: inline-block;
    font-weight: 400;
    opacity: 0.5;
    font-size: 12px;
    padding-left: 5px;
`;

const ChatLast = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const Textarea = styled(TextareaAutosize)`
    border: none;
    width: 100%;
    resize: none;
    font-size: 14px;
    &:focus {
        outline: none;
    }
`;

const SendButton = styled.span`
    margin-right: 10px;
    border:none;
    outline: none;
    cursor: pointer;
`;

export default () => (
    <Wrapper>
        <Helmet>
            <title>Chat | Prismagram</title>
        </Helmet>
        <ChatWrapper>
            <ChatTop>
                <CardAvatar size={"sm"} url="https://t1.daumcdn.net/qna/image/1542632018000000528" />
                <CardLink to={`/Hyuna`}>
                    <FatText text="유저이름" />
                </CardLink>
            </ChatTop>
            <ChatContents>
                <MessageContainer>
                    <CardAvatar size={"sm"} url="https://t1.daumcdn.net/qna/image/1542632018000000528" />
                    <ColumBox>
                        <MessageBubble bg={'#FF'}>
                            메세지 내용
                        </MessageBubble>
                    </ColumBox>
                    <TimeForm>
                        <TimeIapse createAt={moment().format("YYYY-MM-DDTHH:mm:ssZ")} />
                    </TimeForm>
                </MessageContainer>
                <MessageContainer style={{ justifyContent: 'flex-end' }}>
                    <ColumBox>
                        <MessageBubble bg={'#FFE404'}>
                            메세지 내용
                        </MessageBubble>
                    </ColumBox>
                    <TimeForm style={{ marginRight: '3px' }}>
                        <TimeIapse createAt={moment().format("YYYY-MM-DDTHH:mm:ssZ")} />
                    </TimeForm>
                </MessageContainer>
            </ChatContents>
            <ChatLast>
                <Textarea />
                <SendButton>
                    <Send color="#3897f0" />
                </SendButton>
            </ChatLast>
        </ChatWrapper>
    </Wrapper>
);