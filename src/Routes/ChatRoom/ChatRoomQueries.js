import { gql } from '@apollo/client';

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

