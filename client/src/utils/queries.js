import { gql } from '@apollo/client';

// Add the GET_ME query to execute the me query set up
export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`