import { gql } from '@apollo/client';

export const SEEROOMS_QUERY = gql`
    {
        seeRooms {
            id
            participants {
                id
                userName
                avatar
            }
            messages {
                id
                text
                createdAt
                updatedAt
            }
        }
        me {
            id
        }
    }
`;

