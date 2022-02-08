import { MongoHelper } from "./db";
import User, { UserProperties } from "../../../entities/user/User";
import { UserGateway } from "../../../interactors/gateway/users-gateway";
import RegisterUserDto from "../../../interactors/usecases/user/register-user/register-user.dto";
import { ObjectId } from "mongodb";
import "dotenv/config";

export type MongodbUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: string;
};
export class UserRepository implements UserGateway {
  async findUserByEmail(email: string): Promise<UserProperties> {
    const userCollection = MongoHelper.getCollection(
      process.env.USERS_COLLECTION!
    );
    const user = await userCollection.findOne({ email });

    return user as any as UserProperties;
  }

  async save(userData: RegisterUserDto): Promise<UserProperties> {
    const userCollection = MongoHelper.getCollection(
      process.env.USERS_COLLECTION!
    );

    const user = await userCollection.insertOne(userData);
    return user as any as UserProperties;
  }
  async findUserById(id: string): Promise<UserProperties> {
    const userCollection = MongoHelper.getCollection(
      process.env.USERS_COLLECTION!
    );

    const user = await userCollection.findOne({
      _id: new ObjectId(id),
    });

    if (user) {
      delete user.password;
    }

    return user as any as UserProperties;
  }
  // private withApplicationId(dbUser: WithId<Document>): UserProperties {
  //   return {
  //     firstName: dbUser.firstName,
  //     lastName: dbUser.lastName,

  //     email: dbUser.email,
  //     password: dbUser.password,
  //     id: dbUser._id,
  //   };
  // }
}
