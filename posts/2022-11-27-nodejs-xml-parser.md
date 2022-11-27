---
layout: post
title: A beginner’s guide to parse and create XML with Node.js
date: 2022-11-27T21:44:52.000+11:00
comments: true
tags:
- Node.js
- Javascript
- Web Development
cover: "/images/nodejs-xml-parser/01nodejs-xml-parser.jpg"
pagetitle: A beginner’s guide to parse and create XML with Node.js
description: In this tutorial, learn how validate and parse XML with Node.js. You
  will also know about creating a XML file with Node.js
keywords: nodejs xml parser, node.js xml parser, nodejs xml, nodejs xml build

---
Writing and parsing XML files with Node.js might not be one of the first things that strike your mind. On the contrary, the Fast XML parser has millions of downloads per week on NPM. In this post, you will learn how to validate and parse XML with Node.js. You will also learn to generate an XML file from JavaScript objects. Let's get started!

<!-- more -->

<img class="center" loading="lazy" src="/images/nodejs-xml-parser/01nodejs-xml-parser.jpg" title="Node.js XML parser illustration with an old Car to show XML legacy" alt="Node.js XML parser illustration with an old Car to show XML legacy">

## Table of contents

* [Is XML still used?](#is-xml-still-used)
* [Prerequisites](#prerequisites)
* [Example - Parse sample XML](#example---parse-sample-xml)
    * [Sample XML file](#sample-xml-file)
* [Validate XML using Node.js](#validate-xml-using-nodejs)
* [Parse XML with Node.js](#parse-xml-with-nodejs)
* [Create XML using Fast XML parser](#create-xml-using-fast-xml-parser)
* [Comparing with other libraries](#comparing-with-other-libraries)

## Is XML still used?

You might be wondering in this era of JSON and REST is XML still used. In addition, with newer options to communicate between services like GraphQL and gRPC the use of XML should have declined significantly in recent years. To your surprise, having worked for million-dollar companies I can verify that even business-critical processes depend on XML and parsing of it. For example, Microsoft Navision ERP (now called [Business Central](https://dynamics.microsoft.com/en-au/nav-overview/)) still supports [Simple Object Access Protocol (SOAP)](https://www.javatpoint.com/soap-web-services) web [services](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/webservices/web-services#soap-web-services) that communicate using XML.

Let’s assume for an e-commerce website, the customer order is taken from the checkout system built with Node.js and MySQL database. The warehouse, however, is managed with a Microsoft Business Central ERP (moved from Navision). It is very likely that the orders are sent to the ERP from the web system using SOAP and XML. The cost of rewriting the business critical part is high in terms of writing a new service as well as managing the risk of failure.

> In  [comparison](https://npmtrends.com/@angular/core-vs-fast-xml-parser-vs-vue) fast-XML-parser NPM package has more downloads/week (6 million) than Vue (3.4 million)  or Angular (3 million).


Thereby XML is used and will be used in the future too.


## Prerequisites

To follow along with the example code below for this tutorial, below are some of the requisites:

1. Prior knowledge of JavaScript, NPM, and the Node.js ecosystem will be beneficial. The example will be run with Node.js 18 the current LTS version.
1. Understanding the difference between [common js and es6 modules](https://blog.logrocket.com/commonjs-vs-es-modules-node-js/) will be helpful
1. Using git and GitHub will be necessary
1. Any previous experience working with XML will be advantageous

Given that is mentioned, you can proceed to get your hands dirty with code now.

## Example - Parse sample XML

For this example, you will parse XML using the `fast-xml-parser` NPM library. Create an empty folder named `nodejs-xml`. Then run `npm init -y` to create a `package.json` file with all default values. Then, You can install the Fast XML parser NPM package by running:

```bash
npm install --save fast-xml-parser
```
The above command will add `fast-xml-parser` to your Node.js project. Fast XML parser is used by companies like IBM, VMWare, Microsoft, and [others](https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/USERs.md). For this tutorial, you will use [ES6 module import in place of common Js require](https://www.geeksforgeeks.org/difference-between-node-js-require-and-es6-import-and-export/). To this, depending on your project, you will need `”type”: “module”` in your package.json file as discussed further in this [StackOverflow](https://stackoverflow.com/a/68558580/112849) thread. 

In the next section, you will look at a sample XML file that lists some books.

### Sample XML file 

For this tutorial, you will use a sample file used in the MSXML [docs](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ms762271(v=vs.85)) from Microsoft. This file is a list of 12 books in XML format as seen below:

```xml
<?xml version="1.0"?>
<catalog>
   <book id="bk101">
      <author>Gambardella, Matthew</author>
      <title>XML Developer's Guide</title>
      <genre>Computer</genre>
      <price>44.95</price>
      <publish_date>2000-10-01</publish_date>
      <description>An in-depth look at creating applications 
      with XML.</description>
   </book>
   <book id="bk102">
      <author>Ralls, Kim</author>
      <title>Midnight Rain</title>
      <genre>Fantasy</genre>
      <price>5.95</price>
      <publish_date>2000-12-16</publish_date>
      <description>A former architect battles corporate zombies, 
      an evil sorceress, and her own childhood to become queen 
      of the world.</description>
   </book>
   <book id="bk103">
      <author>Corets, Eva</author>
      <title>Maeve Ascendant</title>
      <genre>Fantasy</genre>
      <price>5.95</price>
      <publish_date>2000-11-17</publish_date>
      <description>After the collapse of a nanotechnology 
      society in England, the young survivors lay the 
      foundation for a new society.</description>
   </book>
   <book id="bk104">
      <author>Corets, Eva</author>
      <title>Oberon's Legacy</title>
      <genre>Fantasy</genre>
      <price>5.95</price>
      <publish_date>2001-03-10</publish_date>
      <description>In post-apocalypse England, the mysterious 
      agent known only as Oberon helps to create a new life 
      for the inhabitants of London. Sequel to Maeve 
      Ascendant.</description>
   </book>
   <book id="bk105">
      <author>Corets, Eva</author>
      <title>The Sundered Grail</title>
      <genre>Fantasy</genre>
      <price>5.95</price>
      <publish_date>2001-09-10</publish_date>
      <description>The two daughters of Maeve, half-sisters, 
      battle one another for control of England. Sequel to 
      Oberon's Legacy.</description>
   </book>
   <book id="bk106">
      <author>Randall, Cynthia</author>
      <title>Lover Birds</title>
      <genre>Romance</genre>
      <price>4.95</price>
      <publish_date>2000-09-02</publish_date>
      <description>When Carla meets Paul at an ornithology 
      conference, tempers fly as feathers get ruffled.</description>
   </book>
   <book id="bk107">
      <author>Thurman, Paula</author>
      <title>Splish Splash</title>
      <genre>Romance</genre>
      <price>4.95</price>
      <publish_date>2000-11-02</publish_date>
      <description>A deep sea diver finds true love twenty 
      thousand leagues beneath the sea.</description>
   </book>
   <book id="bk108">
      <author>Knorr, Stefan</author>
      <title>Creepy Crawlies</title>
      <genre>Horror</genre>
      <price>4.95</price>
      <publish_date>2000-12-06</publish_date>
      <description>An anthology of horror stories about roaches,
      centipedes, scorpions  and other insects.</description>
   </book>
   <book id="bk109">
      <author>Kress, Peter</author>
      <title>Paradox Lost</title>
      <genre>Science Fiction</genre>
      <price>6.95</price>
      <publish_date>2000-11-02</publish_date>
      <description>After an inadvertant trip through a Heisenberg
      Uncertainty Device, James Salway discovers the problems 
      of being quantum.</description>
   </book>
   <book id="bk110">
      <author>O'Brien, Tim</author>
      <title>Microsoft .NET: The Programming Bible</title>
      <genre>Computer</genre>
      <price>36.95</price>
      <publish_date>2000-12-09</publish_date>
      <description>Microsoft's .NET initiative is explored in 
      detail in this deep programmer's reference.</description>
   </book>
   <book id="bk111">
      <author>O'Brien, Tim</author>
      <title>MSXML3: A Comprehensive Guide</title>
      <genre>Computer</genre>
      <price>36.95</price>
      <publish_date>2000-12-01</publish_date>
      <description>The Microsoft MSXML3 parser is covered in 
      detail, with attention to XML DOM interfaces, XSLT processing, 
      SAX and more.</description>
   </book>
   <book id="bk112">
      <author>Galos, Mike</author>
      <title>Visual Studio 7: A Comprehensive Guide</title>
      <genre>Computer</genre>
      <price>49.95</price>
      <publish_date>2001-04-16</publish_date>
      <description>Microsoft Visual Studio 7 is explored in depth,
      looking at how Visual Basic, Visual C++, C#, and ASP+ are 
      integrated into a comprehensive development 
      environment.</description>
   </book>
</catalog>
```

You will save this file in `./xml/books.xml` path. This file will be used to parse out the XML into a JSON object. Then you can run your code with the array of objects. It is discussed in the following section.

## Validate XML using Node.js

Before parsing the XML file or data it is better to validate it. For this, you can use the `XMLValidator.valudate` method from the Fast XML parser library. It also has options like `allowBooleanAttributes`, you can read about it in the [documentation](https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/4.XMLValidator.md). 

For this guide, you will use it without any options and it returns true if the XML data or file is valid XML. In case of an invalid XML, it will throw an error with code, message (msg), line number, and column (col) number which makes it easy to fix the error. Below is the code to validate a sample XML file similar to the one mentioned in the previous section:

```js
import { XMLValidator } from 'fast-xml-parser';

const xmlFile = `<?xml version="1.0"?>
<catalog>
   <book id="bk101">
      <author>Gambardella, Matthew</author>
      <title>XML Developer's Guide</title>
      <genre>Computer</genre>
      <price>44.95</price>
      <publish_date>2000-10-01</publish_date>
      <description>An in-depth look at creating applications 
      with XML.</description>
   </BOOK>   
</catalog>`;

const result = XMLValidator.validate(xmlFile);
if (result === true) {
  console.log(`XML file is valid`, result);
}

if (result.err) {
  console.log(`XML is invalid becuause of - ${result.err.msg}`, result);
}
```

You will save the above file as `xml-validate.js`. It starts by importing the `XMLValidate` object for the Fast XML parser library. After that, you define an XML string named `xmlFile` which is not valid. The opening tag is `book` in all small letters but the closing tag is `BOOK` in all caps. This should be picked up by the validator.

Next, you run the invalid XML string (could be a file too) through the `XMLValidator.validate` method, the result of this operation is put in the `result` constant. Then you check if the result is true, and the XML is valid. If there is `result.err` present then there is an issue and you do a console.log to show the error to the user. You can run this file with:


```bash
node xml-validate.js
```

It will result in an output like the below:

<img class="center" loading="lazy" src="/images/nodejs-xml-parser/02nodejs-xml-validate.jpg" title="Node.js XML vaildate output on the CLI" alt="Node.js XML vaildate output on the CLI">

In the consequent section, you will learn about parsing the XML file (or string) into a JavaSciprt object using XMLParser from the Fast XML parser library. 

## Parse XML with Node.js

You have already looked at the sample XML file at `./xml/books.xml`. It has a list of 12 books. Next, you are going to parse that file into a JavaScript object and print the contents of the first book object. It can be done with the following code:

```js
import { XMLParser } from 'fast-xml-parser';
import { readFileSync } from 'fs';

//xml file from https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ms762271(v=vs.85)
const xmlFile = readFileSync(`${process.cwd()}/xml/books.xml`, 'utf8');
const parser = new XMLParser();
const json = parser.parse(xmlFile);

console.log(`First book: `, json.catalog.book[0]);
```

This example starts by importing the `XMLParser` class from the Fast XML Parser library. Then it also imports the `readFileSync` function from the native file system (fs) module. The file system module is used to [read data from file using Node.js](/blog/2021/10/nodejs-read-file-line-by-line/).

Next, you load the whole file on a const called `xmlFile` with `readFileSync`. The file is located in the current directory `/xml/books.xml`. This is the sample file discussed previously in this tutorial. It will be loaded with `utf8` encoding. After that, you instantiate the parser the call the `parse` method on the parser passing the contents of the XML file. Here the parser will run the validator first then do the parsing. 

After the parsing is successful you log the first book, which will look like the following on running with `node xml-parse.js`:

<img class="center" loading="lazy" src="/images/nodejs-xml-parser/03nodejs-xml-parse.jpg" title="Node.js XML parser parsign a XML file output on the CLI" alt="Node.js XML parser parsign a XML file output on the CLI">

Great! You have passed the XML file into a JavaScript object. As per the need, you can loop through the `books` array or do the task that you want to accomplish. Next, you will learn how to create XML data from a JavaScript object. 

## Create XML using Fast XML parser

You have translated (parsed) the XML file’s contents to a JavaScript object with mapped attributes. Similarly, you can also convert a JavaScript object into an XML file (or data) using the Fast XML parser package. You can convert a JavaScript object/array into XML with the following code:

```js
import { XMLBuilder } from 'fast-xml-parser';

const books = [
  {
    author: 'Gambardella, Matthew',
    title: "XML Developer's Guide",
    genre: 'Computer',
    price: 44.95,
    publish_date: '2000-10-01',
    description: 'An in-depth look at creating applications with XML.'
  },
  {
    author: 'Ralls, Kim',
    title: 'Midnight Rain',
    genre: 'Fantasy',
    price: 5.95,
    publish_date: '2000-12-16',
    description: 'A former architect battles corporate zombies, \n' +
      '      an evil sorceress, and her own childhood to become queen \n' +
      '      of the world.'
  }
];

const builder = new XMLBuilder({
  arrayNodeName: "book"
});
const xmlContent = `<?xml version="1.0"?>
<catalog>
  ${builder.build(books)}
</catalog>`

console.log(`xml: `, xmlContent.substring(0, 118));
```

This code snippet starts with importing `XMLBuilder` from the Fast XML parser library. Then you define a couple of book objects in the `books` array. After that, you instantiate the `XMLBuilder` class with an options object having the `arrayNodeName` property set as `book`. You can read more about the options available for the XMLBuilder in the [docs](https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/3.XMLBuilder.md).

Consequently, you define a const named `xmlContent` which is going to have the built XML. To make it valid you add the XML tag and the catalog tag by hand. Then you call the `builder.build` method passing the books array defined earlier. Finally, you log the first 118 characters of the XML content. You can run this code snipped by executing `node xml-build.js` which is show the following output:

<img class="center" loading="lazy" src="/images/nodejs-xml-parser/04nodejs-xml-build.jpg" title="Building a XML file from JavaScript Object using Node.js and Fast XML Library" alt="Building a XML file from JavaScript Object using Node.js and Fast XML Library">

You can find all the code shown in the examples in this [Github repository](https://github.com/geshan/nodejs-xml) for your reference. In this tutorial, you have converted XML to JSON and JavaScript objects to XML using the Fast XML parser library. Next up, you will learn about other options to do the same task and their popularity.

## Comparing with other libraries

You used the `fast-xml-parser` library to wrangle the XML and JavaScript objects. There are other options too like [XML-JS](https://github.com/nashwaan/xml-js), [XML2Js](https://github.com/Leonidas-from-XIV/node-xml2js), [XML2Json](https://github.com/buglabs/node-xml2json#readme), etc. 

> The most popular one among them in terms of downloads is `XML-JS` with 14.7 million downloads per week. For comparison, React has 16.8 million downloads per week. 

Below is a quick comparison of the downloads per week from [NPM Trends](https://npmtrends.com/fast-xml-parser-vs-xml-js-vs-xml-to-json-vs-xml2js-vs-xml2json) for some XML parsing libraries:

<img class="center" loading="lazy" src="/images/nodejs-xml-parser/05nodejs-xml-compare.jpg" title="Comparing different Node.js XML parser libraries available on NPM on their weekly downloads count" alt="Comparing different Node.js XML parser libraries available on NPM on their weekly downloads count">

However, for this guide, the [Fast XML parser](https://github.com/NaturalIntelligence/fast-xml-parser) was chosen because it was updated last week whereas XML2JS was last updated 3 years ago. It is also used by big companies like Microsoft, NASA, and VMWare to name some. Both will do the job, which library to select will be a matter of choice for you.

## Conclusion

In this tutorial, you learned how to validate XML docs or data. Then you also learned about how to parse XML data into a JavaScript object. After that, you looked at an example to do the conversion the other way round from a JavaScript object (or array of objects) to an XML file. 

You might not know it but you would need to work with XML in Node.js, be prepared for it.
