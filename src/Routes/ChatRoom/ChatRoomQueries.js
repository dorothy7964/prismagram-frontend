import { gql } from '@apollo/client';

export const ROOMS_QUERY = gql`
    {
        seeRooms {
            id
        }
    }
`;

export const SEE_ROOM = gql`
    query seeRoom($id:String!){
        seeRoom(id: $id){
            participants {
                id
                userName
                avatar
            }
            messages {
                id
                text
                readMessage
                createdAt
                from {
                    id
                    avatar
                    userName
                }
                to {
                    id
                }
            }
        }
        me {
            id
            userName
        }
    }
`;

export const SEND_MESSAGE = gql`
    mutation sendMessage($roomId:String, $message:String!, $toId:String) {
        sendMessage(roomId: $roomId message: $message toId: $toId) {
            id
            text
            createdAt
            from {
                id
                avatar
                userName
            }
            to {
                id
            }
            room {
                id
            }
        }
    }
`;

export const NEW_MESSAGE = gql`
    subscription newMessage($roomId: String!){
        newMessage(roomId: $roomId){
            id
            text
            readMessage
            createdAt
            from {
                id
                userName
                avatar
            }
            to {
                id
            }
            room {
                id
            }
        }
    }
`;


export const DELETE_ROOM = gql`
    mutation deleteRoom($roomId: String!){
        deleteRoom(roomId:$roomId){
            id
        }
    }
`;


