"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeProps = mergeProps;
function pushProp(target, key, value) {
    if (key === 'className') {
        target.className = [target.className, value].join(' ').trim();
    }
    else if (key === 'style') {
        target.style = Object.assign(Object.assign({}, target.style), value);
    }
    else if (typeof value === 'function') {
        const oldFn = target[key];
        target[key] = oldFn ? (...args) => {
            oldFn(...args);
            value(...args);
        } : value;
    }
    else if (value === undefined) {
        return;
    }
    else {
        target[key] = value;
    }
}
function mergeProps(...list) {
    const listLength = list.length;
    if (listLength === 0) {
        return {};
    }
    if (listLength === 1) {
        return list[0];
    }
    return list.reduce((merged, ps) => {
        for (const key in ps) {
            pushProp(merged, key, ps[key]);
        }
        return merged;
    }, {});
}
exports.default = mergeProps;
