"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const ava_1 = __importDefault(require("ava"));
(0, ava_1.default)('shallow merge styles with no conflicts', (t) => {
    t.deepEqual((0, _1.default)({ style: { color: 'red' } }, { style: { backgroundColor: 'black' } }), { style: { color: 'red', backgroundColor: 'black' } });
});
(0, ava_1.default)('shallow merge styles with conflicts', (t) => {
    t.deepEqual((0, _1.default)({ style: { color: 'red', backgroundColor: 'blue' } }, { style: { backgroundColor: 'black' } }), { style: { color: 'red', backgroundColor: 'black' } });
});
(0, ava_1.default)('concat class names', (t) => {
    t.deepEqual((0, _1.default)({ className: 'name1' }, { className: 'name2' }), { className: 'name1 name2' });
});
(0, ava_1.default)('chain functions in order', (t) => {
    let count = 0;
    const event1 = () => count += 3;
    const event2 = () => count *= 5;
    const newProps = (0, _1.default)({ onClick: event1 }, { onClick: event2 });
    newProps.onClick();
    t.is(count, 15);
});
(0, ava_1.default)('does not merge other objects', (t) => {
    t.deepEqual((0, _1.default)({ styles: { color: 'red' } }, { styles: { textAlign: 'center' } }), { styles: { textAlign: 'center' } });
});
(0, ava_1.default)('does not merge other strings', (t) => {
    t.deepEqual((0, _1.default)({ namedClass: 'name1' }, { namedClass: 'name2' }), { namedClass: 'name2' });
});
(0, ava_1.default)('returns empty object if no arguments', (t) => {
    t.deepEqual((0, _1.default)(), {});
});
(0, ava_1.default)('returns the only object if only one argument', (t) => {
    t.deepEqual((0, _1.default)({ style: { color: 'red' } }), { style: { color: 'red' } });
});
(0, ava_1.default)('merges multiple objects', (t) => {
    t.deepEqual((0, _1.default)({ style: { color: 'red' } }, { style: { backgroundColor: 'black' } }, { style: { textAlign: 'center' } }), { style: { color: 'red', backgroundColor: 'black', textAlign: 'center' } });
});
(0, ava_1.default)('ignore undefined values', (t) => {
    t.deepEqual((0, _1.default)({ key: { color: 'red' } }, { key: undefined }), { key: { color: 'red' } });
});
