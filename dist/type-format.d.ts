import { IAssemblyQualifiedName } from "./type-parse";
export declare enum FormatFlags {
    ExcludeNamespaces = 0,
    IncludeNamespaces = 1
}
/**
 * @method: parses c#'s "typeof(Type).FullName" back to something that can be read.
 * @param aqn assembly qualified name to parse
 */
export declare function formatType(aqn: IAssemblyQualifiedName, formatFlags?: FormatFlags): string;
