import { gql } from "apollo-boost";

export const LOG_OUT = gql`
    mutation logUserOut {
        logUserOut @client
    }
`;