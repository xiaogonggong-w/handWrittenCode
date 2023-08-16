const a = 'level'

function validPalindrome(str){
    let len = Math.ceil((str.length - 1) / 2);
    let i = 0, j = str.length - 1;
    
    while(len >= 0 ){
        if(str[i] !== str[j]){
            return false
        }

        if(str[i] === str[j] && len === 0) return true

        len--
        i++
        j--
    }
}

console.log(validPalindrome(a))