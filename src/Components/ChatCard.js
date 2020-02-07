import React from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import Avatar from "./Avatar";
import FatText from './FatText';
import TimeIapse from "./TimeIapse";
import { Delete } from "./Icons";


const Card = styled.button`
    color: inherit;
    display: flex;
    flex-direction: row;
    padding: 15px;
    width: 100%;
    border: 0;
    outline: none;
    cursor: pointer;
    user-select: none
    background-color: #fff;
    &:hover {
        background-color: ${props => props.theme.bgColor}
        span {
            display: block;
        }
    }
`;

const CardAvatar = styled(Avatar)``;

const CardMiddle = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    padding: 0 10px;
`;

const Message = styled.div`
    margin-top: 10px;
    width: 260px;
    color: inherit;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
`;

const CardLast = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const TimeForm = styled.div`
    display: inline-block;
    font-weight: 400;
    opacity: 0.5;
    font-size: 12px;
    padding-left: 5px;
`;

const ChatCount = styled.div`
    margin-top: 10px;
    padding: 5px;
    border-radius: 50%;
    background: ${props => props.theme.bgColor};
    color: ${props => props.theme.blueColor};
    font-weight:bold;
`;

const DeleteChat = styled.span`
    display: none;
    flex: 1;
    cursor: pointer;
    margin-left: 5px;
`;

const ChatCard = ({
    id, 
    participants, 
    unReadMsgCounter, 
    lastMessage,
    lastMsgTime, 
    me,
    handleEnterRoom,
    handleDeleteRoom
}) => {
    participants = participants.filter(participant => participant.id !== me.id);
    const avatar = participants[0].avatar;
    const userName = participants[0].userName;
    
    return (
        <Card>
            <CardAvatar size={"md"} url={avatar} />
            <CardMiddle onClick={() => handleEnterRoom(id)}>
                <FatText text={userName} />
                <Message>{lastMessage}</Message>
            </CardMiddle>
            <CardLast>
                <TimeForm>
                    <TimeIapse createAt={lastMsgTime} />
                </TimeForm>
                <ChatCount>
                    {unReadMsgCounter === 0 ? "" : unReadMsgCounter }
                </ChatCount>
            </CardLast>
            <DeleteChat onClick={() => handleDeleteRoom(id)}>
                <Delete />
            </DeleteChat>
        </Card>
    );
};

ChatCard.propTypes = {
    id: PropTypes.string.isRequired,
    participants: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            avatar: PropTypes.string,
            userName: PropTypes.string.isRequired
        })
    ).isRequired,
    unReadMsgCounter: PropTypes.number.isRequired,
    lastMessage: PropTypes.string,
    lastMsgTime: PropTypes.string,
    me: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired
};

export default ChatCard;