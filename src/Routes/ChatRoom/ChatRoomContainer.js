import React from "react";
import { useQuery } from '@apollo/client';
import { SEE_ROOM } from "./ChatRoomQueries";
import ChatRoomPresenter from "./ChatRoomPresenter";

export default ({ match: { params: { roomId } }}) => {
    const { data, loading } = useQuery(SEE_ROOM, {
        variables: {
            id: roomId
        }
    });

    return (
        <ChatRoomPresenter 
            data={data}
            loading={loading}
        />
    );
};