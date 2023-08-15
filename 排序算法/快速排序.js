// 快速排序

// 从数列中挑出一个元素,为基准

// 重新排列数组,所有的元素比基准值小的摆放在基准前面,所有元素比基准值大的摆在基准后面.

const arr = [6, 1, 2, 7, 9, 3, 4, 5, 10, 8]
function quickSort(arr, low, high) {
    if (low > high) return
    // 找到基准
    let pivot = arr[low] // 以第一个作为基准
    let start = low
    let end = high
    while (start < end) {
        while (start < end && arr[end] > pivot) { // 先比较后面的,如果后面的值大于基准,high就向前移
            --end
        }
        while (start < end && arr[start] <= pivot) { // 现在比较前面的,如果比基准值小的话就向后移
            ++start
        }
        if (start < end) {
            [arr[start], arr[end]] = [arr[end], arr[start]]
        }
    }
    arr[low] = arr[start]
    arr[start] = pivot
    quickSort(arr, low, start - 1)
    quickSort(arr, start + 1, high)
    return arr
}

console.log(quickSort(arr, 0, arr.length - 1))
