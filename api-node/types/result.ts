import {PostDeclaration} from "../models/post";
import {UserDeclaration} from "../models/users";


export interface IFullUserResult {
    userPosts: Array<PostDeclaration>;
    isPrivate: boolean;
    userData: UserDeclaration | null;
    isSubscribed: boolean;
    counts: { owner_count: number; subscriber_count: number; }
}


export interface ILikeBodyResult {
    isLiked: boolean;
    likesCount: number;
}
