export interface UserProperties  {
  [x: string]: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
 
}

export default class User implements UserProperties {
 
  email!: string; 
  firstName!: string;
  lastName!: string;
  password!: string;
  
  [x: string]: string;
  
  private constructor(userProperties: UserProperties) {
    this.email= userProperties.email
    this.firstName= userProperties.firstName
    this.lastName= userProperties.lastName
    this.password = userProperties.password
  }
  

  public static createUser(userProperties: UserProperties): User {
    /** some validations */

    return new User(userProperties);
  }
}
