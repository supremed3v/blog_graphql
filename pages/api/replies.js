// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function replies(req, res) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });
  const query = gql`
    mutation CreateReply(
      $reply: String!
      $id: String!
    ) {
      createReply(
        data: {
          reply: $reply
          comment: { connect: { id: $id } }
        }
      ) {
        id
      }
    }
  `;
  const result = await graphQLClient.request(query, req.body);
  return res.status(200).send(result);
}
