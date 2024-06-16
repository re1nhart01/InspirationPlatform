import {PostDeclaration} from "../models/post";
import {UserDeclaration} from "../models/users";
import {UserSubscriptionsDeclaration} from "../models/subscription";
import {ChatDataDeclaration} from "../models/chat";


export interface IFullUserResult {
    userPosts: Array<PostDeclaration>;
    isPrivate: boolean;
    userData: UserDeclaration | null;
    isSubscribed: UserSubscriptionsDeclaration | null;
    isSubscribe: boolean;
    counts: { owner_count: number; subscriber_count: number; }
}


export interface ILikeBodyResult {
    isLiked: boolean;
    likesCount: number;
}


export interface IMessagesPagingResult {
    "items":      ChatDataDeclaration[];
    "pageSize":   number;
    "isInit":     boolean;
    "pageIndex":  number;
    "totalPages": number;
}
