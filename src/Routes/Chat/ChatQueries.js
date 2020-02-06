import { gql } from '@apollo/client';

export const ROOMS_QUERY = gql`
    {
        seeRooms {
            id
            lastMessage
            lastMsgTime
            unReadMsgCounter
            participants {
                id
                userName
                avatar
            }
            messages {
                id
                text
                createdAt
            }
        }
        me {
            id
        }
    }
`;

export const READCOUNT_MESSAGE = gql`
    mutation readcountMessage($roomId: String!){
        readcountMessage(roomId: $roomId)
    }
`;

export const CREATE_ROOM = gql`
    mutation createRoom($toId: String!){
        createRoom(toId:$toId){
            id
        }
    }
`;
