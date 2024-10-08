import container from "../../container";
import { IUser } from "../../Data/Models/userSchema";
import { Criteria, IdMongo, Paginated } from "../../Utils/Types/typesMongoose";
import pkg from "firebase-admin";
import emailValidation from "../Validations/emailValidation";
import idValidation from "../Validations/idValidation";
import createUserValidation from "../Validations/CreatesValidation/createUserValidation";
import updateUserValidation from "../Validations/UserValidations/updateUserValidation";
import { CreateUserDto, userLogin } from "typesRequestDtos";
import { createHash } from "../../Utils/hashService";

class UserManager {
    private userRepository

    constructor(){
        this.userRepository = container.resolve('UserRepository');
    }
    async getUserByEmail(email: string){
        await emailValidation.parseAsync({email})
        return await this.userRepository.getUserByEmail(email)
    }
    async signup(bodyUser: CreateUserDto){
        let {password, ...bodyUserDto} = bodyUser
        const hashedPassword = await createHash(password)
        let userWithPassword = {...bodyUserDto,
            password:hashedPassword
        }
        let user: IUser = await this.userRepository.createUser(userWithPassword);
        
        if (user) {
            const { auth } = pkg;
            let userResponse = await auth().createUser({
                email: bodyUser.email,
                password: password,
                emailVerified: false,
                disabled: false
            });
            
            
            return user;
        }
    }
    async login(logindto: userLogin){
        let {auth} = pkg
        let userResponse = await auth().getUserByEmail(logindto.email)
    }
    async updateUser(body:IUser, id:IdMongo){
        await updateUserValidation.parseAsync({...body, id})
        return await this.userRepository.updateUser(body, id)
    }
    async deleteUser(id: IdMongo){
        await idValidation.parseAsync(id)
        return await this.userRepository.deleteUser(id)
    }
}
export default UserManager