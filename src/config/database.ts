import { Sequelize } from "sequelize";
console.log(process.env.DB_NAME);

export const sequelize = new Sequelize(
	process.env.DB_NAME as string,
	process.env.DB_USER as string,
	process.env.DB_PASS  as string,
	{
		host: "localhost",
		dialect: "postgres",
		// operatorsAliases: false,
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	}
);
