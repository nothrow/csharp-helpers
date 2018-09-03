export interface IAssemblyQualifiedName
{
    namespace?: string;
    typeName: string;
    assembly?: string;
    templateParameters?: IAssemblyQualifiedName[];
}

const _parseName = /(([a-zA-Z0-9\.]*)\.)?(([a-zA-Z0-9]*)(`\d+)?)(\[(.*)\])?(, (.*))?/
const _namespaceGroup = 2;
const _typeNameGroup = 4;
const _templateParametersGroup = 7;
const _assemblyGroup = 9;

const _unknownType : IAssemblyQualifiedName = {
    typeName: "?"
};


// finds ']' for opening '['
function _indexOfBalancedPar(c: string)
{
    let depth = 0;
    for(let i = 0; i < c.length; i++)
    {
        if (c[i] == '[')
        {
            ++depth;
        }
        else if (c[i] == ']')
        {
            if (--depth == 0)
                return i;
        }
    }
    return 0;
}

// from [a[blah]],[b],[c] does ('a[blah]', '[b],[c]')
function _carCdr(parameters: string) : [string, string] {
    const rightPar = _indexOfBalancedPar(parameters);
    if (rightPar === -1)
        return ['', ''];
    return [
        parameters.substring(1, rightPar),
        parameters.substr(rightPar + 2)
    ];
}

// calls [a[blah]],[b],[c] to paqn(a[blah]),paqn(b),paqn(c)
function _parseTemplateParameters(parameters: string) : (IAssemblyQualifiedName[] | undefined) {
    if (!parameters)
        return undefined;

    const ret: IAssemblyQualifiedName[] = [];

    let par = parameters;
    while(par.length > 0)
    {
        const [head, tail] = _carCdr(par);

        ret.push(parseAssemblyQualifiedName(head));
        par = tail;
    }

    return ret;
}

/**
 * @method: parses c#'s "typeof(Type).FullName" back to something that can be read.
 * @param aqn assembly qualified name to parse
 */
export function parseAssemblyQualifiedName(aqn: string) : IAssemblyQualifiedName {
    const parsed = _parseName.exec(aqn);

    if (parsed)
    {
        return {
            namespace: parsed[_namespaceGroup],
            typeName: parsed[_typeNameGroup],
            assembly: parsed[_assemblyGroup],
            templateParameters: _parseTemplateParameters(parsed[_templateParametersGroup])
        };
    }
    else
    {
        return _unknownType;
    }
}