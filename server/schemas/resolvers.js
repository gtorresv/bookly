const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
  Query: {
    // user: async (parent, { _id, username }) => {
    //   return User.findOne({ username });
    // },
    me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id });
        }
        throw AuthenticationError;
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, email, password }) => {
      const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
      if (!user) {
        return new Error({ message: "Can't find this user" });
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        return new Error({ message: 'Wrong password!' });
      }
      const token = signToken(user);
      return { token, user };
    },

  saveBook: async (parent, {bookInput}, context) => {
    if(context.user) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: bookInput } },
            { new: true, runValidators: true }
        );
        return updatedUser
    }
    throw new Error({ message: 'Not logged in!'});
  }, 
    removeBook: async (parent, {bookId}, context) => {
      if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: { bookId: bookId } } },
              { new: true }
          );
          return updatedUser  
      }
      return new Error({ message: 'Not logged in!' });
    }
  }
};

module.exports = resolvers;