"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Onboarding = new mongoose_1["default"].Schema({
    userID: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    nickname: {
        type: String
    },
    city: {
        type: String
    },
    zipcode: {
        type: Number
    },
    religion: {
        type: String,
        "enum": ['None', 'Protestant', 'Catholic', 'Jewish', 'Muslim', 'Buddhist', 'Hindu']
    },
    religionOther: String,
    sexualOrientation: {
        type: String
    },
    ethnicity: {
        type: String
    },
    identifyYourself: String,
    gender: {
        type: String,
        "enum": ['Male', 'Female', 'NonBinary']
    },
    genderOther: String,
    pronouns: {
        type: String,
        "enum": ['He/Him', 'She/Her']
    },
    pronounsOther: String,
    concerns: {
        type: [String],
        "default": undefined
    },
    goals: {
        type: [String],
        "default": undefined
    },
    personalityTestScore: {
        type: [Number],
        "default": undefined,
        validate: [arrayLength, 'Five Numbers are required']
    }
}, { timestamps: true });
// Check that the array length is 5
function arrayLength(val) {
    return val.length == 0;
}
exports["default"] = mongoose_1["default"].model('Onboarding', Onboarding);
