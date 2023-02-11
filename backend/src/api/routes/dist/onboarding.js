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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var typedi_1 = require("typedi");
var celebrate_1 = require("celebrate");
var onboarding_1 = require("@/services/onboarding");
var route = express_1.Router();
exports["default"] = (function (app) {
    app.use('/onboarding', route);
    route.post('/addOnboarding', celebrate_1.celebrate({
        body: celebrate_1.Joi.object({
            userID: celebrate_1.Joi.string().required(),
            nickname: celebrate_1.Joi.string(),
            city: celebrate_1.Joi.string(),
            zipcode: celebrate_1.Joi.string(),
            religion: celebrate_1.Joi.string(),
            religionOther: celebrate_1.Joi.string(),
            ethnicity: celebrate_1.Joi.string(),
            sexualOrientation: celebrate_1.Joi.string(),
            identifyYourself: celebrate_1.Joi.string(),
            gender: celebrate_1.Joi.string(),
            genderOther: celebrate_1.Joi.string(),
            pronouns: celebrate_1.Joi.string(),
            pronounsOther: celebrate_1.Joi.string(),
            concerns: celebrate_1.Joi.array(),
            goals: celebrate_1.Joi.array(),
            personalityTestScore: celebrate_1.Joi.array()
        })
    }), 
    //middlewares.isAuth,
    // middlewares.attachCurrentUser,
    function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var logger, OnboardingServiceInstance, onboarding, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger = typedi_1.Container.get('logger');
                    logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    OnboardingServiceInstance = typedi_1.Container.get(onboarding_1["default"]);
                    return [4 /*yield*/, OnboardingServiceInstance.addOnboarding(req.body)];
                case 2:
                    onboarding = (_a.sent()).onboarding;
                    return [2 /*return*/, res.status(201).json({ onboarding: onboarding })];
                case 3:
                    e_1 = _a.sent();
                    logger.error('🔥 error: %o', e_1);
                    return [2 /*return*/, next(e_1)];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // If you want to use params to query, this is how you would want to
    // create the route
    route.get('/getOnboarding/:id', 
    // For most routes, include the two lines below. They are commented out
    // here because it does not make sense to have them
    // middlewares.isAuth,
    // middlewares.attachCurrentUser,
    function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var logger, id, OnboardingServiceInstance, onboarding, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger = typedi_1.Container.get('logger');
                    logger.debug('Calling getOnboarding endpoint');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    id = req.params.id;
                    OnboardingServiceInstance = typedi_1.Container.get(onboarding_1["default"]);
                    return [4 /*yield*/, OnboardingServiceInstance.getOnboarding(id)];
                case 2:
                    onboarding = (_a.sent()).onboarding;
                    return [2 /*return*/, res.json({ onboarding: onboarding }).status(200)];
                case 3:
                    e_2 = _a.sent();
                    logger.error('🔥 error: %o', e_2);
                    return [2 /*return*/, next(e_2)];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    route["delete"]('/deleteOnboarding/:id', 
    // For most routes, include the two lines below. They are commented out
    // here because it does not make sense to have them
    // middlewares.isAuth,
    // middlewares.attachCurrentUser,
    function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var logger, OnboardingServiceInstance, onboarding, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger = typedi_1.Container.get('logger');
                    logger.debug('Calling deleteOnboarding endpoint');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    OnboardingServiceInstance = typedi_1.Container.get(onboarding_1["default"]);
                    return [4 /*yield*/, OnboardingServiceInstance.deleteOnboardingByUserID(req.params.id)];
                case 2:
                    onboarding = (_a.sent()).onboarding;
                    return [2 /*return*/, res.json({ onboarding: onboarding }).status(200)];
                case 3:
                    e_3 = _a.sent();
                    logger.error('🔥 error: %o', e_3);
                    return [2 /*return*/, next(e_3)];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    route.patch('/updateOnboarding', 
    // For most routes, include the two lines below. They are commented out
    // here because it does not make sense to have them
    // middlewares.isAuth,
    // middlewares.attachCurrentUser,
    celebrate_1.celebrate({
        body: celebrate_1.Joi.object({
            userID: celebrate_1.Joi.string().required(),
            nickname: celebrate_1.Joi.string(),
            city: celebrate_1.Joi.string(),
            zipcode: celebrate_1.Joi.string(),
            religion: celebrate_1.Joi.string(),
            religionOther: celebrate_1.Joi.string(),
            ethnicity: celebrate_1.Joi.string(),
            sexualOrientation: celebrate_1.Joi.string(),
            identifyYourself: celebrate_1.Joi.string(),
            gender: celebrate_1.Joi.string(),
            genderOther: celebrate_1.Joi.string(),
            pronouns: celebrate_1.Joi.string(),
            pronounsOther: celebrate_1.Joi.string(),
            concerns: celebrate_1.Joi.array(),
            goals: celebrate_1.Joi.array(),
            personalityTestScore: celebrate_1.Joi.array()
        })
    }), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var logger, OnboardingServiceInstance, onboarding, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger = typedi_1.Container.get('logger');
                    logger.debug('Calling updateOnboarding endpoint');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    OnboardingServiceInstance = typedi_1.Container.get(onboarding_1["default"]);
                    return [4 /*yield*/, OnboardingServiceInstance.updateOnboardingByUserID(req.body)];
                case 2:
                    onboarding = (_a.sent()).onboarding;
                    return [2 /*return*/, res.json({ onboarding: onboarding }).status(200)];
                case 3:
                    e_4 = _a.sent();
                    logger.error('🔥 error: %o', e_4);
                    return [2 /*return*/, next(e_4)];
                case 4: return [2 /*return*/];
            }
        });
    }); });
});
