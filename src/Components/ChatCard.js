import React from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";
import Avatar from "./Avatar";
import FatText from './FatText';
import TimeIapse from "./TimeIapse";

const Card = styled(Link)`
    color: inherit;
    display: flex;
    flex-direction: row;
    padding: 15px;
    width: 100%;
    cursor: pointer;
    user-select: none
    &:hover {
        background-color: ${props => props.theme.bgColor}
    }
`;

const CardAvatar = styled(Avatar)``;

const CardMiddle = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    padding: 0 15px;
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

const ChatCard = ({ id, participants, messages, me }) => {
    participants = participants.filter(participant => participant.id !== me.id);
    const avatar = participants[0].avatar;
    const userName = participants[0].userName;
    // 마지막 메시지 텍스트
    const mesgeIen = messages.length;
    const lastArray = mesgeIen - 1;
    const lastMeg = messages[lastArray].text;
    const lastCreatedAt = messages[lastArray].createdAt;
    // 마지막 메시지 시간
    const lastTime = messages[lastArray].createdAt;
    console.log(lastTime);

    return (
        <Card to={`/chat/${id}`}>
            <CardAvatar size={"md"} url={avatar} />
            <CardMiddle>
                <FatText text={userName} />
                <Message>{lastMeg}</Message>
            </CardMiddle>
            <CardLast>
                <TimeForm>
                    <TimeIapse createAt={lastCreatedAt} />
                </TimeForm>
                <ChatCount>20</ChatCount>
            </CardLast>
        </Card>
    );
};

ChatCard.propTypes = {
};

export default ChatCard;