

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
    socketHash?: string;
    created_at?: Date;
    updated_at?: Date;
}
