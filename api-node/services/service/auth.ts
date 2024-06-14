import {ILoginUserBody, IRegisterUserBody} from "../../types";
import {isNil, not} from "ramda";
import {User} from "../../models/users";
import {comparePassword, hashPassword} from "../crypto";
import {IUser} from "../../types/modeling";
import MailParser from "mailparser"
import {createToken} from "../jwt";
import {isValidEmail} from "../helpers/functions";


export class AuthRepository {

    public static async registerUser(body: IRegisterUserBody): Promise<string> {
        try {
            if (isNil(body.name) || body.name.length <= 6) {
                throw "Invalid username! Username should be longer than 6 symbols"
            }

            const isExists = await User.count({ where: { username: body.name } });
            if (isExists > 0) {
                throw "Invalid username! User with this name is exists!";
            }

            if (body.password.length < 8) {
                throw "Invalid password! Password should be longer than 8 symbols"
            }

            const isValidParsedAddress = isValidEmail(body.email);
            if (!isValidParsedAddress) {
                throw "Invalid email! Example something@mail.com"
            }

            const isValidFullName = /^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/.test(body.fName);
            if (!isValidFullName) {
                throw "Invalid Full Name! Example Ivan Ivanov"
            }
            const isValidLocation = /^[A-Za-z\u0080-\u024F -']+$/.test(body.location);
            if (!isValidLocation) {
                throw "Invalid Location! Example Detroit"
            }

            const hashedPassword = await hashPassword(body.password);

            await User.create({
                username: body.name,
                email: body.email,
                password: hashedPassword,
                personal_site: body.site,
                gender: body.gender,
                description: body.about,
                full_name: body.fName,
                location: body.location,
                date_of_birth: body.birth,
                is_private: false,
                token: "",
            })

            return body.name;
        } catch (e) {
            throw e;
        }
    }

    public static async loginUser(body: ILoginUserBody) {
        try {
           const user = await User.findOne({ where: { username: body.username }, attributes: ['username', 'email', 'password', 'token'] });

           if (isNil(user) || not(await comparePassword(body.password, user.password))) {
               throw "Error! Wrong Username or password";
           }

           const currentUserToken = createToken(user.username, user.email);

           User.update({ token: currentUserToken }, { where: { username: user.username } })
           return currentUserToken;
        } catch (e: any) {
            throw e.toString();
        }
    }

}
