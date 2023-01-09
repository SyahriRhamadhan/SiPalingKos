import {Sequelize} from "sequelize";

const db = new Sequelize('sipaling_kos', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;