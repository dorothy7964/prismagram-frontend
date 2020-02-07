import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from '@apollo/client';
import { READCOUNT_MESSAGE } from "../Chat/ChatQueries";
import { SEE_ROOM, SEND_MESSAGE, NEW_MESSAGE } from "./ChatRoomQueries";
import ChatRoomPresenter from "./ChatRoomPresenter";
import useInput from "../../Hooks/useInput";

export default ({ match: { params: { roomId } }}) => {
    const messageInput = useInput("");
    const chatLocation = useRef(null);
    const [sendLoading, setSendLoading] = useState(false);
    const { data, loading, subscribeToMore } = useQuery(SEE_ROOM, {
        variables: {
            id: roomId
        }
    });
    const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
        variables: {
            message: messageInput.value,
            roomId: roomId
        }
    });
    const [readcountMsgMutation] = useMutation(READCOUNT_MESSAGE, {
        refetchQueries:() => [{
            query: SEE_ROOM,
            variables:{
                id: roomId
            }
        }],
        variables: {
            roomId: roomId
        }
    });
    const more = () => subscribeToMore({
        document: NEW_MESSAGE,
        variables: {
            roomId: roomId
        },
        updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newMessage = subscriptionData.data.newMessage;
            if(newMessage.to.id === prev.me.id ){
                toast.success(`${newMessage.from.username}:${newMessage.text}`)
            }
            readcountMsgMutation();
            if (!prev.seeRoom.messages.find((msg) => msg.id === newMessage.id)) {
                return Object.assign({}, prev, {
                    seeRoom: Object.assign({}, prev.seeRoom, {
                        messages: [...prev.seeRoom.messages, newMessage],
                    })
                });
            } else {
                return prev;
            }
        }
    });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            setSendLoading(true);
            messageInput.setValue("");
            await sendMessageMutation();
            await readcountMsgMutation();
        } catch {
            console.log(e);
            toast.error("Cant send messageInput");
        } finally {
            setSendLoading(false);
        }
    };

    const onKeyPress = async e => {
        const { which } = e;
        if(which === 13){
            e.preventDefault();
            try {
                setSendLoading(true);
                messageInput.setValue("");
                await sendMessageMutation();
                await readcountMsgMutation();
            } catch {
                console.log(e);
            } finally {
                setSendLoading(false);
            }
       }
    };

    const scrollBottom = () => {
        chatLocation.current.scrollIntoView({ block: 'end', behavior: 'smooth' })
    }

    useEffect(() => {
        more();
    }, []);

    useEffect(()=>{
        if (!loading) {
            scrollBottom();
        }
    }, [data])

    return (
        <ChatRoomPresenter 
            data={data}
            loading={loading}
            sendLoading={sendLoading}
            newMessage={messageInput}
            onKeyPress={onKeyPress}
            onSubmit={onSubmit}
            chatLocation={chatLocation}
        />
    );
};
