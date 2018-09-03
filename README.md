# csharp-helpers
Some helper methods I find useful for interaction between C# and JavaScript
## Installation 
```sh
npm install csharp-helpers --save
```

## Usage

### parseAssemblyQualifiedName

Parses C#'s `typeof().FullName` Assembly Qualified Name to something readable by machine.

```typescript
import { parseAssemblyQualifiedName } from 'csharp-helpers';
console.log(test('System.IEnumerable`1[[System.Int32, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]]'))
```
```sh
Output is 
{
    namespace: "System",
    typeName: "IEnumerable",
    assembly: undefined,
    templateParameters: [{
        namespace: "System",
        typeName: "Int32",
        assembly: "mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089",
        templateParameters: undefined
    }]
}

```

## Test 
```sh
npm run test
```
