"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _parseName = /(([a-zA-Z0-9\.]*)\.)?(([a-zA-Z0-9]*)(`\d+)?)(\[(.*)\])?(, (.*))?/;
var _namespaceGroup = 2;
var _typeNameGroup = 4;
var _templateParametersGroup = 7;
var _assemblyGroup = 9;
var _unknownType = {
    typeName: "?"
};
// finds ']' for opening '['
function _indexOfBalancedPar(c) {
    var depth = 0;
    for (var i = 0; i < c.length; i++) {
        if (c[i] == '[') {
            ++depth;
        }
        else if (c[i] == ']') {
            if (--depth == 0)
                return i;
        }
    }
    return 0;
}
// from [a[blah]],[b],[c] does ('a[blah]', '[b],[c]')
function _carCdr(parameters) {
    var rightPar = _indexOfBalancedPar(parameters);
    if (rightPar === -1)
        return ['', ''];
    return [
        parameters.substring(1, rightPar),
        parameters.substr(rightPar + 2)
    ];
}
// calls [a[blah]],[b],[c] to paqn(a[blah]),paqn(b),paqn(c)
function _parseTemplateParameters(parameters) {
    if (!parameters)
        return undefined;
    var ret = [];
    var par = parameters;
    while (par.length > 0) {
        var _a = _carCdr(par), head = _a[0], tail = _a[1];
        ret.push(parseAssemblyQualifiedName(head));
        par = tail;
    }
    return ret;
}
/**
 * @method: parses c#'s "typeof(Type).FullName" back to something that can be read.
 * @param aqn assembly qualified name to parse
 */
function parseAssemblyQualifiedName(aqn) {
    var parsed = _parseName.exec(aqn);
    if (parsed) {
        return {
            namespace: parsed[_namespaceGroup],
            typeName: parsed[_typeNameGroup],
            assembly: parsed[_assemblyGroup],
            templateParameters: _parseTemplateParameters(parsed[_templateParametersGroup])
        };
    }
    else {
        return _unknownType;
    }
}
exports.parseAssemblyQualifiedName = parseAssemblyQualifiedName;
//# sourceMappingURL=type-parse.js.map