import React from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";
import Avatar from "./Avatar";
import FatText from './FatText';
import TimeIapse from "./TimeIapse";

const Card = styled.button`
    ${props => props.theme.whiteBox_bottom}
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 15px;
    width: 100%;
    cursor: pointer;
    border: 0;
    outline: none;
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

const CardLink = styled(Link)`
    color: inherit;
    margin-bottom: 10px;
`;

const Message = styled.div`
    width: 260px;
    color: inherit;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
`;

const CardLast = styled.div`
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

const ChatCard = () => {
    return (
        <Card>
            <CardAvatar size={"md"} url="https://t1.daumcdn.net/qna/image/1542632018000000528" />
            <CardMiddle>
                <CardLink to={`/Hyuna`}>
                    <FatText text="유저이름" />
                </CardLink>
                <Message>대화내용</Message>
            </CardMiddle>
            <CardLast>
                <TimeForm>
                    <TimeIapse createAt={moment().format("YYYY-MM-DDTHH:mm:ssZ")} />
                </TimeForm>
                <ChatCount>20</ChatCount>
            </CardLast>
        </Card>
    );
};

ChatCard.propTypes = {
};

export default ChatCard;