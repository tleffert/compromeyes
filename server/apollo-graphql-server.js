const { ApolloServer, gql } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');


class BreachesAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseUrl = 'https://haveibeenpwned.com/api/v3/breachedaccount'
    }

    willSendRequest(request) {
        request.headers.set('user-agent', 'compromeyes');
        request.headers.set('hibp-api-key', '');
    }

    async getAccountBreaches(email) {
        console.log("HEYEHG", email);
        return this.get(`${this.baseUrl}/${email}?truncateResponse=false`);
    }
}


const typeDefs = gql`
    type Breach {
        Name: String
        Title: String
        Domain: String
        BreachDate: String
        Description: String
        PwnCount: String
        DataClasses: [String]
    }

    type Query {
        breaches(email: String): [Breach]
    }

`;

const resolvers = {
  Query: {
    breaches: async (parent, {email}, { dataSources }) => {
        let breachesData = dataSources.breachesAPI.getAccountBreaches(email);
      return breachesData;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers, dataSources: () =>{
    return {breachesAPI: new BreachesAPI()}
} });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
