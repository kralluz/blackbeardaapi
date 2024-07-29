"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyId = exports.verifyPermissions = exports.verifyToken = exports.verifyAdmin = exports.bodyValidation = void 0;
require("dotenv/config");
const error_1 = __importDefault(require("../Errors/error"));
const jsonwebtoken_1 = require("jsonwebtoken");
const users_repositorie_1 = require("../repositories/users.repositorie");
const bodyValidation = (schema) => (req, res, next) => {
    if (req.body.value)
        req.body.value = Number(req.body.value);
    req.body = schema.parse(req.body);
    return next();
};
exports.bodyValidation = bodyValidation;
const verifyAdmin = (req, res, next) => {
    const { admin } = res.locals.decoded;
    if (!admin)
        throw new error_1.default("Insufficient permission", 403);
    return next();
};
exports.verifyAdmin = verifyAdmin;
const verifyToken = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization)
        throw new error_1.default("Missing bearer token", 401);
    const token = authorization.split(" ")[1];
    const decoded = (0, jsonwebtoken_1.verify)(token, process.env.SECRET_KEY);
    res.locals = Object.assign(Object.assign({}, res.locals), { decoded });
    return next();
};
exports.verifyToken = verifyToken;
const verifyPermissions = (req, res, next) => {
    const { id } = req.params;
    const { sub, admin } = res.locals.decoded;
    if (admin)
        return next();
    if (id !== sub)
        throw new error_1.default("Insufficient permission", 403);
    return next();
};
exports.verifyPermissions = verifyPermissions;
const verifyId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_repositorie_1.usersRepo.findOneBy({
        id: Number(req.params.id),
    });
    if (!user) {
        throw new error_1.default("User not found", 404);
    }
    res.locals = Object.assign(Object.assign({}, res.locals), { user });
    next();
});
exports.verifyId = verifyId;
