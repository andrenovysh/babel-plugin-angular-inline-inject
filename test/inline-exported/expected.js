"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TestClass = function TestClass(dependency) {
  _classCallCheck(this, TestClass);
};

TestClass.$inject = ["dependency"]
exports.default = TestClass;