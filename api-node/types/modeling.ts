

export interface IUser {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    avatar?: string;
    personal_site?: string;
    gender?: string;
    description?: string;
    full_name?: string;
    location?: string;
    date_of_birth?: string;
    is_private?: boolean;
    token?: string;
    created_at?: Date;
}


export interface ISubscription {
    id?: number;
    maker?: string;
    subscriber?: string;
    status?: number;
    socket_hash?: string;
    created_at?: Date;
    updated_at?: Date;
}


export interface IPost {
    id: number;
    owner: string;
    type: number;
    image?: string;
    video?: string;
    text: string;
    caption: string;
    like_id: string;
    date_of_creation: Date;
    data_count: number;
}


export interface ILike {
    id: number;
    creator: string;
    post_hash: string;
    initiator: string;
    created_at: Date;
}
