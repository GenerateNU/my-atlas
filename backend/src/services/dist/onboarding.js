"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
var typedi_1 = require("typedi");
var eventDispatcher_1 = require("@/decorators/eventDispatcher");
var OnboardingService = /** @class */ (function () {
    function OnboardingService(
    // Add here whatever services/models you need here
    onboardingModel, logger, eventDispatcher) {
        this.onboardingModel = onboardingModel;
        this.logger = logger;
        this.eventDispatcher = eventDispatcher;
    }
    OnboardingService.prototype.addOnboarding = function (onboardingInputDTO) {
        return __awaiter(this, void 0, Promise, function () {
            var onboardingRecord, onboarding, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.logger.debug(onboardingInputDTO);
                        return [4 /*yield*/, this.onboardingModel.create(__assign({}, onboardingInputDTO))];
                    case 1:
                        onboardingRecord = _a.sent();
                        this.logger.debug("Here");
                        onboarding = onboardingRecord.toObject();
                        return [2 /*return*/, { onboarding: onboarding }];
                    case 2:
                        e_1 = _a.sent();
                        this.logger.error(e_1);
                        throw e_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Gets the onboarding information associated with the given userID (not the 
    // objectID)
    OnboardingService.prototype.getOnboarding = function (userID) {
        return __awaiter(this, void 0, Promise, function () {
            var onboardingRecord, onboarding, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.onboardingModel.findOne({ userID: userID })];
                    case 1:
                        onboardingRecord = _a.sent();
                        onboarding = onboardingRecord.toObject();
                        return [2 /*return*/, { onboarding: onboarding }];
                    case 2:
                        e_2 = _a.sent();
                        this.logger.error(e_2);
                        throw e_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Deletes the onboarding information associated with the given userID (not the 
    // objectID). Returns a message if successfully deleted onboarding information from the database
    OnboardingService.prototype.deleteOnboardingByUserID = function (userID) {
        return __awaiter(this, void 0, Promise, function () {
            var onboardingRecord, message, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.onboardingModel.deleteOne({ userID: userID })];
                    case 1:
                        onboardingRecord = _a.sent();
                        message = "Successfully deleted onboarding inforomation associated with user " + userID;
                        return [2 /*return*/, { message: message }];
                    case 2:
                        e_3 = _a.sent();
                        this.logger.error(e_3);
                        throw e_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OnboardingService.prototype.updateOnboardingByUserID = function (onboardingInputDTO) {
        return __awaiter(this, void 0, Promise, function () {
            var userID, onboardingRecord, onboarding, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userID = onboardingInputDTO.userID;
                        return [4 /*yield*/, this.onboardingModel.findOneAndUpdate({ userID: userID }, onboardingInputDTO, {
                                "new": true
                            })];
                    case 1:
                        onboardingRecord = _a.sent();
                        onboarding = onboardingRecord.toObject();
                        return [2 /*return*/, { onboarding: onboarding }];
                    case 2:
                        e_4 = _a.sent();
                        this.logger.error(e_4);
                        throw e_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OnboardingService = __decorate([
        typedi_1.Service(),
        __param(0, typedi_1.Inject('onboardingModel')),
        __param(1, typedi_1.Inject('logger')),
        __param(2, eventDispatcher_1.EventDispatcher())
    ], OnboardingService);
    return OnboardingService;
}());
exports["default"] = OnboardingService;
