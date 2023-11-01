const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Number
        savedBooks: [Book]!
    }

    type Book {
        bookId: book_id
        authors: [String]!
        description: String
        title: String
        // TODO: image and link
        image: 
        link: 
    }

    type Auth {
        token: ID!
        user: User
    }
    // TODO: Query

    // TODO: Mutation

    // TODO: Auth type 
`;

module.exports = typeDefs;