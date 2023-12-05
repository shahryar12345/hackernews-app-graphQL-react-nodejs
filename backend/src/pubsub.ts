import { Link, Vote } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";
import { TypedPubSub } from "typed-graphql-subscriptions";

// 1
export type PubSubChannels = {
    newLink: [{ createdLink: Link }];
    newVote: [{ createdVote: Vote }];
};

// 2
export const pubSub = new TypedPubSub<PubSubChannels>(new PubSub());