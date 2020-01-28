import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import ChatCard from "../../Components/ChatCard";

const Wrapper = styled.div`
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Chat = styled.div`
    width: 450px;
    height: 500px;
    overflow-y: scroll;
`;

export default () => (
    <Wrapper>
        <Helmet>
            <title>Chat | Prismagram</title>
        </Helmet>
        <Chat>
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
        </Chat>
    </Wrapper>
);