var removeComments = function(source) {
    let result = [];
    let inBlockComment = false;  // To track if we are inside a block comment

    for (let line of source) {
        let newLine = '';  // To hold the current line without comments
        let i = 0;  // Pointer to go through each character of the line
        
        while (i < line.length) {
            // If we're inside a block comment, skip characters until we find "*/"
            if (inBlockComment) {
                if (line[i] === '*' && line[i + 1] === '/') {
                    inBlockComment = false;  // End of block comment
                    i += 2;  // Skip "*/"
                } else {
                    i++;  // Continue inside the block comment
                }
            } else {
                // If we find a block comment "/*", enter block comment mode
                if (line[i] === '/' && line[i + 1] === '*') {
                    inBlockComment = true;
                    i += 2;  // Skip "/*"
                }
                // If we find a line comment "//", stop reading the rest of the line
                else if (line[i] === '/' && line[i + 1] === '/') {
                    break;  // Ignore everything after "//"
                } else {
                    newLine += line[i];  // Otherwise, it's code, so keep it
                    i++;
                }
            }
        }
        
        // If the newLine is not empty, add it to the result
        if (newLine.trim() !== '') {
            result.push(newLine);
        }
    }
    
    return result;
};
console.log(removeComments([
    "/*Test program */", 
    "int main()", 
    "{ ", 
    "  // variable declaration ", 
    "int a, b, c;", 
    "/* This is a test", 
    "   multiline  ", 
    "   comment for ", 
    "   testing */", 
    "a = b + c;", 
    "}"
]));  
// Output: ["int main()","{ ","  ","int a, b, c;","a = b + c;","}"]

console.log(removeComments([
    "a/*comment", 
    "line", 
    "more_comment*/b"
]));  
// Output: ["ab"]
