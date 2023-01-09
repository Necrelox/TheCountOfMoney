/**
 * Transform an object into a string array of column names
 * @param columns
 * @returns string[]
 */
export function transformColumnsToArray(columns: object) : string[] {
    const columnsArray: string[] = [];
    for (const column in columns) {
        if (typeof columns[column] === 'boolean' && columns[column])
            columnsArray.push(column);
        else if (typeof columns[column] === 'string' && columns[column].length > 0)
            columnsArray.push(columns[column]);
    }
    return columnsArray;
}
