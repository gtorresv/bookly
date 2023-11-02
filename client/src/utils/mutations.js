import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
        token
        user {
            _id
            email
            password
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password)
            
    }
`;

export const SAVE_BOOK = gql`

`;

export const REMOVE_BOOK = gql`

`;