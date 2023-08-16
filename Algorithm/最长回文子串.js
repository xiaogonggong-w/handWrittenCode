// 最长公共子串 -> 

const a = 'cdabcbaiou'

// 中心扩散算法
function long(array) {
   let res = ''
   for (let i = 0; i < array.length; i++) {


      const str1 = bj(array, i, i)

      const str2 = bj(array, i, i + 1)
      res = res.length > str1.length ? res : str1
      res = res.length > str2.length ? res : str2
   }

   return res
}

function bj(s, i, j) {
   while (i >= 0 && j < s.length && s.charAt(i) === s.charAt(j)) {
      i--
      j++
   }
   return s.substring(i + 1, j)
}
console.log(long(a))