import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { Link } from "react-router-dom";
import { Send } from "../../Components/Icons";
import Loader from "../../Components/Loader";
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
    &:disabled {
        background-color: #fff;
    }
`;

const SendButton = styled.span`
    margin-right: 10px;
    border:none;
    outline: none;
    cursor: pointer;
`;

export default ({ 
    data,
    loading,
    sendLoading,
    newMessage,
    onKeyPress,
    onSubmit,
    chatLocation
}) => {
    if(loading === true){
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    }else if(!loading && data && data.seeRoom){
        const me = data.me.id;
        const { messages } = data.seeRoom;
        const { participants } = data.seeRoom;
        const toUser = participants.filter(participant => participant.id !== me);
        const toUserName =  toUser[0].userName;
        const toUserAvatar =  toUser[0].avatar;

        return (
            <Wrapper>
                <Helmet>
                    <title>ChatRoom | Prismagram</title>
                </Helmet>
                <ChatWrapper>
                    <ChatTop>
                        <CardAvatar size={"sm"} url={toUserAvatar} />
                        <CardLink to={`/${toUserName}`}>
                            <FatText text={toUserName} />
                        </CardLink>
                    </ChatTop>
                    <ChatContents>
                        <div ref={chatLocation}>
                            {messages.length === 0 ? "" : (
                                messages.map(message =>
                                    (message.from.id !== me) ? (
                                        <MessageContainer key={message.id} >
                                            <CardAvatar size={"sm"} url={message.from.avatar} />
                                            <ColumBox>
                                                <MessageBubble bg={'#FF'}>
                                                    {message.text}
                                                </MessageBubble>
                                            </ColumBox>
                                            <TimeForm>
                                                <TimeIapse createAt={message.createdAt} />
                                            </TimeForm>
                                        </MessageContainer>
                                    ): (
                                        <MessageContainer key={message.id} style={{ justifyContent: 'flex-end' }}>
                                            <TimeForm style={{ marginRight: '3px' }}>
                                                <TimeIapse createAt={message.createdAt} />
                                            </TimeForm>   
                                            <ColumBox>
                                                <MessageBubble bg={'#FFE404'}>
                                                    {message.text}
                                                </MessageBubble>
                                            </ColumBox>
                                        </MessageContainer>
                                    )
                                )
                            )}
                        </div>
                    </ChatContents>
                    <ChatLast>
                        <Textarea 
                            value={newMessage.value} 
                            onChange={newMessage.onChange} 
                            onKeyPress={onKeyPress}
                            disabled={sendLoading}
                        />
                        <SendButton onClick={onSubmit}>
                            {sendLoading? (
                                <Send color="#3897f0" />    
                            ) : (
                                <Send />    
                            )}
                        </SendButton>
                    </ChatLast>
                </ChatWrapper>
            </Wrapper>
        );
    }
};