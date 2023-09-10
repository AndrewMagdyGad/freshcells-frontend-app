import { gql } from "@apollo/client";

export const GET_USER = gql`
    query {
        user(id: 2) {
            id
            firstName
            lastName
            email
            username
        }
    }
`;
