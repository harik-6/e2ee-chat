"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    private_key: {
        type: String,
        required: true
    },
    public_key: {
        type: String,
        required: true
    }
}, {
    collection: "users"
});
const userModel = mongoose_1.default.model('User', userSchema);
exports.default = userModel;
//# sourceMappingURL=user.model.js.map