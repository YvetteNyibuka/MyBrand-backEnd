"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fabSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    }
});
const FabModel = (0, mongoose_1.model)("FabModel", fabSchema);
exports.default = FabModel;
