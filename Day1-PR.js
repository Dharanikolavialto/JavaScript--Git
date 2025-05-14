function longestPalindrome(s) {
    if (s.length <= 1) return s;

    let start = 0;
    let length = 0;

    // Helper function to check palindromes centered at a specific points

    function palindromeChecker(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        // Update the starting index and length if we find a Longer palindrome

        if (right - left - 1 > length) {
            start = left + 1;
            length = right - left - 1;
        }
    }

    // Loop over each character in the string, checking for palindrome

    for (let i = 0; i < s.length; i++) {
        palindromeChecker(i, i);             // Odd-length palindrome
        palindromeChecker(i, i + 1);        // Even-length palindrome
    }

    return s.substring(start, start + length);
}

console.log(longestPalindrome("abcde"));       //a
console.log(longestPalindrome("babad"));      //bab or aba
console.log(longestPalindrome("cbbd"));      //bb
console.log(longestPalindrome("a"));        //a
