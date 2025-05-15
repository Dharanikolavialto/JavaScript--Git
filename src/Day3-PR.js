var findDuplicate = function(paths) {
    let contMap = new Map(), ans = []

    // Iterative over each path string in the input list
    for (let pStr of paths) {
        let i=0,j,k;

        // Finding the first space, which separates the root directory
        while (pStr.charAt(i) !== ' ') i++;

        // slice the path 
        let path=pStr.slice(0,i);

        // Iterative over the files in the directory
        for (let j = ++i; i < pStr.length; i++) {
            if (pStr.charAt(i) === '(') k=i;    // Filw content starts at '('
            else if (pStr.charAt(i) === ')') {
                
                // Extracting file name and content
                let pathfile = path + '/'+pStr.slice(j,k),
                cont = pStr.slice(k+1,i);

                // Group files with the same content in the map
                if (!contMap.has(cont))
                    contMap.set(cont, [pathfile]);
                else contMap.get(cont).push(pathfile);
                j=i+2;      // Move past the closing ')'
            }
            
        }
    }

    // Filter and return only groups of duplicates
    for(let a of contMap.values())
        if (a.length>1) ans.push(a);

    return ans;
};

const paths1 = ["root/a 1.txt(abcd) 2.txt(efgh)", "root/c 3.txt(abcd)", "root/c/d 4.txt(efgh)", "root 4.txt(efgh)"];
console.log(findDuplicate(paths1));

const paths2 = ["root/a 1.txt(abcd) 2.txt(efgh)", "root/c 3.txt(abcd)", "root/c/d 4.txt(efgh)"];
console.log(findDuplicate(paths2));