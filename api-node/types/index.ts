


export interface IRegisterUserBody {
    name: string;
    email: string;
    password: string;
    fName: string;
    location: string;
    about: string;
    gender: string;
    birth: string;
    site: string;
}


export interface ILoginUserBody {
    username: string;
    password: string;
}
