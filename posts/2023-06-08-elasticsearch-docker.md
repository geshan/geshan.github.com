---
layout: post
title: A beginner's guide to running Elasticsearch with Docker and Docker Compose
date: 2023-06-08T23:45:52.000+11:00
comments: true
tags:
- Web Development
- Docker
cover: "/images/elasticsearch-docker/01elasticsearch-docker.jpg"
pagetitle: A beginner's guide to running Elasticsearch with Docker and Docker Compose
description: In this tutorial you will learn how to run Elasticsearch with docker and docker compose for local development.
keywords: elasticsearch docker, docker elasticsearch, elasticsearch docker compose
---
Elasticsearch is one of the most popular open-source software to store, search and analyze large amounts of data with very fast response times. If you're venturing into the world of Elasticsearch, you may have heard about Docker and Docker Compose as convenient ways to manage and deploy your applications. In this beginner's guide, we'll walk you through the process of running Elasticsearch using these powerful containerization tools. Let's get started!

<!-- more -->

<img class="center" loading="lazy" src="/images/elasticsearch-docker/01elasticsearch-docker.jpg" title="Learn how to run Elasticsearch with Docker and Docker Compose" alt="Learn how to run Elasticsearch with Docker and Docker Compose">

## Table of contents

- [Table of contents](#table-of-contents)
- [What is Elasticsearch?](#what-is-elasticsearch)
- [Why Use Elasticsearch?](#why-use-elasticsearch)
- [Popularity of Elasticsearch](#popularity-of-elasticsearch)
- [Faceted search with Elasticsearch is useful for e-commerce](#faceted-search-with-elasticsearch-is-useful-for-e-commerce)
- [Run Elasticsearch with Docker](#run-elasticsearch-with-docker)
- [Run Elasticsearch with Docker Compose](#run-elasticsearch-with-docker-compose)
- [Load product data on Elasticsearch](#load-product-data-on-elasticsearch)
- [Search for a product on Elasticsearch](#search-for-a-product-on-elasticsearch)
- [Conclusion](#conclusion)

<!-- tocstop -->

## What is Elasticsearch?

[Elasticsearch](https://www.elastic.co/elasticsearch/) is a powerful, open-source search and analytics engine built on top of the Apache Lucene library. It provides a distributed, scalable, and high-performance platform for storing, searching, and analyzing data in real time. With Elasticsearch, you can quickly index large volumes of data and retrieve relevant information using complex queries. Its versatility makes it suitable for a wide range of use cases, including logging, monitoring, and e-commerce applications.

In the next section, you will learn about the reasons to use Elasticsearch.

## Why Use Elasticsearch?

Before you delve into the technical details, let's briefly explore the reasons why Elasticsearch is popular among software engineers and organizations:

* Full-Text Search: Elasticsearch excels at full-text search, enabling users to search for and retrieve specific words or phrases within vast amounts of unstructured data.
* Scalability: Elasticsearch is designed to be distributed, allowing you to scale horizontally by adding more nodes to your cluster, resulting in increased performance and capacity.
* Real-Time Analytics: With Elasticsearch, you can perform real-time analytics on your data, gaining valuable insights and visualizations for monitoring and decision-making purposes.
* Easy Integration: Elasticsearch integrates seamlessly with various programming languages, libraries, and tools, making it an accessible choice for developers across different ecosystems.

In the subsequent section, you will know about how popular Elasticsearch is and the big names that use it.

## Popularity of Elasticsearch

Elasticsearch has experienced a remarkable surge in popularity in recent years, becoming one of the most widely adopted open-source search and analytics engines. One key factor contributing to its popularity is its ability to handle and process large volumes of data at an unprecedented speed. Whether it's ingesting, indexing, or searching data, Elasticsearch delivers exceptional performance and scalability. 

With this optimal blend of features, speed, performance and scalability Elasticsearch has risen in popularity in the past 5 years. It is the most popular software when it comes to searching large volumes of data with super fast responses leaving its competition like Solr and OpenSearch behind. This can be seen clearly in the [Google Trends chart](https://trends.google.com/trends/explore?date=2018-08-05%202023-01-06&q=Elasticsearch,opensearch,solr,algolia&hl=en) below for the past 5 years.


<img class="center" loading="lazy" src="/images/elasticsearch-docker/02elasticsearch-popularity.jpg" title="Elasticsearh has been much more popular than other competitors like Solr in the past 5 years" alt="Elasticsearh has been much more popular than other competitors like Solr in the past 5 years">

It might be a surprise for you that [big names](https://www.elastic.co/customers/success-stories?usecase=enterprise-search&industry=All) like [Netflix](https://netflixtechblog.com/tagged/elasticsearch), [Ebay](https://www.elastic.co/videos/ebay-and-elasticsearch-this-is-not-small-data), [Booking.com](https://www.elastic.co/videos/how-booking-com-is-tackling-unparalleled-growth-complexity-and-scale-with-elastic), [Adobe](https://www.elastic.co/elasticon/tour/2018/santa-clara/elastic-at-adobe-making-search-smarter-with-machine-learning-at-scale),  and [GitHub](https://www.elastic.co/customers/github) as some of the companies that use Elasticsearch to meet their demanding search needs.

It is also used by many E-commerce companies to enhance their search and especially make the faceted search better. You are going to learn a bit more about faceted search in E-commerce and Elasticsearch next.

## Faceted search with Elasticsearch is useful for e-commerce

[Faceted search](https://www.coveo.com/blog/faceted-search/) is a powerful feature provided by Elasticsearch that greatly enhances the search experience in e-commerce applications. It allows users to narrow down their search results by providing intuitive and interactive filtering options based on different attributes or facets of the products. This capability not only improves the usability of the search functionality but also enables customers to quickly find the products they are looking for, leading to higher conversion rates and customer satisfaction.

In an e-commerce context, products typically have various attributes such as brand, category, price range, size, color, and more. Faceted search leverages these attributes to offer customers a rich filtering experience. For example, imagine a user searching for a pair of shoes. With faceted search, they can easily refine their search results by selecting specific attributes like brand (Nike, Adidas, etc.), category (running shoes, sneakers), size (9, 10, etc.), and color (black, white, red). Each selected facet narrows down the search results in real time, providing an interactive and personalized shopping experience.

Faceted search also helps customers discover new products or make more informed purchase decisions. By exposing different facets and their corresponding values, customers can explore various options and compare products based on their preferences. They can, for instance, filter products by customer ratings, price ranges, or availability to find the best fit for their needs. This not only simplifies the decision-making process but also empowers customers with more control over their shopping experience.

Moreover, faceted search is not limited to a single attribute or facet. Elasticsearch allows you to define multiple facets and their hierarchies. For instance, in the case of clothing, you can have facets for gender, category, brand, and size. This hierarchical approach enables customers to drill down into specific subcategories or attributes while refining their search. It provides a structured and organized way to navigate through a vast product catalog, making it easier for customers to locate specific products or explore related options.

Faceted search with Elasticsearch offers numerous benefits for e-commerce applications. It improves the search experience by providing interactive and intuitive filtering options, allowing customers to narrow down their search results based on different attributes. It enhances product discovery and enables customers to make more informed purchase decisions. By empowering users with control over their search and offering a personalized shopping experience, faceted search contributes to increased customer satisfaction, improved conversion rates, and ultimately, the success of e-commerce businesses.

Now that you understand the significance of Elasticsearch and facets in searching, let's explore how to run it using Docker and Docker Compose.

## Run Elasticsearch with Docker

Docker provides a platform for packaging applications and their dependencies into lightweight, portable containers. This blog has other posts on docker like [Next.js and Docker](/blog/2023/01/nextjs-docker/), [MySQL and Docker](https://geshan.com.np/blog/2022/02/mysql-docker-compose/) to name a couple. This containerization approach allows you to isolate your Elasticsearch instance, making it easy to manage and deploy across different environments.

To run Elasticsearch with Docker, follow these steps:

If you haven't already, [install Docker](https://docs.docker.com/engine/install/) on your system by following the official installation instructions for your operating system.

Open your terminal or command prompt and run the following command to pull the official Elasticsearch Docker image version 8.8.0, the latest one at the time of writing this post:

```bash
docker pull elasticsearch:8.8.0
```

This will pull the Elasticsearch version 8.8.0 from [DockerHub](https://hub.docker.com/_/elasticsearch), the official Elastic website guide pulls it from the [Elastic.co docker registry](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html). It will look like the below when the image is pulled (downloaded) to your machine:

<img class="center" loading="lazy" src="/images/elasticsearch-docker/03elasticsearch-docker-pull.jpg" title="Output of docker pull for elasticsearch image from Docker hub" alt="Output of docker pull for elasticsearch image from Docker hub">

Once the image is downloaded, run the following command to start an Elasticsearch container:

```bash
docker run --rm --name elasticsearch_container -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e “xpack.security.enabled=false” elasticsearch:8.8.0
```

This command starts a container named elasticsearch_container, maps Elasticsearch ports 9200 and 9300 to the host machine, and sets the discovery type to single-node. It also sets the security to false as you don’t want to use HTTPs white testing locally. These settings are suited only for local development and not for production deployment. Here port 9200 is used to hit the Elasticsearch REST API and 9300 is used to communicate between nodes. As this is a single node setup for local you can also opt to not expose the port 9300.

Congratulations! You now have a running Elasticsearch instance using Docker. It will look like the following when the command executes after showing a lot of logs:

<img class="center" loading="lazy" src="/images/elasticsearch-docker/04elasticsearch-docker-run.jpg" title="Output of docker run for elasticsearch" alt="Output of docker run for elasticsearch">

You can stop the container by hitting `Ctrl+C`. However, using Docker Compose can simplify the process and allow you to define your Elasticsearch configuration more conveniently as discussed next.

## Run Elasticsearch with Docker Compose

Docker Compose is a tool for defining and running multi-container Docker applications. It enables you to specify your Elasticsearch configuration, including environment variables, network settings, and volumes, in a declarative YAML file. Let's see how to set up Elasticsearch using Docker Compose:

If Docker Compose is not already installed on your system, refer to the [official Docker Compose documentation](https://docs.docker.com/compose/install/) for installation instructions.

Create a new file named docker-compose.yml and open it in a text editor. Add the following content to the file:

```yaml
version: '3'
services:
  elasticsearch:
    image: elasticsearch:8.8.0
    ports:
      - 9200:9200
      - 9300:9300
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
```

This configuration sets up an Elasticsearch service, exposes ports 9200 and 9300, and sets the discovery type to single-node. As done in the above docker run command it also sets the security to false so that you don’t need to deal with any SSL for the tests you will do in the next section.

To start Elasticsearch with Docker Compose, in your terminal or command prompt, navigate to the directory containing the docker-compose.yml file, and run the following command:

```bash
docker-compose up
```

This command starts the Elasticsearch container defined in the Docker Compose file. If you want to run in detached mode add -d to run it as a background process. The above command will show the following output:

<img class="center" loading="lazy" src="/images/elasticsearch-docker/05elasticsearch-docker-compose-up.jpg" title="Output of docker-compose up for Elasticsearch" alt="Output of docker-compose up for Elasticsearch">

Now you have Elasticsearch running using Docker Compose, providing a more streamlined approach to managing your Elasticsearch environment. In the next section, you wil add a test product to your Elasticsearch running with docker-compose.

## Load product data on Elasticsearch

To test your Elasticsearch setup and explore its capabilities for e-commerce search, it's helpful to load sample product data into the system. Elasticsearch provides a powerful REST API to add/index, edit, delete, and search data. Let's go through the process of indexing e-commerce data:

You can use any HTTP client tool to interact with Elasticsearch's REST API. Popular options include cURL, HTTPie, or tools specifically designed for Elasticsearch, like Kibana Dev Tools or Postman. For this task, you will use cURL.

Start by creating an index to hold your e-commerce products. Use the following cURL command to create an index named products:

```bash
curl -X PUT http://localhost:9200/products
```

The above command will give you the following output:

```json
{"acknowledged":true,"shards_acknowledged":true,"index":"products"}
```

With your index in place, you can start indexing products. For example, let's index a sample product into the products index:

```bash
curl -X POST -H 'Content-Type: application/json' -d '{ "name": "Awesome T-Shirt", "description": "This is an awesome t-shirt for casual wear.", "price": 19.99, "category": "Clothing", "brand": "Example Brand" }' http://localhost:9200/products/_doc
```

The above command will give you an output like the below when successful:

```json
{"_index":"products","_id":"ZwvjmogB0lKdOCVeL2DZ","_version":1,"result":"created","_shards":{"total":2,"successful":1,"failed":0},"_seq_no":0,"_primary_term":1}
```

Feel free to experiment with different product attributes and values based on your e-commerce domain.

Congratulations! You have successfully loaded e-commerce data into Elasticsearch. Now let's perform searches to find products.

## Search for a product on Elasticsearch

Elasticsearch provides a comprehensive REST API that allows you to query and retrieve data from your indexes. Let's perform a simple search to find products in the products index:

Search Products: Issue the following command to search for products containing the term "t-shirt" in their name:

```bash
curl -X GET "localhost:9200/products/_search?pretty" -H 'Content-Type: application/json' -d' { "query": { "match": { "name": "t-shirt" } } }'
```

Elasticsearch will return the matching products, including the "Awesome T-Shirt" you previously indexed as follows:

```json
{
  "took" : 642,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 0.5753642,
    "hits" : [
      {
        "_index" : "products",
        "_id" : "ZwvjmogB0lKdOCVeL2DZ",
        "_score" : 0.5753642,
        "_source" : {
          "name" : "Awesome T-Shirt",
          "description" : "This is an awesome t-shirt for casual wear.",
          "price" : 19.99,
          "category" : "Clothing",
          "brand" : "Example Brand"
        }
      }
    ]
  }
}
```

By following these steps, you've learned how to run Elasticsearch with Docker and Docker Compose, load e-commerce data, and perform searches on it.

## Conclusion

In this beginner's guide, you explored the fundamental concepts of Elasticsearch and why it's a valuable tool for e-commerce search and analytics. You also learned about the popularity of Elasticsearch and the big names that use it. You then learned how to set up Elasticsearch using Docker and Docker Compose, which offer convenient ways to manage and deploy your Elasticsearch instance. Additionally, the process of loading sample e-commerce data into Elasticsearch and performing searches to find products was also covered.

Now that you have a solid foundation, you can further explore Elasticsearch's features, such as advanced search queries, filtering, aggregations, and more, to build powerful e-commerce search functionalities. Happy searching and optimizing your e-commerce store!
