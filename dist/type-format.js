"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormatFlags;
(function (FormatFlags) {
    FormatFlags[FormatFlags["ExcludeNamespaces"] = 0] = "ExcludeNamespaces";
    FormatFlags[FormatFlags["IncludeNamespaces"] = 1] = "IncludeNamespaces";
})(FormatFlags = exports.FormatFlags || (exports.FormatFlags = {}));
/**
 * @method: parses c#'s "typeof(Type).FullName" back to something that can be read.
 * @param aqn assembly qualified name to parse
 */
function formatType(aqn, formatFlags) {
    if (formatFlags === void 0) { formatFlags = 0; }
    var rv = '';
    if ((formatFlags & FormatFlags.IncludeNamespaces) == FormatFlags.IncludeNamespaces) {
        rv += aqn.namespace;
        if (aqn.namespace)
            rv += '.';
    }
    rv += aqn.typeName;
    if (aqn.templateParameters) {
        rv += '<';
        for (var i = 0; i < aqn.templateParameters.length; i++) {
            if (i > 0)
                rv += ',';
            rv += formatType(aqn.templateParameters[i], formatFlags);
        }
        rv += '>';
    }
    return rv;
}
exports.formatType = formatType;
//# sourceMappingURL=type-format.js.map