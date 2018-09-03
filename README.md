# csharp-helpers
Some helper methods I find useful for interaction between C# and JavaScript
## Installation 
```sh
npm install csharp-helpers --save
```

## Usage

### Javascript
```javascript
var csharpHelpers = require('csharp-helpers');
var c = csharpHelpers.test('a');
```
```sh
Output should be 'test [a]'
```

### TypeScript
```typescript
import { test } from 'csharp-helpers';
console.log(test('a'))
```
```sh
Output should be 'test [a]'
```

## Test 
```sh
npm run test
```
