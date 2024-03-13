"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fabContoller_1 = require("../controllers/fabContoller");
const Fabrouter = (0, express_1.Router)();
Fabrouter.get('/fabs', fabContoller_1.getFab);
exports.default = Fabrouter;
