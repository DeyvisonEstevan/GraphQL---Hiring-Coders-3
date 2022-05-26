import { gql } from 'apollo-server-express';
import createRepository from '../../io/Database/createRepository';
import { ListSortmentEnum } from '../List/List';

const clientRepository = createRepository('client');
export const typeDefs = gql`
    type Client implements Node{
        id: ID!
        name: String!
        email: String!
        disabled: Boolean!
    }

    type ClientList implements List {
        items: [Client!]!
        totalItems: Int!
    }

    input ClientListOptions {
        take: Int
        skip: Int
        sort: ListSort
    }

    extend type Query {
        client(id: ID!): Client,
        clients(options: ClientListOptions): ClientList
    }
`;

export const resolvers = {
    Query: {
        client: async (_, { id }) => {
            const clients = await clientRepository.read();
            console.log(clients);
            return clients.find((client) => client.id == id)
        },
        clients: async (_, args) => {
            const {
                skip = 0,
                take = 10,
                sort
            } = args.options || {};

            /**
             * @type {Array.<*>}
             */
            const clients = await clientRepository.read();

            if(sort) {
                clients.sort((clientA, clientB) => {
                    if(!['name', 'email', 'disables'].includes(sort.sorter))
                    throw new Error(`Cannot sort by field "${sort.sorter}".`);

                    const fieldA = clientA[sert.sorter];
                    const fieldB = clientB[sert.sorter];

                    if (typeof fieldA == 'string') {
                        if (sort.sortment == ListSortmentEnum.ASC)
                            return fieldA.localeCompare(fieldB);
                        else return fieldB.localeCompare(fieldA);
                    }

                    if (sort.sortment  == ListSortmentEnum.ASC)
                            return Number(fieldA) - Number(fieldB);
                        else return Number(fieldB) - Number(fieldA);
    
                })
            }

            clients.slice(skip, skip + take);
            return {
                items: clients,
                totalItems: clients.length
            };
        },
    }
}
