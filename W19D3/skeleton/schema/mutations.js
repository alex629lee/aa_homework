const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;
const mongoose = require("mongoose");
const UserType = require("./user_type");
const AuthService = require("../services/auth");

const User = mongoose.model("user");

const validateInputs = require("../validation/register");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // this will be the name of this mutation
    register: {
      // creating a User type
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, data) {
        // // step 1:
        // try {
        //   const { message, isValid } = validateInputs(data);
        //   if (!isValid) {
        //     throw new Error(message);
        //   }
        // } catch (err) {
        //   throw err;
        // }

        return AuthService.register(data);
      }
    }
  }
});

module.exports = mutation;
