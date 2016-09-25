# babel-plugin-angular-inline-inject

Annotates class with **$inject**. See https://docs.angularjs.org/guide/di

Class should be decorated with 'inlineInject'

```javascript
@inlineInject
class TestClass {
  constructor(dependency) {
  }
}

TestClass.$inject = ["dependency"]  //<---------- this line is added by plugin
```
