import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import ChatCard from "../../Components/ChatCard";

const Wrapper = styled.div`
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Chat = styled.div`
    ${props => props.theme.whiteBox};    
    width: 450px;
    height: 500px;
    overflow-y: scroll;
`;

export default ({ data, loading, handleEnterRoom }) => {
    if(loading === true){
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    }else if(!loading && data && data.seeRooms) {
        return (
            <Wrapper>
                <Helmet>
                    <title>Chat | Prismagram</title>
                </Helmet>
                <Chat>
                    {data.seeRooms.map(room => (
                        <ChatCard 
                            key={room.id}
                            id={room.id}
                            participants={room.participants}
                            lastMessage={room.lastMessage}
                            lastMsgTime={room.lastMsgTime}
                            unReadMsgCounter={room.unReadMsgCounter}
                            me={data.me}
                            handleEnterRoom={handleEnterRoom}
                        />
                    ))}
                </Chat>
            </Wrapper>
        );
    };
};