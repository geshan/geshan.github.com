---
layout: post
title: "How to create an e-commerce product description generator using Gemini and Vertex AI"
date: 2024-04-29T21:54:47.000+11:00
comments: true
tags:
- AI
- Gen AI
- GCP
- Gemini
cover: "/images/e-commerce-product-description-generator/01e-commerce-product-description-generator.jpg"
pagetitle: "How to create an e-commerce product description generator using Gemini and Vertex AI"
description: "Learn how to create a useful e-commerce product description generator using Gemini  Pro API over Vertex AI on GCP with Python code example"
keywords: gemini api, vertex ai, gen ai, product descripiton generator
---
Gen AI can be utilized to build useful things. In this post, you will build an e-commerce product description generator using Google’s Gemini Pro vision LLM over Vertex AI on the Google Cloud Platform (GCP). Let’s get started!

<!-- more -->

<img class="center" src="/images/e-commerce-product-description-generator/01e-commerce-product-description-generator.jpg" title="How to create an e-commerce product description generator using Gemini and Vertex AI with Python code example" alt="How to create an e-commerce product description generator using Gemini and Vertex AI with Python code example">

## Table of contents

* [Process of writing product descriptions for e-commerce websites](#process-of-writing-product-descriptions-for-e-commerce-websites)
* [Prerequisites](#prerequisites)
* [Vertex AI on GCP](#vertex-ai-on-gcp)
* [Prompting](#prompting)
* [Name and save the prompt](#name-and-save-the-prompt)
* [Gemini configurations](#gemini-configurations)
* [Run generated Python Code](#run-generated-python-code)
* [What's next](#whats-next)
* [Conclusion](#conclusion)

## Process of writing product descriptions for e-commerce websites

Before you get your hands dirty with Vertex AI and some code, let’s understand the process of wiring product descriptions for any product shown on an e-commerce website. Models are scheduled to take photographs wearing the products, every product is photographed in a photo studio.

 Then a copywriter has a look at the retouched photographs possibly with the product by the side and writes a product description that you see on the website. It is a long process and if the website has hundreds of products going online each day it can be a labor-intensive, time-consuming, and error-prone process as it is mostly manual. It can be summed up visually as:

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/30prod-desc-process.jpg" title="The general process of writing product descripitons" alt="The general process of writing product descripitons">

Now, imagine you have a system where you can upload pictures and prompt the system to get the product description for that particular product. The generated product descriptions will not be perfect but it will get you (or the copywriter) 80% of the way. That is what you are doing to build in this tutorial.

To do this you will use the Gemini Pro LLM over Vertex AI, you will also get the basic code that can be deployed as a service. You can find some more context in these [slides](https://docs.google.com/presentation/d/1WboHu9zHIQLoiW_RO20KXLQb6twLdGLBNy_e3iadk94/edit?usp=sharing). In the next section, you will learn about the prerequisites to build the e-commerce product description generator.

## Prerequisites

To begin, you will need to have the following pre-requisites sorted:

* Have a working Google Cloud account (with some credit)
* Download this [zip file](https://gw.geshan.com.np/assets/images.zip) on your machine, for the product images. Please decompress it after downloading.

Also, be aware of the [Vertex AI and Gemini Pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing) as well.

Next, you will create a GCP project to build your e-commerce product description generator. You might need 20-30 minutes to create the basic product description generator and have a proof of concept code for it as shown below.

## Vertex AI on GCP

Below are the steps to create a new GCP project (if you have an existing one you can use that too).

1. Go to your Google Cloud Console and [Create a new project](https://console.cloud.google.com/projectcreate) called `gemini-ecomm` or anything relevant as seen below:

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/16new-project.jpg" title="Create a new GCP Project" alt="Create a new GCP Project">

2. Make sure you have selected the project created in Step 1 if you have multiple projects.

3. Go to Vertex AI from your Google Cloud Console, the easiest way to do it would be to search for `vertex` on the search bar as seen below:

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/01seach-vertex-on-gcp.jpg" title="Search vertex on GCP console" alt="Search vertex on GCP console">

4. Click on `Vertex AI`

5. On the Vertex AI page, then "Enable all recommended APIs" as seen below (it will take some time):

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/18enable-apis.jpg" title="Enable all related Vertex AI APIs" alt="Enable all related Vertex AI APIs">

6. After the APIs are enabled, click on `Multimodal` found on the left menu

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/02multimodal.jpg" title="Click on Multimodal on Vertex AI page" alt="Click on Multimodal on Vertex AI page">

7. On the Multimodal page, click `Open` on the "Prompt design (single turn)" box as follows:

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/03single-turn.jpg" title="Click on Open for Prompt design (Single Turn)" alt="Click on Open for Prompt design (Single Turn)">

## Prompting

8. On the Prompt experiment page, please make sure you have the `gemini-1.0-pro-vision-001` model selected. Then, paste the following prompt in the `Prompt` text box:

```
As an expert e-commerce copywriter, analyze the uploaded images of
women's jeans and write a product description for a low to mid-end 
fashion e-commerce website. Please include the details about the 
comfortable to wear jeans and do not include any details about the 
price. Make sure that the copy is written in an engaging and friendly tone.
```

9. Then upload the images you find in the repository or the images folder of the unzipped `images.zip` file. Navigate to `womens-jeans-photos` folder after clicking the `Insert Media` option on the right side of the `Prompt` textbox. Then upload all Once all the 8 images, it will look something like the below:

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/04prompt-ready.jpg" title="The prompt with the images upload" alt="The prompt with the images upload">

10. After that hit the `Submit` button to test out the prompt with the uploaded images, you should get a response similar to the following:

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/05prompt-response.jpg" title="The response to the prompt with product description" alt="The response to the prompt with product description">

## Name and save the prompt

11. At this point, it would be a good idea to save your prompt (with images). To do this, click the `pen` icon beside `Untitled prompt` above the prompt text box, then type `e-commerce-product-desc-generator` the click anywhere, it will look like the below while editing:

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/06name-prompt.jpg" title="Name the prompt" alt="Name the prompt">

12. As you have named the prompt, you can save it. To save the prompt click `Save` on the top left part of the right sidebar as shown below:

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/07save-button.jpg" title="Save button for the prompt" alt="Save button for the prompt">

13. Then, select the region (it is ok to choose us-central1) on the overlay window and save the prompt.

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/08save-prompt-region.jpg" title="Save the prompt selecting a region" alt="Save the prompt selecting a region">

All saved prompts will be accessible in your [My Prompts](https://console.cloud.google.com/vertex-ai/generative/multimodal/my-prompts?hl=en-AU) page.

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/09my-prompts.jpg" title="Save the prompt selecting a region" alt="Save the prompt selecting a region">

14. Hurray! The basic e-commerce product description generator is working. Now, you will change some settings to make it better. You can go back to the prompt editing page by clicking the `Prompt Name` if you are on the `My Prompts` page.

## Gemini configurations

15. In terms of configurations, for Gemini 1.0 pro vision there are 4 options you can configure. Those four are explained in plain words below:

* **Temperature (Randomness/Creativity/Spice)**: Imagine a roulette wheel (randomness). A high temperature increases the spin's randomness, affecting the chosen word (output).

* **Output Token Limit (Length)**: This is like a set word limit (length) for your text. It controls how many words the LLM generates in total.

* **Top K (Choice)**: Think of this as picking from a shortlist (choice) of the most likely words. A lower K restricts the options for the next word.

* **Top P (Probability)**: This is like a probability wheel (probability). It influences the LLM to pick the next word based on its likelihood (probability), not just being the most likely.

Below is a configuration you can try out, the right settings for this configuration depend on how you want the output to be shaped by Gemini:

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/10gemini-configs.jpg" title="4 configs for the Gemini pro vision LLM" alt="4 configs for the Gemini pro vision LLM">

16. It is also important to set up the `Safety Settings` correctly as per your use case, for now, we will set it at maximum safety (Responsible AI). As seen below, the safety settings (found on the right sidebar are self-explanatory)

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/11safety-settings.jpg" title="Gemini safety settings" alt="Gemini safety settings">

17. You can also tweak the prompt text to make it better, below is another version of the prompt:

```
As an expert e-commerce copywriter, analyze the uploaded images of women's
jeans and write a product description for a low to mid-end fashion e-commerce
website. Please include the details about the comfortable to wear clothing and
do not include any details about the price. Make sure that the copy is written
in an engaging and direct tone.
```

You can play around with the prompt and make it more flexible or more specific as per your goals.

**The next step will involve some code.**

---

## Run generated Python Code

18. If you want to create an API for the e-commerce description generator or want to have more control over what the LLM is called, you can generate code and run it on a Google Cloud Platform service like Google Cloud Run. To generate code, click the `<> Get Code` link which shows a slider on the right side as follows:

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/12get-code.jpg" title="Get code for your Gemini experiment" alt="Get code for your Gemini experiment">

For this workshop, you will use the Node.js code and try it out. For that, you will use Cloud Shell and Cloud Shell Editor.

19. Click `Activate Cloud Shell` toward the top right corner of the screen as seen below:

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/19activate-cloud-shell.jpg" title="Activate Cloud Shell" alt="Activate Cloud Shell">

20. In the Cloud shell window, click `Open Editor`:

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/20open-editor.jpg" title="Open editor" alt="Open editor">

21. This will take some time and open up the Google Cloud Shell Editor which looks very similar to VS Code. In the Editor click `Hamburger Menu > Terminal > New Terminal` as follows:

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/21open-terminal.jpg" title="Open terminal in editor" alt="Open terminal in editor">

22. In the editor's terminal, execute `mkdir projects && cd projects && mkdir gemini-workshop && cd gemini-workshop` and then `pip3 install --upgrade google-cloud-aiplatform` :

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/22run-commands-python.jpg" title="Commands executed" alt="Commands executed">

23. After the vertex AI Python package is installed it will look like the below:

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/23pip3-install-ok.jpg" title="Install Vertex AI Python package" alt="Install Vertex AI Python package">

24. After that you will load the folder in the project, go to `Hamburger Menu > File > Open Folder`:

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/24load-project.jpg" title="Load project to Cloud shell editor" alt="Load project to Cloud shell editor">

25. Then type in `projects/gem` and select the `gemini-workshop` option and click `OK`:

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/25select-folder-python.jpg" title="Select the right folder" alt="Select the right folder">

26. It will load the folder on the Cloud Shell editor, after that, to add a new file click the `file+` icon beside `GEMINI-WORKSHOP` and name it `gemini.py`

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/26new-file-python.jpg" title="Create the gemini.py file" alt="Create the gemini.py file">

27. For the contents of the gemini.py, click `<>GET CODE` on the Vertex AI Editor screen, while on the `Python` option copy the code into a file called `gemini.py`

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/13copy-python-code.jpg" title="Get Python code for e-commerce descripiton generator" alt="Get Python code for e-commerce descripiton generator">

28. Paste the code in the `gemini.py` empty file and save it:

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/27paste-code-python.jpg" title="Paste copied code" alt="Paste copied code">

29. To run the code and test it out, again open the terminal from `Hamburger Menu > Terminal > New Terminal` and type in `python gemini.py` then hit enter. It will ask you to `Authorise`:

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/28authorize.jpg" title="Authorize the execution" alt="Authorize the execution">

After authorisation, the code will run and give an output like the below:

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/29code-output-python.jpg" title="See the generated product description" alt="See the generated product description">

Congrats! You are a Gemini and Vertex AI novice now :). You can close the Cloud Shell Editor. Even shut down/delete the project if you like.

## What's next

30. Further steps

The generated code is more like a proof of concept. You can add an API layer and UI on top of it to make it more useful. You can deploy that API on Google Cloud Run as serverless containers.

For instance below is a basic UI generated with [v0](https://v0.dev/r/iP3BVQiLBa5) with the prompt:

```
An internal tool for e-commerce websites to generate product descriptions,
it will have a product name text box, multi-file upload field, category
select box with clothes, shoes, accessory options, gender select box
with male, female, and unisex options and age select box with infants,
kids, teens, and adults options. Then a button that says Generate.
```

The UI is below:

<img class="center" loading="lazy" src="/images/e-commerce-product-description-generator/15simple-ui.jpg" title="Example UI generated by V0 for the product description generator" alt="Example UI generated by V0 for the product description generator">

31. It would be good idea to read more about LLMs in general and also about Gemini. You can also do courses or code labs about [Gemini on Cloud Skills boost](https://www.cloudskillsboost.google/catalog?keywords=gemini&page=1) platform.

Congrats! You have successfully built and tested a general purpose e-commrece product description generator. You can also crate a text or URL's [text summarizer](/blog/2024/02/gemini-vertex-ai-nodejs/) using Gemini over Vertex AI.

## Conclusion

In this blog post, you embarked on a journey to build a basic e-commerce product description generator using Google's Gemini API over Vertex AI on GCP.

You started by creating a prompt that captures the essence of what we wanted the generator to achieve. Towards the end you create a proof of concept script with Python that can be converted into a standalone internal application.

Whether you're an e-commerce entrepreneur, a content creator, or simply someone interested in the future of AI, LLMs have the potential to revolutionize the way we work and create.

> So, embrace the excitement, experiment with different prompts and configurations, and see what amazing results you can achieve with the help of Google's Gemini API.

The future of better productivity is here, and it's powered by AI!
