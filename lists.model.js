const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let employee = new Schema(
    {
        FormNo: {
            type: String
        },
        name: {
            type: String
        },
        Fname: {
            type: String
        },
        Class: {
            type: String
        },
        Session: {
            type: String
        },
        Remark: {
            type: String
        }
    },
    { collection: "Students" }
);

module.exports = mongoose.model("students", employee);