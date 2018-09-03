import { IAssemblyQualifiedName, parseAssemblyQualifiedName } from "./type-parse";

export enum FormatFlags
{
    ExcludeNamespaces = 0,
    IncludeNamespaces = 1
}

/**
 * @method: parses c#'s "typeof(Type).FullName" back to something that can be read.
 * @param aqn parsed assembly qualified name to format
 */
export function formatType(aqn: IAssemblyQualifiedName, formatFlags : FormatFlags = 0) : string {
    let rv = '';
    if ((formatFlags & FormatFlags.IncludeNamespaces) == FormatFlags.IncludeNamespaces)
    {
        rv += aqn.namespace;
        if (aqn.namespace)
            rv += '.';
    }

    rv += aqn.typeName;
    if (aqn.templateParameters)
    {
        rv += '<';

        for(let i = 0; i < aqn.templateParameters.length; i++)
        {
            if (i > 0)
                rv += ',';

            rv += formatType(aqn.templateParameters[i], formatFlags);
        }

        rv += '>';
    }

    return rv;
}

