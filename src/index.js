export default ({ types: t }) => {
	return {
		visitor: {
			ClassDeclaration(path) {
				const { decorators } = path.node;

				if (decorators && decorators.find(({ expression }) => expression.name === 'inlineInject')) {
					const { body: classBody } = path.node;

					const ctor = classBody.body.find(({ kind }) => kind === 'constructor');

					if(ctor && ctor.params.length) {
						const injectedDependencies = ctor.params.map(x => t.stringLiteral(x.name));

						const lvalue = t.memberExpression(t.identifier(path.node.id.name), t.identifier('$inject'));
						const rvalue = t.arrayExpression(injectedDependencies);

						path.insertAfter(t.assignmentExpression('=', lvalue, rvalue));
					}
				}
			}
		}
	}
}