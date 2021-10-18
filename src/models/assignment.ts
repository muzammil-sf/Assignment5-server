import Sequelize from 'sequelize';
import { sequelize } from "../config/database";

export const db = sequelize.define('users', {
    fname: {
        type: Sequelize.TEXT
    },
    mname: {
        type: Sequelize.TEXT
    },
    lname: {
        type: Sequelize.TEXT
    },
    email: {
        type: Sequelize.TEXT
    },
    pno: {
        type: Sequelize.TEXT
    },
    role: {
        type: Sequelize.TEXT
    },
    address: {
        type: Sequelize.TEXT
    }
})