import React, { useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { ROOMS_QUERY, READCOUNT_MESSAGE, CREATE_ROOM } from "./ChatQueries";
import ChatPresenter from "./ChatPresenter";
import useInput from "../../Hooks/useInput";

export default ({ history }) => {
    const search = useInput("");
    const { data, loading, refetch } = useQuery(ROOMS_QUERY);
    const [readcountMsgMutation] = useMutation(READCOUNT_MESSAGE);
    const [createRoomMutaion] = useMutation(CREATE_ROOM,{
        refetchQueries:() => [{
            query: ROOMS_QUERY,
            variables:{}
        }]
    });

    const onSearchSubmit = (e) =>{
        e.preventDefault();
    }

    const handleCreateRoom =async (toId)=>{
        try {
            const {
                data: { createRoom }
            } = await createRoomMutaion({
                variables:{
                    toId
                }
            });
            history.push(`/chat/${createRoom.id}`)
        } catch(e){
            console.log(e);
        }
    }
    
    const handleEnterRoom = async (id)=>{
        try {
            const { data } = await readcountMsgMutation({
                refetchQueries:() => [{
                    query: ROOMS_QUERY,

                }],
                variables: {
                    roomId: id
                }
            }); 
            if(data.readcountMessage){
                history.push(`/chat/${id}`);
            }

        } catch(e) {
            console.log(e);
            console.log("ChatContainer");
        }
    }

    useEffect(() => {
        refetch();
    }, []);

    return (
        <ChatPresenter
            data={data} 
            loading={loading} 
            handleEnterRoom={handleEnterRoom}
            searchTerm={search}
            onSubmit={onSearchSubmit}
            handleCreateRoom={handleCreateRoom}
        />
    );

};