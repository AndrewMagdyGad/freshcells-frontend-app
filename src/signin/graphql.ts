import { gql } from "@apollo/client";

export const SIGN_IN = gql`
    mutation ($user: UsersPermissionsLoginInput!) {
        login(input: $user) {
            jwt
        }
    }
`;
