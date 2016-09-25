'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (_ref) {
	var t = _ref.types;

	return {
		visitor: {
			ClassDeclaration: function ClassDeclaration(path) {
				var decorators = path.node.decorators;


				if (decorators && decorators.find(function (_ref2) {
					var expression = _ref2.expression;
					return expression.name === 'inlineInject';
				})) {
					var classBody = path.node.body;


					var ctor = classBody.body.find(function (_ref3) {
						var kind = _ref3.kind;
						return kind === 'constructor';
					});

					if (ctor && ctor.params.length) {
						var injectedDependencies = ctor.params.map(function (x) {
							return t.stringLiteral(x.name);
						});

						var lvalue = t.memberExpression(t.identifier(path.node.id.name), t.identifier('$inject'));
						var rvalue = t.arrayExpression(injectedDependencies);

						path.insertAfter(t.assignmentExpression('=', lvalue, rvalue));
					}
				}
			}
		}
	};
};