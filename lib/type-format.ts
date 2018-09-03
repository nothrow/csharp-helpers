import { IAssemblyQualifiedName } from "./type-parse";

export enum FormatFlags
{
    IncludeNamespaces = 0,
    ExcludeNamespaces = 1
}

/**
 * @method: parses c#'s "typeof(Type).FullName" back to something that can be read.
 * @param aqn assembly qualified name to parse
 */
export function formatType(aqn: IAssemblyQualifiedName) : string {
    return "";
}

