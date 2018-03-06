import Article from "../services/mongooseService/Article";

const typeDefs = `
    type Query { 
      articlesCount: Int
      articlesById(_id: ID!): Article 
    }
    type Article {
      title: String
      content: String
    }
  `;

const resolvers =  {
  Query: {
    articlesCount: async () => {
      return await Article.count()
    },
    articlesById: async (root, { _id }) => {
      console.log('_id', _id);
      const article = await Article.findOne({ _id });
      console.log('article', article);
      return article
    }
  }
};

export { typeDefs, resolvers };