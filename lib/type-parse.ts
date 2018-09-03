export interface IAssemblyQualifiedName
{
    namespace?: string;
    typeName: string;
    assembly?: string;
    templateParameters?: IAssemblyQualifiedName[];
}

/**
 * @method: parses c#'s "typeof(Type).FullName" back to something that can be read.
 * @param aqn assembly qualified name to parse
 */
export function parseAssemblyQualifiedName(aqn: string) : IAssemblyQualifiedName {
    return {
        typeName: ''
    };
}