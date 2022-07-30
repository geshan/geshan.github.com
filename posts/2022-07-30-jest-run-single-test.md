---
layout: post
title: "Two useful ways to easily run a single test using Jest"
date: 2022-07-30T23:10:32.000+11:00
comments: true
tags:
- Javascript
- Jest
- Software Engineering
cover: "/images/jest-run-single-test/01jest-run-single-test.jpg"
pagetitle: "Two useful ways to easily run a single test using Jest"
description: Easily run a single test using Jest with .only or -t CLI paramter. They are also useful to run specific tests.
keywords: jest run single test, jest run a single test, how to run single test in jest, how to run single test using jest

---
Jest has been the tool of choice for writing tests in JavaScript for years now. This guide will teach you how to run a single test using Jest. Let’s get going!

<!-- more -->

<img class="center" loading="lazy" src="/images/jest-run-single-test/01jest-run-single-test.jpg" title="How to run a single test using Jest" alt="How to run a single test using Jest">


## Table of contents

* [Example tests](#example-tests)
* [Using only on the test](#using-only-on-the-test)
* [Using  -t when running tests](#using--t-when-running-tests)
* [Code Coverage for a single file and specific tests](#code-coverage-for-a-single-file-and-specific-tests)
* [Conclusion](#conclusion)

## Example tests

For this tutorial, the example will have tests for two modules `books.js` and `helper.js` in two respective test files. The script calls the Open library API’s Subjects endpoint and logs the titles of the books for a given subject. You can view the code in this [GitHub repository](https://github.com/geshan/jest-tohavebeencalledwith). The same example was also used for the [Jest toHaveBeenCalledWith](/blog/2022/07/jest-tohavebeencalledwith/) blog post.

This repo has 2 test files. First one is for the `books.js` module. And the second one is,  Jest tests for the `helper.js` that plucks the books’ titles from the given data found at `test/helper.spec.js`. The contents of this file is as follows:

 ```js
const helper = require('../src/helper');

describe('Helper', () => {
  describe('pluckTitles', () => {
    it('should return book titles for given data', () => {
      const data = {
        name: 'javascript',
        works: [{
          title: 'JavaScript: The Good Parts',
        }, {
          title: 'JavaScript: The Definitive Guide',
        }]
      };
      const titles = helper.pluckTitles(data);
      expect(titles.length).toBe(2);
      expect(titles).toEqual(['JavaScript: The Good Parts', 'JavaScript: The Definitive Guide']);
    });

    it('should return empty array if no data is found', () => {
      const data = {
        name: 'asdfj',
        works: []
      };
      const titles = helper.pluckTitles(data);
      expect(titles).toEqual([]);
    });
  });
});
```

The first task is to run a single test within a file, you will learn how to do it in the next part.

## Using only on the test

If you are in the IDE and want to run only a single test be it a `describe` or `it`, it can be done by adding a `.only` after the `describe` or the `it`. The caveat here is that only will only apply in the context of that file. For instance, in the above example of  `test/helper.spec.js` a `.only` can be added to the last test titled `should return an empty array if no data is found` as:

```js
it.only('should return empty array if no data is found', () => {
```

When the full test suite is run with `npm test -- --verbose`, it will yield the following output:

```bash
npm test -- --verbose

> jest-tohavebeencalledwith@1.0.0 test
> jest "--verbose"

 PASS  test/books.spec.js
  Books
    getTitlesBySubject
      ✓ should return book titles for given subject (3 ms)
      ✓ should log error if any error occurs while getting books for given subject (3 ms)

 PASS  test/helper.spec.js
  Helper
    pluckTitles
      ✓ should return empty array if no data is found (1 ms)
      ○ skipped should return book titles for given data

Test Suites: 2 passed, 2 total
Tests:       1 skipped, 3 passed, 4 total
Snapshots:   0 total
Time:        0.199 s, estimated 1 s
Ran all test suites.
```

The `--verbose` CLI parameter is used to show a verbose output with the test names. The `--` parameter after `npm test` passes the CLI params to the original jest command defined in the package.json `test` script.

The other test in the same file `helper.spec.js`  titled `should return book titles for given data` has been skipped and the test that has the `.only` added has only run. Still, the two other tests from the `books.spec.js` have run. Hence it proves that adding the `.only` works on in the file’s scope not the context of the full test suite.

To make it run a single test with Jest having more specific control, the tests can be run for only that file with

```bash
npm test -- test/helper.spec.js --verbose
```

The above command is equivalent to `npm test -- --testPathPattern test/helper.spec.js --verbose` where the [testPathPattern](https://jestjs.io/docs/cli#--testpathpatternregex) parameter available in Jest CLI is used. It does a regexp pattern match of paths before running tests, so other tests are ignored and only the tests for `test/helper.spec.js` is executed which yields:

```bash
npm test -- test/helper.spec.js --verbose

> jest-tohavebeencalledwith@1.0.0 test
> jest "test/helper.spec.js" "--verbose"

 PASS  test/helper.spec.js
  Helper
    pluckTitles
      ✓ should return empty array if no data is found (1 ms)
      ○ skipped should return book titles for given data

Test Suites: 1 passed, 1 total
Tests:       1 skipped, 1 passed, 2 total
Snapshots:   0 total
Time:        0.153 s, estimated 1 s
```

With the combination of [it.only](https://jestjs.io/docs/api#testonlyname-fn-timeout) and `--testPathPattern` you learned how to run a single test in Jest. Consequently an easier way will be unraveled to get the same output without changing the test file.

## Using  -t when running tests

Another easier way to run a specific or single test with Jest without changing the code is by using the [testNamePattern](https://jestjs.io/docs/cli#--testnamepatternregex) CLI parameter. It has an alias of `-t` to run only tests with a name that matches the given regex pattern. 

Again, let’s target the same test with the name `should return empty array if no data is found` without adding the `.only` to the test code. It can be done with:

```bash
npm test -- -t 'should return empty array if no data is found' --verbose
```

Running the above command will show the following output:

```bash
npm test -- -t 'should return empty array if no data is found' --verbose

> jest-tohavebeencalledwith@1.0.0 test
> jest "-t" "should return empty array if no data is found" "--verbose"

 PASS  test/helper.spec.js
  Helper
    pluckTitles
      ✓ should return empty array if no data is found (1 ms)
      ○ skipped should return book titles for given data

Test Suites: 1 skipped, 1 passed, 1 of 2 total
Tests:       3 skipped, 1 passed, 4 total
Snapshots:   0 total
Time:        0.239 s, estimated 1 s
Ran all test suites with tests matching "should return empty array if no data is found".
```

As the last line of the output says, Jest has only run specific tests that matched the given test pattern. This technique can also run unwanted tests if two or more tests have been named the same, follow the same pattern, or have the same beginning. Therefore to make sure only a single test or one specific test is run, it can be done by adding the `--testPathPattern` parameter to the CLI.

The above example after adding the `--testPathPattern` will look like this:

```bash
npm test -- -t 'should return empty array if no data is found' --testPathPattern helper.spec.js --verbose
```

It will also show the same output as above because in this small example there is no test name clash. In case you have a large test suite of 10s or even 100s of tests, names of tests being similar or even the same can be a common occurrence.

 The main catch here is the more specific the Jest CLI command is run with the right mix of parameters, it will most likely run a single test. In the next section, as a bonus to this learning, you will understand how to show the test coverage even when running specific tests.

## Code Coverage for a single file and specific tests

The code coverage of the whole test suite for all the source files can be seen by running:

```bash
npm test -- --coverage --verbose
```

The above command yields output like the below:

```bash
npm test -- --coverage --verbose

> jest-tohavebeencalledwith@1.0.0 test
> jest "--coverage" "--verbose"

 PASS  test/helper.spec.js
  Helper
    pluckTitles
      ✓ should return book titles for given data (1 ms)
      ✓ should return empty array if no data is found (1 ms)

 PASS  test/books.spec.js
  Books
    getTitlesBySubject
      ✓ should return book titles for given subject (2 ms)
      ✓ should log error if any error occurs while getting books for given subject (3 ms)

-----------|---------|----------|---------|---------|-------------------
File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------|---------|----------|---------|---------|-------------------
All files  |     100 |      100 |     100 |     100 |                   
 books.js  |     100 |      100 |     100 |     100 |                   
 helper.js |     100 |      100 |     100 |     100 |                   
-----------|---------|----------|---------|---------|-------------------
Test Suites: 2 passed, 2 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        0.237 s, estimated 1 s
Ran all test suites.
```

Generally, as you are writing a test for a specific module, class, or even a function the need is to know how much code coverage is this particular test adding. That is why the command below gives you a better understanding of the code coverage improvement achieved by the specific test you are writing:

```bash
npm test --  --coverage --collectCoverageFrom src/helper.js ----testPathPattern helper.spec.js -t 'should return empty array if no data is found' --verbose
```

The above command when run will give the following output:

```bash
npm test --  --coverage --collectCoverageFrom src/helper.js ----testPathPattern helper.spec.js -t 'should return empty array if no data is found' --verbose

> jest-tohavebeencalledwith@1.0.0 test
> jest "--coverage" "--collectCoverageFrom" "src/helper.js" "----testPathPattern" "helper.spec.js" "-t" "should return empty array if no data is found" "--verbose"

 PASS  test/helper.spec.js
  Helper
    pluckTitles
      ✓ should return empty array if no data is found (1 ms)
      ○ skipped should return book titles for given data

-----------|---------|----------|---------|---------|-------------------
File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------|---------|----------|---------|---------|-------------------
All files  |      60 |       75 |      50 |      75 |                   
 helper.js |      60 |       75 |      50 |      75 | 6                 
-----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       1 skipped, 1 passed, 2 total
Snapshots:   0 total
Time:        0.195 s, estimated 1 s
Ran all test suites matching /helper.spec.js/i with tests matching "should return empty array if no data is found".
```
So, the single test ran with the name `should return an empty array if no data is found` within `helper.spec.js` to get coverage from `src/helper.js` covers all lines of the helper.js module except line 6. Line no. 6 is covered by another test in the same file.

Here, you learned about the [--collectCoverageFrom](https://jestjs.io/docs/cli#--collectcoveragefromglob) CLI parameter of Jest which tells Jest to match the files from where coverage information should be collected relative to the root directory.

If you think the commands are long, you can create a helper script on package.json like:

```js
"test:pat": "npm test -- --runInBand --verbose --t"
```

Pat is short for pattern, and run it like:

```bash
npm run test:pat 'should return empty array if no data is found'
```

It will run the tests that match the given pattern without the need to type all that long command. Similarly, you can slap in a `--watch` after the above command to make it run on each file save, which is very helpful while writing tests.

## Conclusion

In this tutorial, you learned how to run single or specific tests with Jest by using either `.only` or `-t` CLI parameter. Both those options can be used too. After that, the `--testPathPattern` Jest CLI parameter was discussed to target tests written on a specific file. 

Subsequently, the  `--coverage` and  `--collectCoverageFrom` Jest CLI parameters were used to not only run a single test with just but also report code coverage from a single file while running specific tests.
