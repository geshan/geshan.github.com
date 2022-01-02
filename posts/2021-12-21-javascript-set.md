---
layout: post
title: "How to use JavaScript set type, a beginner's guide"
date: 2021-12-21T21:47:45.000+11:00
comments: true
tags:
- Software Engineering
- Javascript
cover: "/images/javascript-set/01javascript-set.jpg"
pagetitle: "How to use JavaScript set type, a beginner's guide"
description: "Learn how to use JavaScript Set type in ES6 from a beginner's point of view in this easy to follow and understand post."
keywords: javascript set, set javascript, nodejs set

---
JavaScript Sets are a new type of object (with ES6) that allows creating a collection of unique values. The values stored in a set can either be primitives like strings or integers or more complex types like arrays or objects. In this post, we will look into how to use Sets from a beginner’s point of view, let’s get started!

<img class="center" loading="lazy" src="/images/javascript-set/01javascript-set.jpg" title="JavaScript Set a how to use it guide for beginners" alt="JavaScript Set a how to use it guide for beginners">

<!-- more -->

## Table of Contents

  * [Table of Contents](#table-of-contents)
  * [What is a JavaScript Set](#what-is-a-javascript-set)
  * [Remove duplicates from an array using JavaScript set](#remove-duplicates-from-an-array-using-javascript-set)
  * [More usage of JavaScript Set](#more-usage-of-javascript-set)
  * [Compatibility of JavaScript set](#compatibility-of-javascript-set)
  * [Conclusion](#conclusion)

## What is a JavaScript Set

As discussed earlier, JavaScript set is an object that only stores unique values both primitive and complex types. The uniqueness is [compared](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#value_equality) with the `===` operator. JavaScript set is reported to be [faster](https://medium.com/@bretcameron/how-to-make-your-code-faster-using-JavaScript-sets-b432457a4a77) than array’s includes method possibly because the elements in a set are unique. Let’s look at a quick and useful example of removing duplicates from an array using sets.

## Remove duplicates from an array using JavaScript set

If there is a need to remove duplicates from an array, it can be done easily using Sets. We can deduplicate an array easily with the following ES6 code with spread operator:

```js
const arrayWithDuplicateValues = [1, 2, 2, 3, 4, 5, 6, 7, 7, 7, 8, 9];
const uniqueValues = [...new Set(arrayWithDuplicateValues)];

console.log(uniqueValues);
```

The same code can be done without the use of `…` [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) as follows using `Array.from`:

```js
const arrayWithDuplicateValues = [1, 2, 2, 3, 4, 5, 6, 7, 7, 7, 8, 9];
const uniqueValues = Array.from(new Set(arrayWithDuplicateValues));

console.log(uniqueValues);
```

JavaScript Set can be used for more things too, like the one in the next section.

## More usage of JavaScript Set

Another interesting fact about JavaScript Set is that the items are ordered, meaning elements of
the set can be iterated in the insertion order. Below is another quick example:

```js
let set01 = new Set('this is a very long sentence');
console.log(set01); // has 15 unique characters including “ “ space
console.log(set01.size); // 15 - only unique characters
console.log(set01.has('b')); //false
console.log(set01.has('a')); //true

set01.add('b'); //added to the end of the set - order maintained
set01.has('b');// true
set01.delete('b');
set01.has('b');// false again
```

As seen above a JavaScript Set has the `size` attribute that has the length of the Set. Similarly, to add an element the `add` method can be used and to check if a value is in the set the `has` method can be utilized. The delete method can be used to delete an existing element from the set. A JavaScript Set can be iterated through as well, below are some examples:

```js
for (let letter of set01) { 
  console.log(letter); 
}
```

Another way using values method on JavaScript Set is as follows:

```js
const furnitureSet = new Set(['table', 'chair', 'sofa']);
const furnitures = furnitureSet.values();

console.log(furnitures.next()); //{ value: 'table', done: false }
console.log(furnitures.next()); //{ value: 'chair', done: false }
console.log(furnitures.next()); //{ value: 'sofa', done: false }
console.log(furnitures.next().done); //true
```

The other way of showing these values without using the values method can be seen below:

```js
const furnitureSet = new Set(['table', 'chair', 'sofa']);

furnitureSet.forEach(furniture => {
  console.log('Furniture name: ', furniture);
});
// Furniture name:  table
// Furniture name:  chair
// Furniture name:  sofa

```

That was pretty easy with a `foreach` loop that is available on the Set object. If you are interested in other basic set operations like union, intersection, and different please do [read more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#implementing_basic_set_operations) about it.
Next, we will look into the compatibility of using JavaScript Set in the browser and Node.js.

## Compatibility of JavaScript set

JavaScript Set is available on both the browser and Node.js. In Node.js it is [available](https://node.green/#ES2015-built-ins-Set) from version 0.12 and above. For the browser, it is generally [available](https://caniuse.com/mdn-javascript_builtins_set_set) on all modern browsers. It is safe to say JavaScript set can be used in both browsers and Node.js to get the maximum benefits. 

## Conclusion

In this post, we took a quick look at how to use the JavaScript set from a beginner’s point of view. I hope it has helped you understand JavaScript (ES6) Set in a bit more detail and you will be able to use it for many things like getting unique records from a datastore after reading this. Keep learning!
