import { GraphQLResolveInfo } from 'graphql';
import { MyContext } from '../';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Address = {
  __typename?: 'Address';
  addressId: Scalars['ID']['output'];
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
  stateProvince: Scalars['String']['output'];
  street1: Scalars['String']['output'];
  street2?: Maybe<Scalars['String']['output']>;
};

export type AddressInput = {
  city: Scalars['String']['input'];
  countryId: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  region: Scalars['String']['input'];
  street1: Scalars['String']['input'];
  street2?: InputMaybe<Scalars['String']['input']>;
};

export type Business = {
  __typename?: 'Business';
  address: Array<Address>;
  businessDescription: Scalars['String']['output'];
  businessId: Scalars['ID']['output'];
  businessName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  images: Array<Image>;
  logoUrl?: Maybe<Scalars['String']['output']>;
  phoneNumber: Scalars['String']['output'];
  products: Array<Product>;
  users: Array<UserAccount>;
};

export type BusinessAccountInput = {
  address: AddressInput;
  businessDescription?: InputMaybe<Scalars['String']['input']>;
  businessName: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type Comment = {
  __typename?: 'Comment';
  commentId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  suggestionId: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type CommentDownvote = {
  __typename?: 'CommentDownvote';
  commentDownvoteId: Scalars['ID']['output'];
  commentId: Scalars['ID']['output'];
  timestamp: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type CommentUpvote = {
  __typename?: 'CommentUpvote';
  commentId: Scalars['ID']['output'];
  commentUpvoteId: Scalars['ID']['output'];
  timestamp: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type CreateAccountInput = {
  business?: InputMaybe<BusinessAccountInput>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateAccountPayload = {
  __typename?: 'CreateAccountPayload';
  token: Scalars['String']['output'];
};

export type Image = {
  __typename?: 'Image';
  altText?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  imageId: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUserAccount: CreateAccountPayload;
};


export type MutationcreateUserAccountArgs = {
  input: CreateAccountInput;
};

export type Product = {
  __typename?: 'Product';
  createdAt: Scalars['String']['output'];
  images: Array<Image>;
  productDescription: Scalars['String']['output'];
  productId: Scalars['ID']['output'];
  productName: Scalars['String']['output'];
  suggestionCategories: Array<SuggestionCategory>;
  suggestions: Array<Suggestion>;
  updatedAt: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  userAccount: UserAccount;
  users: Array<UserAccount>;
};


export type QueryuserAccountArgs = {
  userAccountId: Scalars['ID']['input'];
};

export enum RolePermission {
  APPROVE = 'APPROVE',
  DELETE = 'DELETE',
  NO_ACCESS = 'NO_ACCESS',
  READ = 'READ',
  REJECT = 'REJECT',
  UPDATE = 'UPDATE',
  WRITE = 'WRITE'
}

export enum RoleType {
  BUSINESS_ACCOUNT = 'BUSINESS_ACCOUNT',
  BUSINESS_ADMIN = 'BUSINESS_ADMIN',
  DEFAULT_ACCOUNT = 'DEFAULT_ACCOUNT',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export enum StatusType {
  ACCEPTED = 'ACCEPTED',
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING'
}

export type Suggestion = {
  __typename?: 'Suggestion';
  category: SuggestionCategory;
  comments: Array<Comment>;
  contents: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  downvotes: Array<SuggestionDownvote>;
  suggestionId: Scalars['ID']['output'];
  updatedAt: Scalars['String']['output'];
};

export type SuggestionCategory = {
  __typename?: 'SuggestionCategory';
  createdAt: Scalars['String']['output'];
  suggestionCategoryId: Scalars['ID']['output'];
  suggestionCategoryName: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type SuggestionDownvote = {
  __typename?: 'SuggestionDownvote';
  suggestionDownvoteId: Scalars['ID']['output'];
  suggestionId: Scalars['ID']['output'];
  timestamp: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type SuggestionUpvote = {
  __typename?: 'SuggestionUpvote';
  suggestionId: Scalars['ID']['output'];
  suggestionUpvoteId: Scalars['ID']['output'];
  timestamp: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type UserAccount = {
  __typename?: 'UserAccount';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  business?: Maybe<Business>;
  comments: Array<Comment>;
  createdAt: Scalars['String']['output'];
  downvotedComments: Array<Comment>;
  downvotedSuggestions: Array<Suggestion>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  roleType: Array<RoleType>;
  suggestions: Array<Suggestion>;
  updatedAt: Scalars['String']['output'];
  upvotedComments: Array<Comment>;
  upvotedSuggestions: Array<Suggestion>;
  userAccountId: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type UserInvitation = {
  __typename?: 'UserInvitation';
  createdAt: Scalars['String']['output'];
  status: StatusType;
  token: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  userAccountId: Scalars['ID']['output'];
  userInvitationId: Scalars['ID']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Address: ResolverTypeWrapper<Address>;
  AddressInput: AddressInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Business: ResolverTypeWrapper<Business>;
  BusinessAccountInput: BusinessAccountInput;
  Comment: ResolverTypeWrapper<Comment>;
  CommentDownvote: ResolverTypeWrapper<CommentDownvote>;
  CommentUpvote: ResolverTypeWrapper<CommentUpvote>;
  CreateAccountInput: CreateAccountInput;
  CreateAccountPayload: ResolverTypeWrapper<CreateAccountPayload>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Image: ResolverTypeWrapper<Image>;
  Mutation: ResolverTypeWrapper<{}>;
  Product: ResolverTypeWrapper<Product>;
  Query: ResolverTypeWrapper<{}>;
  RolePermission: RolePermission;
  RoleType: RoleType;
  StatusType: StatusType;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Suggestion: ResolverTypeWrapper<Suggestion>;
  SuggestionCategory: ResolverTypeWrapper<SuggestionCategory>;
  SuggestionDownvote: ResolverTypeWrapper<SuggestionDownvote>;
  SuggestionUpvote: ResolverTypeWrapper<SuggestionUpvote>;
  UserAccount: ResolverTypeWrapper<UserAccount>;
  UserInvitation: ResolverTypeWrapper<UserInvitation>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Address: Address;
  AddressInput: AddressInput;
  Boolean: Scalars['Boolean']['output'];
  Business: Business;
  BusinessAccountInput: BusinessAccountInput;
  Comment: Comment;
  CommentDownvote: CommentDownvote;
  CommentUpvote: CommentUpvote;
  CreateAccountInput: CreateAccountInput;
  CreateAccountPayload: CreateAccountPayload;
  ID: Scalars['ID']['output'];
  Image: Image;
  Mutation: {};
  Product: Product;
  Query: {};
  String: Scalars['String']['output'];
  Suggestion: Suggestion;
  SuggestionCategory: SuggestionCategory;
  SuggestionDownvote: SuggestionDownvote;
  SuggestionUpvote: SuggestionUpvote;
  UserAccount: UserAccount;
  UserInvitation: UserInvitation;
}>;

export type AddressResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = ResolversObject<{
  addressId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postalCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stateProvince?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  street1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  street2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusinessResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Business'] = ResolversParentTypes['Business']> = ResolversObject<{
  address?: Resolver<Array<ResolversTypes['Address']>, ParentType, ContextType>;
  businessDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  businessId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  businessName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  logoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['UserAccount']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommentResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = ResolversObject<{
  commentId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  suggestionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommentDownvoteResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CommentDownvote'] = ResolversParentTypes['CommentDownvote']> = ResolversObject<{
  commentDownvoteId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  commentId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommentUpvoteResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CommentUpvote'] = ResolversParentTypes['CommentUpvote']> = ResolversObject<{
  commentId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  commentUpvoteId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateAccountPayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CreateAccountPayload'] = ResolversParentTypes['CreateAccountPayload']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ImageResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = ResolversObject<{
  altText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createUserAccount?: Resolver<ResolversTypes['CreateAccountPayload'], ParentType, ContextType, RequireFields<MutationcreateUserAccountArgs, 'input'>>;
}>;

export type ProductResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  productDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  productName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  suggestionCategories?: Resolver<Array<ResolversTypes['SuggestionCategory']>, ParentType, ContextType>;
  suggestions?: Resolver<Array<ResolversTypes['Suggestion']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  userAccount?: Resolver<ResolversTypes['UserAccount'], ParentType, ContextType, RequireFields<QueryuserAccountArgs, 'userAccountId'>>;
  users?: Resolver<Array<ResolversTypes['UserAccount']>, ParentType, ContextType>;
}>;

export type SuggestionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Suggestion'] = ResolversParentTypes['Suggestion']> = ResolversObject<{
  category?: Resolver<ResolversTypes['SuggestionCategory'], ParentType, ContextType>;
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  contents?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  downvotes?: Resolver<Array<ResolversTypes['SuggestionDownvote']>, ParentType, ContextType>;
  suggestionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SuggestionCategoryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['SuggestionCategory'] = ResolversParentTypes['SuggestionCategory']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  suggestionCategoryId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  suggestionCategoryName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SuggestionDownvoteResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['SuggestionDownvote'] = ResolversParentTypes['SuggestionDownvote']> = ResolversObject<{
  suggestionDownvoteId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  suggestionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SuggestionUpvoteResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['SuggestionUpvote'] = ResolversParentTypes['SuggestionUpvote']> = ResolversObject<{
  suggestionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  suggestionUpvoteId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserAccountResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UserAccount'] = ResolversParentTypes['UserAccount']> = ResolversObject<{
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  business?: Resolver<Maybe<ResolversTypes['Business']>, ParentType, ContextType>;
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  downvotedComments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  downvotedSuggestions?: Resolver<Array<ResolversTypes['Suggestion']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roleType?: Resolver<Array<ResolversTypes['RoleType']>, ParentType, ContextType>;
  suggestions?: Resolver<Array<ResolversTypes['Suggestion']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  upvotedComments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  upvotedSuggestions?: Resolver<Array<ResolversTypes['Suggestion']>, ParentType, ContextType>;
  userAccountId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserInvitationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UserInvitation'] = ResolversParentTypes['UserInvitation']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusType'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userAccountId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userInvitationId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  Address?: AddressResolvers<ContextType>;
  Business?: BusinessResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  CommentDownvote?: CommentDownvoteResolvers<ContextType>;
  CommentUpvote?: CommentUpvoteResolvers<ContextType>;
  CreateAccountPayload?: CreateAccountPayloadResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Suggestion?: SuggestionResolvers<ContextType>;
  SuggestionCategory?: SuggestionCategoryResolvers<ContextType>;
  SuggestionDownvote?: SuggestionDownvoteResolvers<ContextType>;
  SuggestionUpvote?: SuggestionUpvoteResolvers<ContextType>;
  UserAccount?: UserAccountResolvers<ContextType>;
  UserInvitation?: UserInvitationResolvers<ContextType>;
}>;

