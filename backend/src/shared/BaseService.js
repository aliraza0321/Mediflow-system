import ApiError from "../utils/ApiError.js";

class BaseService {
  constructor(repository, entityName) {
    // services handle logic while repositories handle data access
    if (new.target === BaseService) {
      throw new Error("BaseService is abstract and cannot be instantiated directly");
    }

    this.repository = repository;
    this.entityName = entityName;
  }

  async getAll() {
    return this.repository.findAll();
  }

  async getById(id) {
    const entity = await this.repository.findById(id);

     // return a clear error if the record does not exist
    if (!entity) {
      throw new ApiError(404, `${this.entityName} not found`);
    }

    return entity;
  }
}

export default BaseService;
