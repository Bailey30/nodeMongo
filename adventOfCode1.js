const array = [134, 138, 142, 143, 141, 142, 145, 140]

let x = 0

for (let i = 0; i < array.length; i++) {
    if (array[i]> array[i-1]) {
        x++
    }
   
} 
console.log(x);