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
