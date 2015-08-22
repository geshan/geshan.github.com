---
layout: post
title: "Building you next product, get your HTTP API working first"
date: 2015-08-22 14:00:22 +0400
comments: true
categories:
- Technology
- misc
- api
---

We have seen many technology software products coming, some coming up as the next big thing, some
a multi-tenant Software As A Service (SAAS). Sometimes I see lots of new, useful and innovative
products on [Product Hunt](http://www.producthunt.com/) and think how would they have planned such
amazing products. If you are planning to build your software product, this post will unfold why
you should make your web Application Programming Interface (API) working first.

{% img center  /images/product-http-api/rest-json.jpg 'JSON APIs' 'JSON APIs' %}
<!-- more -->

## Introduction

There are many startups listed on [StartUps In Nepal](http://startupsinnepal.com/) as well, I hope
these people have a good backend infrastructure and have given enough importance to making their technology
strong and scalable. If anyone is trying to rewrite a product or thinking of redoing their product I would
really suggest to go the API oriented path.

If you are thinking of the next big product or planning a startup/product, it is a good idea to not jump start
a [monolithic application](https://en.wikipedia.org/wiki/Monolithic_application). Surely if you have less time/budget
or want to just build a prototype may be to pull up some investment it is advisable. If you are thinking of a long-term
product to be used by lots of people start planning your APIs.

## HTTP APIs first, language/framework second

Rather than just deciding about the language/framework for your application, rise above it and think about HTTP APIs
that will be needed to complete your applcaiton or the Minimum Viable Product (MVP). How to make user of the [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) verbs/methods
GET, POST, PATCH, DELETE etc and make it easier for the clients to call your backend should be planned then you can
decide on the platform (language/framework) that can be used to realize the plans.

## SOA, Microservices or something else

You can go a [Service Oriented Architecture(SOA)](https://en.wikipedia.org/wiki/Service-oriented_architecture) path
or even look into [Microservices](https://en.wikipedia.org/wiki/Microservices). It is also advised to do
RESTish/RESTful or somehow [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) based API which
accepts and gives out [JSON](https://en.wikipedia.org/wiki/JSON). If you don't want to make more desicions about
the data structure and how to accept or give out data, try implementing your APIs following [JSON API](http://jsonapi.org/) specification.

## Strong backend and multiple clients

If you are able to plan all your data communcation getting and giving out data to clients in the form of resource URLs,
then you can build a strong backend. When you have a strong and scaleable back-end it can handle multiple clients easily. If you have a performant backend then the same backend can serve a front-end Javascript framework or a mobile applicaiton as a client in a speedy and consistent way.

## Why not build frontend parallel

If the HTTP backend is designed and documented well before creating it even a [front-end first](http://nobackend.org/) approach can be done. In this case, the frontend can be developed in parallel with the backend, if there is any change it can be adjusted accordingly.

If your budget and resources support you can have two teams backend and frontend going in parallel to build and realize your dream product. And remember a mobile application is just another frontend client to the scaleable backend your have already built.

## Mobile first is a side effect

If you have a strong and well documented backend HTTP APIs it can be called easily from the your mobile applicaiton to post or receive any information. Becuase is data is stored centrally on a persistent store the backend HTTP APIs work like a communication layer between your mobile applications and the data store.

## Speed and performance is another good side effect

With great brackends all your system needs to serve is JSON and accept only JSON over HTTP following the HTTP way of working. This means the backend does not need to spit out any HTML so there are no views to code or maintain. As the view and some of its logic is decoupled and placed on the the frontend apps the backend is fast and the performance can be fine tuned from the backend perspective.

## Conclusion

Though it looks all shiny from outside, still it is a resource intensive task to develop HTTP API backend and have multiple frontends. Both can go in parallel but it needs well planning, documentation and even better execution. That is why it is generally not recommended for web agency kind small projects but having backend HTTP APIs is applicable to products which have long life.

> Have fun building backend HTTP APIs for the next big thing product in your mind.
> If you build your product following API oriented architecture, mobile first, speed and performance are its great side effects.
