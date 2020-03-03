import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import ChatCard from "../../Components/ChatCard";
import SearchCard from "../../Components/SearchCard";
import Input from "../../Components/Input";

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

const Form = styled.form`
    text-align: center;
    padding: 20px 0;
`;

const SearchInput = styled(Input)`
    background-color: ${props => props.theme.bgColor};
    padding: 5px;
    font-size: 14px;
    border-radius: 3px;
    height: auto;
    text-align: center;
    width: 95%;
    &::placeholder {
        opacity: 0.8;
        font-weight: 200;
    }
`;

export default ({ 
    data, 
    loading, 
    refetch,
    subscribeToMore,
    handleEnterRoom,
    searchTerm,
    onSubmit,
    handleCreateRoom,
    handleDeleteRoom
}) => {
    if(loading === true){
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    } else if(!loading && data && data.seeRooms) {
        return (
            <Wrapper>
                <Helmet>
                    <title>Chat | Prismagram</title>
                </Helmet>
                <Chat>
                    <Form onSubmit={onSubmit}>
                        <SearchInput
                            value={searchTerm.value}
                            onChange={searchTerm.onChange}
                            placeholder="채팅할 유저 검색"
                        />
                    </Form>    
                    <SearchCard 
                        term={searchTerm}
                        handleCreateRoom={handleCreateRoom}
                    />
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
                            handleDeleteRoom={handleDeleteRoom}
                            refetch={refetch}
                            subscribeToMore={subscribeToMore}
                        />
                    ))}
                </Chat>
            </Wrapper>
        );
    };
};