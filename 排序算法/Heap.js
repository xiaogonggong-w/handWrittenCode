// 堆排序
// 本质就是一颗树
// 每个节点的值都大于或等于其子节点的值,为最大堆,反之为最小堆

// 数组存储, 下标为i的结点的父结点下标(i - 1) / 2,其左右子结点分别为(2i+1)、(2i-1)

// 基本思想

// 利用大顶堆(小顶堆)堆顶记录的最大关键字(最小关键字)这一特性,使得每次从无序中选择最大记录(最小记录)变得简单

// 1.如何由一个无序序列建成一个堆?
// 2.如何在输出堆顶元素之后,调整剩余元素成为一个新的堆?

// 不稳定, 复杂度(o(nlogn))
const arr = [9,1,2,8,7,3,4,6,5]
let len;

function HeadSort(arr){     
    // 第一步:构建堆
    buildHeap(arr);

    // 进行排序
    for (let index = arr.length - 1; index > 0; index--) {
        // 先将最后一个叶子节点和根节点的值交换
        [arr[index], arr[0]] = [arr[0], arr[index]]

        // 交换之后需要重新构建这个堆
        len --
        heapify(arr, 0)
        
    }
   
    return arr

}

function buildHeap(arr){
    // 获取数组长度
    len = arr.length;

    let start = Math.floor(len / 2)

    for (let index = start; index >=0; index--) {
        heapify(arr, index)   
    }
}


function heapify(arr, i ){
    
    let left = 2 * i + 1, // 左节点
          right = 2 * i +2, // 右节点
          root = i //根节点

    if(left < len && arr[left] < arr[root]){
        root = left
    }

    if(right < len && arr[right] < arr[root]){
        root = right
    }

    // 如果i和root不想等了,就需要重新调整一下
    if(root !== i){
        // 先将像个值交换
        [ arr[root], arr[i] ]=[arr[i], arr[root]];
        // 是不是有子节点
        heapify(arr, root)
    }

}

console.log(HeadSort(arr))