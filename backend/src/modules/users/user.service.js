import BaseService from "../../shared/BaseService.js";
import UserRepository from "./user.repository.js";

class UserService extends BaseService {
  constructor() {
    super(new UserRepository(), "User");
  }
}

export default UserService;
