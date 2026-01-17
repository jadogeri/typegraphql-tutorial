

// Define Symbols for DI binding (best practice in Inversify)
export const TYPES = {

    //controllers
    CategoryControllerInterface: Symbol.for("CategoryControllerInterface"),


    //services
    CategoryServiceInterface: Symbol.for("CategoryServiceInterface"),
    DatabaseServiceInterface: Symbol.for("DatabaseServiceInterface"),


    //repositories
    CategoryRepositoryInterface: Symbol.for("CategoryRepositoryInterface"),


    //classes
    DataSource: Symbol.for("DataSource"),
    CategoryService: Symbol.for('CategoryService'),

};