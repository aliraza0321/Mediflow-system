import ApiError from "../utils/ApiError.js";

class BaseService {
  constructor(repository, entityName) {
    // Services hold business logic. Repositories only handle database queries.
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

    // Throwing here keeps controllers small and responses consistent.
    if (!entity) {
      throw new ApiError(404, `${this.entityName} not found`);
    }

    return entity;
  }
}

export default BaseService;
