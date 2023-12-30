/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type ChangeMemberRoleDto = {
  memberId: Scalars['Float']['input'];
  role: Scalars['String']['input'];
};

export type Channel = {
  __typename?: 'Channel';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Float']['output'];
  members?: Maybe<Array<Member>>;
  name?: Maybe<Scalars['String']['output']>;
  type: ChannelType;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** Defines the type of the channel */
export enum ChannelType {
  Audio = 'AUDIO',
  Text = 'TEXT',
  Video = 'VIDEO'
}

export type Conversation = {
  __typename?: 'Conversation';
  id: Scalars['Float']['output'];
  memberOne: Member;
  memberOneId?: Maybe<Scalars['Float']['output']>;
  memberTwo: Member;
  memberTwoId?: Maybe<Scalars['Float']['output']>;
  messages: Array<DirectMessage>;
};

export type CreateChannelMessageDto = {
  channelId: Scalars['Float']['input'];
  content: Scalars['String']['input'];
};

export type CreateChannelOnServerDto = {
  name: Scalars['String']['input'];
  serverId: Scalars['Float']['input'];
  type: ChannelType;
};

export type CreateMessageDto = {
  channelId?: InputMaybe<Scalars['Float']['input']>;
  content: Scalars['String']['input'];
  conversationId?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateProfileDto = {
  email: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateServerDto = {
  name: Scalars['String']['input'];
  profileId?: InputMaybe<Scalars['Float']['input']>;
};

export type DeleteChannelFromServerDto = {
  channelId: Scalars['Float']['input'];
};

export type DeleteMemberDto = {
  memberId: Scalars['Float']['input'];
};

export type DeleteServerDto = {
  serverId: Scalars['Float']['input'];
};

export type DirectMessage = {
  __typename?: 'DirectMessage';
  content?: Maybe<Scalars['String']['output']>;
  conversation?: Maybe<Conversation>;
  conversationId?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  fileUrl?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  member: Member;
  memberId?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type FindChannelByIdDto = {
  channelId: Scalars['Float']['input'];
  serverId: Scalars['Float']['input'];
};

export type GetOrCreateConversationDto = {
  memberOneId: Scalars['Float']['input'];
  memberTwoId: Scalars['Float']['input'];
};

export type LeaveServerDto = {
  serverId: Scalars['Float']['input'];
};

export type Member = {
  __typename?: 'Member';
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<Profile>;
  profileId?: Maybe<Scalars['Float']['output']>;
  role?: Maybe<MemberRole>;
  server?: Maybe<Server>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

/** Define the role of a member in a server */
export enum MemberRole {
  Admin = 'ADMIN',
  Guest = 'GUEST',
  Moderator = 'MODERATOR'
}

export type Message = {
  __typename?: 'Message';
  channel?: Maybe<Channel>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  fileUrl?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  member: Member;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type MessageResult = {
  __typename?: 'MessageResult';
  message: MessageUnion;
};

export type MessageUnion = DirectMessage | Message;

export type MessagesResult = {
  __typename?: 'MessagesResult';
  messages: Array<MessageUnion>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMemberToServer: Server;
  changeMemberRole: Server;
  createAccessToken: Scalars['String']['output'];
  createChannelMessage: Message;
  createChannelOnServer: Server;
  createMessage: MessageResult;
  createProfile: Profile;
  createServer: Server;
  deleteChannelFromServer: Scalars['String']['output'];
  deleteMemberFromServer: Server;
  deleteMessage: MessageResult;
  deleteServer: Scalars['String']['output'];
  getOrCreateConversation: Conversation;
  leaveServer: Scalars['String']['output'];
  login: Profile;
  updateChannel: Channel;
  updateMessage: MessageResult;
  updateServer: Server;
  updateServerWithNewInviteCode: Server;
};


export type MutationAddMemberToServerArgs = {
  inviteCode: Scalars['String']['input'];
};


export type MutationChangeMemberRoleArgs = {
  input: ChangeMemberRoleDto;
};


export type MutationCreateAccessTokenArgs = {
  chatId?: InputMaybe<Scalars['String']['input']>;
  identity?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateChannelMessageArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
  input: CreateChannelMessageDto;
};


export type MutationCreateChannelOnServerArgs = {
  input: CreateChannelOnServerDto;
};


export type MutationCreateMessageArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
  input: CreateMessageDto;
};


export type MutationCreateProfileArgs = {
  input: CreateProfileDto;
};


export type MutationCreateServerArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
  input: CreateServerDto;
};


export type MutationDeleteChannelFromServerArgs = {
  input: DeleteChannelFromServerDto;
};


export type MutationDeleteMemberFromServerArgs = {
  input: DeleteMemberDto;
};


export type MutationDeleteMessageArgs = {
  channelId?: InputMaybe<Scalars['Float']['input']>;
  conversationId?: InputMaybe<Scalars['Float']['input']>;
  messageId: Scalars['Float']['input'];
};


export type MutationDeleteServerArgs = {
  input: DeleteServerDto;
};


export type MutationGetOrCreateConversationArgs = {
  input: GetOrCreateConversationDto;
};


export type MutationLeaveServerArgs = {
  input: LeaveServerDto;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateChannelArgs = {
  input: UpdateChannelDto;
};


export type MutationUpdateMessageArgs = {
  channelId?: InputMaybe<Scalars['Float']['input']>;
  content: Scalars['String']['input'];
  conversationId?: InputMaybe<Scalars['Float']['input']>;
  messageId: Scalars['Float']['input'];
};


export type MutationUpdateServerArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
  input: UpdateServerDto;
};


export type MutationUpdateServerWithNewInviteCodeArgs = {
  serverId?: InputMaybe<Scalars['Float']['input']>;
};

export type Profile = {
  __typename?: 'Profile';
  channels?: Maybe<Array<Channel>>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  servers?: Maybe<Array<Server>>;
};

export type Query = {
  __typename?: 'Query';
  getChannelById: Channel;
  getMemberById: Member;
  getMemberByProfileId: Member;
  getMessagesByChannelId: Array<Message>;
  getMessagesByConversationIdOrChannelId: MessagesResult;
  getProfileById: Profile;
  getServerById: Server;
  getServerByProfileIdOfMember: Array<Server>;
};


export type QueryGetChannelByIdArgs = {
  input: FindChannelByIdDto;
};


export type QueryGetMemberByIdArgs = {
  memberId?: InputMaybe<Scalars['Float']['input']>;
  serverId?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetMemberByProfileIdArgs = {
  profileId?: InputMaybe<Scalars['Float']['input']>;
  serverId?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetMessagesByChannelIdArgs = {
  channelId: Scalars['Float']['input'];
};


export type QueryGetMessagesByConversationIdOrChannelIdArgs = {
  channelId?: InputMaybe<Scalars['Float']['input']>;
  conversationId?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetProfileByIdArgs = {
  profileId: Scalars['Float']['input'];
};


export type QueryGetServerByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetServerByProfileIdOfMemberArgs = {
  profileId: Scalars['Float']['input'];
};

export type Server = {
  __typename?: 'Server';
  channels?: Maybe<Array<Channel>>;
  id: Scalars['Float']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inviteCode?: Maybe<Scalars['String']['output']>;
  members?: Maybe<Array<Member>>;
  name?: Maybe<Scalars['String']['output']>;
  profile: Profile;
  profileId?: Maybe<Scalars['Float']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  channelMessageCreated: MessageResult;
  messageCreated: MessageResult;
  messageDeleted: MessageResult;
  messageUpdated: MessageResult;
};


export type SubscriptionChannelMessageCreatedArgs = {
  channelId?: InputMaybe<Scalars['Float']['input']>;
  conversationId?: InputMaybe<Scalars['Float']['input']>;
};


export type SubscriptionMessageCreatedArgs = {
  channelId?: InputMaybe<Scalars['Float']['input']>;
  conversationId?: InputMaybe<Scalars['Float']['input']>;
};


export type SubscriptionMessageDeletedArgs = {
  channelId?: InputMaybe<Scalars['Float']['input']>;
  conversationId?: InputMaybe<Scalars['Float']['input']>;
};


export type SubscriptionMessageUpdatedArgs = {
  channelId?: InputMaybe<Scalars['Float']['input']>;
  conversationId?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateChannelDto = {
  channelId: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  type: ChannelType;
};

export type UpdateServerDto = {
  name: Scalars['String']['input'];
  serverId?: InputMaybe<Scalars['Float']['input']>;
};

export type AddMemberToServerMutationVariables = Exact<{
  inviteCode: Scalars['String']['input'];
}>;


export type AddMemberToServerMutation = { __typename?: 'Mutation', addMemberToServer: { __typename?: 'Server', id: number, name?: string | null } };

export type ChangeMemberRoleMutationVariables = Exact<{
  input: ChangeMemberRoleDto;
}>;


export type ChangeMemberRoleMutation = { __typename?: 'Mutation', changeMemberRole: { __typename?: 'Server', id: number, name?: string | null, imageUrl?: string | null, members?: Array<{ __typename?: 'Member', id?: number | null, role?: MemberRole | null }> | null } };

export type CreateAccessTokenMutationVariables = Exact<{
  identity: Scalars['String']['input'];
  chatId: Scalars['String']['input'];
}>;


export type CreateAccessTokenMutation = { __typename?: 'Mutation', createAccessToken: string };

export type CreateChannelMessageMutationVariables = Exact<{
  input: CreateChannelMessageDto;
  file?: InputMaybe<Scalars['Upload']['input']>;
}>;


export type CreateChannelMessageMutation = { __typename?: 'Mutation', createChannelMessage: { __typename?: 'Message', id?: number | null, content?: string | null, fileUrl?: string | null, channel?: { __typename?: 'Channel', id: number, name?: string | null } | null, member: { __typename?: 'Member', id?: number | null, name?: string | null, imageUrl?: string | null, profile?: { __typename?: 'Profile', id?: number | null, name?: string | null } | null } } };

export type CreateChannelOnServerMutationVariables = Exact<{
  input: CreateChannelOnServerDto;
}>;


export type CreateChannelOnServerMutation = { __typename?: 'Mutation', createChannelOnServer: { __typename?: 'Server', id: number, name?: string | null, imageUrl?: string | null, members?: Array<{ __typename?: 'Member', id?: number | null }> | null } };

export type CreateMessageMutationVariables = Exact<{
  input: CreateMessageDto;
  file?: InputMaybe<Scalars['Upload']['input']>;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'MessageResult', message: { __typename?: 'DirectMessage', id?: number | null, content?: string | null, deleted?: boolean | null, createdAt?: string | null, updatedAt?: string | null, conversationId?: number | null, fileUrl?: string | null, member: { __typename?: 'Member', role?: MemberRole | null, id?: number | null, profileId?: number | null, profile?: { __typename?: 'Profile', email?: string | null, id?: number | null, name?: string | null, imageUrl?: string | null } | null } } | { __typename?: 'Message', id?: number | null, content?: string | null, deleted?: boolean | null, createdAt?: string | null, updatedAt?: string | null, fileUrl?: string | null, channel?: { __typename?: 'Channel', id: number } | null, member: { __typename?: 'Member', role?: MemberRole | null, id?: number | null, profileId?: number | null, profile?: { __typename?: 'Profile', email?: string | null, id?: number | null, name?: string | null, imageUrl?: string | null } | null } } } };

export type CreateProfileMutationVariables = Exact<{
  input: CreateProfileDto;
}>;


export type CreateProfileMutation = { __typename?: 'Mutation', createProfile: { __typename?: 'Profile', id?: number | null, imageUrl?: string | null, name?: string | null, email?: string | null } };

export type CreateServerMutationVariables = Exact<{
  input: CreateServerDto;
  file: Scalars['Upload']['input'];
}>;


export type CreateServerMutation = { __typename?: 'Mutation', createServer: { __typename?: 'Server', id: number, name?: string | null, imageUrl?: string | null, members?: Array<{ __typename?: 'Member', id?: number | null }> | null } };

export type DeleteChannelFromServerMutationVariables = Exact<{
  input: DeleteChannelFromServerDto;
}>;


export type DeleteChannelFromServerMutation = { __typename?: 'Mutation', deleteChannelFromServer: string };

export type DeleteMemberFromServerMutationVariables = Exact<{
  input: DeleteMemberDto;
}>;


export type DeleteMemberFromServerMutation = { __typename?: 'Mutation', deleteMemberFromServer: { __typename?: 'Server', id: number, name?: string | null, imageUrl?: string | null, members?: Array<{ __typename?: 'Member', id?: number | null, role?: MemberRole | null, profileId?: number | null, profile?: { __typename?: 'Profile', id?: number | null, name?: string | null, imageUrl?: string | null, email?: string | null } | null }> | null } };

export type DeleteMessageMutationVariables = Exact<{
  messageId: Scalars['Float']['input'];
  conversationId?: InputMaybe<Scalars['Float']['input']>;
  channelId?: InputMaybe<Scalars['Float']['input']>;
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteMessage: { __typename?: 'MessageResult', message: { __typename?: 'DirectMessage', id?: number | null, content?: string | null, deleted?: boolean | null, createdAt?: string | null, updatedAt?: string | null, conversationId?: number | null, fileUrl?: string | null, member: { __typename?: 'Member', role?: MemberRole | null, id?: number | null, profileId?: number | null, profile?: { __typename?: 'Profile', email?: string | null, id?: number | null, name?: string | null, imageUrl?: string | null } | null } } | { __typename?: 'Message', id?: number | null, content?: string | null, deleted?: boolean | null, createdAt?: string | null, updatedAt?: string | null, fileUrl?: string | null, channel?: { __typename?: 'Channel', id: number } | null, member: { __typename?: 'Member', role?: MemberRole | null, id?: number | null, profileId?: number | null, profile?: { __typename?: 'Profile', email?: string | null, id?: number | null, name?: string | null, imageUrl?: string | null } | null } } } };

export type DeleteServerMutationVariables = Exact<{
  input: DeleteServerDto;
}>;


export type DeleteServerMutation = { __typename?: 'Mutation', deleteServer: string };

export type GetOrCreateConversationMutationVariables = Exact<{
  input: GetOrCreateConversationDto;
}>;


export type GetOrCreateConversationMutation = { __typename?: 'Mutation', getOrCreateConversation: { __typename?: 'Conversation', id: number, memberOneId?: number | null, memberTwoId?: number | null, memberOne: { __typename?: 'Member', profile?: { __typename?: 'Profile', id?: number | null, name?: string | null, email?: string | null, imageUrl?: string | null } | null }, memberTwo: { __typename?: 'Member', profile?: { __typename?: 'Profile', id?: number | null, name?: string | null, email?: string | null, imageUrl?: string | null } | null } } };

export type LeaveServerMutationVariables = Exact<{
  input: LeaveServerDto;
}>;


export type LeaveServerMutation = { __typename?: 'Mutation', leaveServer: string };

export type UpdateChannelMutationVariables = Exact<{
  input: UpdateChannelDto;
}>;


export type UpdateChannelMutation = { __typename?: 'Mutation', updateChannel: { __typename?: 'Channel', id: number, name?: string | null, type: ChannelType } };

export type UpdateMessageMutationVariables = Exact<{
  messageId: Scalars['Float']['input'];
  content: Scalars['String']['input'];
  channelId?: InputMaybe<Scalars['Float']['input']>;
  conversationId?: InputMaybe<Scalars['Float']['input']>;
}>;


export type UpdateMessageMutation = { __typename?: 'Mutation', updateMessage: { __typename?: 'MessageResult', message: { __typename?: 'DirectMessage', content?: string | null, updatedAt?: string | null } | { __typename?: 'Message', content?: string | null, updatedAt?: string | null } } };

export type UpdateServerWithNewInviteCodeMutationVariables = Exact<{
  serverId: Scalars['Float']['input'];
}>;


export type UpdateServerWithNewInviteCodeMutation = { __typename?: 'Mutation', updateServerWithNewInviteCode: { __typename?: 'Server', id: number, name?: string | null, imageUrl?: string | null, inviteCode?: string | null } };

export type UpdateServerMutationVariables = Exact<{
  input: UpdateServerDto;
  file?: InputMaybe<Scalars['Upload']['input']>;
}>;


export type UpdateServerMutation = { __typename?: 'Mutation', updateServer: { __typename?: 'Server', id: number, name?: string | null, imageUrl?: string | null } };

export type GetChannelByIdQueryVariables = Exact<{
  input: FindChannelByIdDto;
}>;


export type GetChannelByIdQuery = { __typename?: 'Query', getChannelById: { __typename?: 'Channel', id: number, name?: string | null, type: ChannelType, members?: Array<{ __typename?: 'Member', id?: number | null, profile?: { __typename?: 'Profile', id?: number | null, name?: string | null, email?: string | null, imageUrl?: string | null } | null }> | null } };

export type GetMemberByIdQueryVariables = Exact<{
  memberId: Scalars['Float']['input'];
  serverId: Scalars['Float']['input'];
}>;


export type GetMemberByIdQuery = { __typename?: 'Query', getMemberById: { __typename?: 'Member', id?: number | null, role?: MemberRole | null, profile?: { __typename?: 'Profile', id?: number | null, name?: string | null, email?: string | null, imageUrl?: string | null, servers?: Array<{ __typename?: 'Server', id: number, name?: string | null, channels?: Array<{ __typename?: 'Channel', id: number, name?: string | null, type: ChannelType }> | null }> | null } | null } };

export type GetMemberByProfileIdQueryVariables = Exact<{
  profileId: Scalars['Float']['input'];
  serverId: Scalars['Float']['input'];
}>;


export type GetMemberByProfileIdQuery = { __typename?: 'Query', getMemberByProfileId: { __typename?: 'Member', id?: number | null, role?: MemberRole | null, profile?: { __typename?: 'Profile', id?: number | null, name?: string | null, email?: string | null } | null } };

export type GetMessagesByConversationIdOrChannelIdQueryVariables = Exact<{
  conversationId?: InputMaybe<Scalars['Float']['input']>;
  channelId?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetMessagesByConversationIdOrChannelIdQuery = { __typename?: 'Query', getMessagesByConversationIdOrChannelId: { __typename?: 'MessagesResult', messages: Array<{ __typename?: 'DirectMessage', id?: number | null, content?: string | null, deleted?: boolean | null, createdAt?: string | null, updatedAt?: string | null, conversationId?: number | null, fileUrl?: string | null, member: { __typename?: 'Member', role?: MemberRole | null, id?: number | null, profileId?: number | null, profile?: { __typename?: 'Profile', email?: string | null, id?: number | null, name?: string | null, imageUrl?: string | null } | null } } | { __typename?: 'Message', id?: number | null, content?: string | null, deleted?: boolean | null, createdAt?: string | null, updatedAt?: string | null, fileUrl?: string | null, channel?: { __typename?: 'Channel', id: number } | null, member: { __typename?: 'Member', role?: MemberRole | null, id?: number | null, profileId?: number | null, profile?: { __typename?: 'Profile', email?: string | null, id?: number | null, name?: string | null, imageUrl?: string | null } | null } }> } };

export type GetProfileByIdQueryVariables = Exact<{
  profileId: Scalars['Float']['input'];
}>;


export type GetProfileByIdQuery = { __typename?: 'Query', getProfileById: { __typename?: 'Profile', id?: number | null, name?: string | null, email?: string | null, servers?: Array<{ __typename?: 'Server', id: number, name?: string | null, profile: { __typename?: 'Profile', name?: string | null, id?: number | null }, channels?: Array<{ __typename?: 'Channel', id: number, name?: string | null, type: ChannelType }> | null }> | null } };

export type GetServerByIdQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type GetServerByIdQuery = { __typename?: 'Query', getServerById: { __typename?: 'Server', id: number, profileId?: number | null, name?: string | null, imageUrl?: string | null, inviteCode?: string | null, channels?: Array<{ __typename?: 'Channel', id: number, type: ChannelType, name?: string | null }> | null, members?: Array<{ __typename?: 'Member', id?: number | null, role?: MemberRole | null, profileId?: number | null, profile?: { __typename?: 'Profile', id?: number | null, name?: string | null, imageUrl?: string | null, email?: string | null } | null }> | null, profile: { __typename?: 'Profile', id?: number | null, name?: string | null, imageUrl?: string | null, email?: string | null } } };

export type GetServerByProfileIdOfMemberQueryVariables = Exact<{
  profileId: Scalars['Float']['input'];
}>;


export type GetServerByProfileIdOfMemberQuery = { __typename?: 'Query', getServerByProfileIdOfMember: Array<{ __typename?: 'Server', id: number, name?: string | null, imageUrl?: string | null }> };

export type MessageCreatedSubscriptionVariables = Exact<{
  conversationId?: InputMaybe<Scalars['Float']['input']>;
  channelId?: InputMaybe<Scalars['Float']['input']>;
}>;


export type MessageCreatedSubscription = { __typename?: 'Subscription', messageCreated: { __typename?: 'MessageResult', message: { __typename?: 'DirectMessage', id?: number | null, content?: string | null, deleted?: boolean | null, createdAt?: string | null, updatedAt?: string | null, conversationId?: number | null, fileUrl?: string | null, member: { __typename?: 'Member', role?: MemberRole | null, id?: number | null, profileId?: number | null, profile?: { __typename?: 'Profile', email?: string | null, id?: number | null, name?: string | null, imageUrl?: string | null } | null } } | { __typename?: 'Message', id?: number | null, content?: string | null, deleted?: boolean | null, createdAt?: string | null, updatedAt?: string | null, fileUrl?: string | null, channel?: { __typename?: 'Channel', id: number } | null, member: { __typename?: 'Member', role?: MemberRole | null, id?: number | null, profileId?: number | null, profile?: { __typename?: 'Profile', email?: string | null, id?: number | null, name?: string | null, imageUrl?: string | null } | null } } } };

export type MessageDeletedSubscriptionVariables = Exact<{
  conversationId?: InputMaybe<Scalars['Float']['input']>;
  channelId?: InputMaybe<Scalars['Float']['input']>;
}>;


export type MessageDeletedSubscription = { __typename?: 'Subscription', messageDeleted: { __typename?: 'MessageResult', message: { __typename?: 'DirectMessage', id?: number | null, content?: string | null, deleted?: boolean | null, conversationId?: number | null, updatedAt?: string | null, createdAt?: string | null, fileUrl?: string | null, member: { __typename?: 'Member', role?: MemberRole | null, id?: number | null, profileId?: number | null, profile?: { __typename?: 'Profile', email?: string | null, id?: number | null, name?: string | null, imageUrl?: string | null } | null } } | { __typename?: 'Message', id?: number | null, content?: string | null, deleted?: boolean | null, updatedAt?: string | null, createdAt?: string | null, fileUrl?: string | null, channel?: { __typename?: 'Channel', id: number } | null, member: { __typename?: 'Member', role?: MemberRole | null, id?: number | null, profileId?: number | null, profile?: { __typename?: 'Profile', email?: string | null, id?: number | null, name?: string | null, imageUrl?: string | null } | null } } } };

export type MessageUpdatedSubscriptionVariables = Exact<{
  conversationId?: InputMaybe<Scalars['Float']['input']>;
  channelId?: InputMaybe<Scalars['Float']['input']>;
}>;


export type MessageUpdatedSubscription = { __typename?: 'Subscription', messageUpdated: { __typename?: 'MessageResult', message: { __typename?: 'DirectMessage', id?: number | null, content?: string | null, deleted?: boolean | null, updatedAt?: string | null, createdAt?: string | null, conversationId?: number | null, fileUrl?: string | null, member: { __typename?: 'Member', role?: MemberRole | null, id?: number | null, profileId?: number | null, profile?: { __typename?: 'Profile', email?: string | null, id?: number | null, name?: string | null, imageUrl?: string | null } | null } } | { __typename?: 'Message', id?: number | null, content?: string | null, deleted?: boolean | null, updatedAt?: string | null, createdAt?: string | null, fileUrl?: string | null, channel?: { __typename?: 'Channel', id: number } | null, member: { __typename?: 'Member', role?: MemberRole | null, id?: number | null, profileId?: number | null, profile?: { __typename?: 'Profile', email?: string | null, id?: number | null, name?: string | null, imageUrl?: string | null } | null } } } };


export const AddMemberToServerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddMemberToServer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inviteCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMemberToServer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inviteCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inviteCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AddMemberToServerMutation, AddMemberToServerMutationVariables>;
export const ChangeMemberRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeMemberRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeMemberRoleDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeMemberRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<ChangeMemberRoleMutation, ChangeMemberRoleMutationVariables>;
export const CreateAccessTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAccessToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAccessToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"identity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identity"}}},{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}]}]}}]} as unknown as DocumentNode<CreateAccessTokenMutation, CreateAccessTokenMutationVariables>;
export const CreateChannelMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateChannelMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateChannelMessageDto"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChannelMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"channel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateChannelMessageMutation, CreateChannelMessageMutationVariables>;
export const CreateChannelOnServerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateChannelOnServer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateChannelOnServerDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChannelOnServer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateChannelOnServerMutation, CreateChannelOnServerMutationVariables>;
export const CreateMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMessageDto"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DirectMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"conversationId"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"channel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateMessageMutation, CreateMessageMutationVariables>;
export const CreateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProfileDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateProfileMutation, CreateProfileMutationVariables>;
export const CreateServerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateServer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateServerDto"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createServer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateServerMutation, CreateServerMutationVariables>;
export const DeleteChannelFromServerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteChannelFromServer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteChannelFromServerDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteChannelFromServer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DeleteChannelFromServerMutation, DeleteChannelFromServerMutationVariables>;
export const DeleteMemberFromServerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMemberFromServer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteMemberDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMemberFromServer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DeleteMemberFromServerMutation, DeleteMemberFromServerMutationVariables>;
export const DeleteMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"messageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"conversationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DirectMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"conversationId"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"channel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const DeleteServerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteServer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteServerDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteServer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DeleteServerMutation, DeleteServerMutationVariables>;
export const GetOrCreateConversationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetOrCreateConversation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetOrCreateConversationDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOrCreateConversation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"memberOneId"}},{"kind":"Field","name":{"kind":"Name","value":"memberTwoId"}},{"kind":"Field","name":{"kind":"Name","value":"memberOne"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"memberTwo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOrCreateConversationMutation, GetOrCreateConversationMutationVariables>;
export const LeaveServerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LeaveServer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LeaveServerDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveServer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<LeaveServerMutation, LeaveServerMutationVariables>;
export const UpdateChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateChannelDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<UpdateChannelMutation, UpdateChannelMutationVariables>;
export const UpdateMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"messageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}},{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"conversationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DirectMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateMessageMutation, UpdateMessageMutationVariables>;
export const UpdateServerWithNewInviteCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateServerWithNewInviteCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateServerWithNewInviteCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"serverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serverId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"inviteCode"}}]}}]}}]} as unknown as DocumentNode<UpdateServerWithNewInviteCodeMutation, UpdateServerWithNewInviteCodeMutationVariables>;
export const UpdateServerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateServer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateServerDto"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateServer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<UpdateServerMutation, UpdateServerMutationVariables>;
export const GetChannelByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChannelById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FindChannelByIdDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getChannelById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetChannelByIdQuery, GetChannelByIdQueryVariables>;
export const GetMemberByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMemberById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"memberId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMemberById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"memberId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"memberId"}}},{"kind":"Argument","name":{"kind":"Name","value":"serverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serverId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"servers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"channels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMemberByIdQuery, GetMemberByIdQueryVariables>;
export const GetMemberByProfileIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMemberByProfileId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMemberByProfileId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"profileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}}},{"kind":"Argument","name":{"kind":"Name","value":"serverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serverId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<GetMemberByProfileIdQuery, GetMemberByProfileIdQueryVariables>;
export const GetMessagesByConversationIdOrChannelIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMessagesByConversationIdOrChannelId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMessagesByConversationIdOrChannelId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"conversationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DirectMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"conversationId"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"channel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMessagesByConversationIdOrChannelIdQuery, GetMessagesByConversationIdOrChannelIdQueryVariables>;
export const GetProfileByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProfileById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProfileById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"profileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"servers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"channels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProfileByIdQuery, GetProfileByIdQueryVariables>;
export const GetServerByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetServerById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getServerById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"inviteCode"}},{"kind":"Field","name":{"kind":"Name","value":"channels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<GetServerByIdQuery, GetServerByIdQueryVariables>;
export const GetServerByProfileIdOfMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetServerByProfileIdOfMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getServerByProfileIdOfMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"profileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<GetServerByProfileIdOfMemberQuery, GetServerByProfileIdOfMemberQueryVariables>;
export const MessageCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MessageCreated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageCreated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"conversationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DirectMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"conversationId"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"channel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<MessageCreatedSubscription, MessageCreatedSubscriptionVariables>;
export const MessageDeletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MessageDeleted"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageDeleted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"conversationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DirectMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"conversationId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"channel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<MessageDeletedSubscription, MessageDeletedSubscriptionVariables>;
export const MessageUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MessageUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"conversationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DirectMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"conversationId"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"channel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<MessageUpdatedSubscription, MessageUpdatedSubscriptionVariables>;