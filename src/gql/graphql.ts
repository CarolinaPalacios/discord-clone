/* eslint-disable */
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
