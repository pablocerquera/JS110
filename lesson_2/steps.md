Action => Performed On => Side Effect => Return Value => is Return Value Used?

Example 4
variable declaration and assign => n/a => none => declaration always evaluates to `undefined` => no 

Method call `.forEach` => called on outer Array => None => `undefined` => will be assigned to `myArr`

outer callback execution => each sub-array => none => `[undefined, undefined]` => no

Method call `.map` => called on inner Array => none => `undefined` => Yes returned to the outer callback

inner calleback execution => element of the sub-array in the iteration => none => `undefined` => yes used to transform the array

comparison `(>)` => element of the sub-aray in that iteration => none => Boolean => yes evaluated by `if`

method call `console.log` => element of the sub-array in that iteration => Outputs a string representation of a Number => `undefined` => Yes used to determine return value of inner callback



Action => Performed On => Side Effect => Return Value => is Return Value Used?

Example 5
method call `.map` => `[[1,2][3,4]]` => none => transformation of the next callback => no

outer callback execution => each sub-array => none => transformed array => yes used by the top level `map` for transformation

method call `.map` => on inner array => none => current iteration * `2` => yes returned by the outer callback

inner callback execution => element of the sub array in the iteration => none => a number => yes returned by the inner callback


Action => Performed On => Side Effect => Return Value => is Return Value Used?

Example 6
method call `.filter` => original array => none => a filtered array from the next callback => no

outer callback execution => each sub-object => none => transformed array => yes to transform the top level array

method call `.keys` => each sub-object => none => an array of the objects keys => to iterate over for the next method call

method call `.every` => the array of keys => none => boolean => evaluate if the first letter of the value is the same as the key

inner callback execution => the array of keys => none => new array of the object that met the criteria => passed to the outer callback


Action => Performed On => Side Effect => Return Value => is Return Value Used?

Example 7
method call `.map` => original array => none => filtered array => no

outer callback execution => each sub-array => none => filtering the array => filtered array => yes returning the filtered arrays back to top layer

method call `.filter` => inner array => none => modified array => yes to filter our array

inner callback execution => inner array => none => boolean => filter our array

comparison (===) => element of the sub-array => none => boolean => yes `if` evaluated will return another boolean 

comparison (>) => element of the sub-array => none => boolean => yes returns element that meets criteria

else => element of sub array that did not return true => boolean => none => yes if the element meets the criteria


Action => Performed On => Side Effect => Return Value => is Return Value Used?

Example 9
Method call `.map` => original array => none => the `return` of the next callback => no

outer callback execution => each sub-array => none => arrays => yes, used by `.map` in the outer callback

method call `.map` => inner array => none => new arrays => yes, used by `.map` 

inner callback execution => each element in the sub-array => none => boolean => yes for the inner callback return value to the outer callback

comparison `===` => each element in the sub-array => none => element + `1` => yes, return it to the inner callback

`else` statement =>  each element in the the sub array  => none => number => yes, return it to the inner callback

method call `.map` => the array within the element of the inner array => none => number => yes, return it to the inner inner callback

inner inner callback execution => each element in the sub sub array =>  none => number + 1 => yes returned back to the inner inner callback.