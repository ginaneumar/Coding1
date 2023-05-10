
arr = [1,2,3]

push(arr,5)
console.log(arr)

function push(arr, element) {
  arr[arr.length] = element;
  return arr.length;
}
