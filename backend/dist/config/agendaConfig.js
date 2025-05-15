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
exports.agendaInstance = void 0;
const agenda_1 = __importDefault(require("agenda"));
exports.agendaInstance = new agenda_1.default({
    db: { address: process.env.MONGO_URL }
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.agendaInstance.start();
        console.log('Agenda started successfully.');
    }
    catch (error) {
        console.error('Error starting Agenda:', error);
    }
}))();
