"use strict";
function findDuplicate(paths) {
    var _a;
    let contMap = new Map(), ans = [];
    // Iterate over each path string in the input list
    for (let pStr of paths) {
        let i = 0, j = 0, k = 0;
        // Find the first space, which separates the root directory
        while (pStr.charAt(i) !== ' ')
            i++;
        // Slice the path (root directory)
        let path = pStr.slice(0, i);
        // Iterate over the files in the directory
        for (let j = ++i; i < pStr.length; i++) {
            if (pStr.charAt(i) === '(')
                k = i; // File content starts at '('
            else if (pStr.charAt(i) === ')') {
                // Extracting file name and content
                let pathfile = path + '/' + pStr.slice(j, k), cont = pStr.slice(k + 1, i);
                // Group files with the same content in the map
                if (!contMap.has(cont)) {
                    contMap.set(cont, [pathfile]);
                }
                else {
                    (_a = contMap.get(cont)) === null || _a === void 0 ? void 0 : _a.push(pathfile);
                }
                j = i + 2; // Move past the closing ')'
            }
        }
    }
    // Filter and return only groups of duplicates
    for (let a of contMap.values()) {
        if (a.length > 1)
            ans.push(a);
    }
    return ans;
}
const paths1 = [
    "root/a 1.txt(abcd) 2.txt(efgh)",
    "root/c 3.txt(abcd)",
    "root/c/d 4.txt(efgh)",
    "root 4.txt(efgh)"
];
console.log(findDuplicate(paths1));
const paths2 = [
    "root/a 1.txt(abcd) 2.txt(efgh)",
    "root/c 3.txt(abcd)",
    "root/c/d 4.txt(efgh)"
];
console.log(findDuplicate(paths2));
