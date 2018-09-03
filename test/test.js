'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

describe('parseAssemblyQualifiedName function test', () => {
    it('simple type name', () => {
        var result = index.parseAssemblyQualifiedName("System.Int32, mscorlib.blah.blah");
        expect(result).to.deep.equal({
            namespace: "System",
            typeName: "Int32",
            assembly: "mscorlib.blah.blah",
            templateParameters: undefined
        });
    });

    it('complex type name', () => {
        var result = index.parseAssemblyQualifiedName("System.IEnumerable`1[[System.Int32, mscorlib.blah.blah]], mscorlib.blah.blah");
        expect(result).to.deep.equal({
            namespace: "System",
            typeName: "IEnumerable",
            assembly: "mscorlib.blah.blah",
            templateParameters: [{
                namespace: "System",
                typeName: "Int32",
                assembly: "mscorlib.blah.blah",
                templateParameters: undefined
            }]
        });
    });

    it('even more complex type name', () => {
        var result = index.parseAssemblyQualifiedName("System.Collections.Generic.IEnumerable`1[[System.Collections.Generic.KeyValuePair`2[[System.Collections.Generic.KeyValuePair`2[[System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089],[System.Int32, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]], mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089],[System.Int32, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]], mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]]");
        expect(result).to.deep.equal({
            assembly: undefined,
            namespace: "System.Collections.Generic",
            typeName: "IEnumerable",
            templateParameters: [{
                namespace: "System.Collections.Generic",
                typeName: "KeyValuePair",
                assembly: "mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089",
                templateParameters: [
                    {
                        namespace: "System.Collections.Generic",
                        typeName: "KeyValuePair",
                        assembly: "mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089",
                        templateParameters: [
                            {
                                namespace: "System",
                                typeName: "String",
                                assembly: "mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089",
                                templateParameters: undefined
                            },
                            {
                                namespace: "System",
                                typeName: "Int32",
                                assembly: "mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089",
                                templateParameters: undefined
                            }
                        ]
                    },
                    {
                        namespace: "System",
                        typeName: "Int32",
                        assembly: "mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089",
                        templateParameters: undefined
                    }
                ]
            }]
        });
    })
});


describe("formatType function test", () => {
    const object = {
        assembly: undefined,
        namespace: "System.Collections.Generic",
        typeName: "IEnumerable",
        templateParameters: [{
            namespace: "System.Collections.Generic",
            typeName: "KeyValuePair",
            assembly: "mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089",
            templateParameters: [
                {
                    namespace: "System.Collections.Generic",
                    typeName: "KeyValuePair",
                    assembly: "mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089",
                    templateParameters: [
                        {
                            namespace: "System",
                            typeName: "String",
                            assembly: "mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089",
                            templateParameters: undefined
                        },
                        {
                            namespace: "System",
                            typeName: "Int32",
                            assembly: "mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089",
                            templateParameters: undefined
                        }
                    ]
                },
                {
                    namespace: "System",
                    typeName: "Int32",
                    assembly: "mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089",
                    templateParameters: undefined
                }
            ]
        }]
    };

    it('with namespaces', () => {
        var result = index.formatType(object, index.FormatFlags.IncludeNamespaces);
        expect(result).to.equal("System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<System.Collections.Generic.KeyValuePair<System.String,System.Int32>,System.Int32>>");
    })

    it('without namespaces', () => {
        var result = index.formatType(object, index.FormatFlags.ExcludeNamespaces);
        expect(result).to.equal("IEnumerable<KeyValuePair<KeyValuePair<String,Int32>,Int32>>");
    })
});