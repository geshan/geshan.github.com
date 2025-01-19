---
layout: post
title: "How to run (any) open LLM with Ollama on Google Cloud Run [Step-by-step]"
date: 2025-01-20T22:34:52.000+11:00
comments: true
tags:
- AI
- Gen AI
- GCP
- Google Cloud Run
cover: "/images/ollama-google-cloud-run/01ollama-google-cloud-run.jpg"
pagetitle: "How to run (any) open LLM with Ollama on Google Cloud Run [Step-by-step]"
description: "Learn how to run and host Gemma 2:2b with Ollama on Google Cloud Run in this step by step tutorial. You can use Gemma with a API too using Ollama"
keywords: ollama google cloud run, ollama gemma, gemma ollama, ollama cloud, ollama gcp, ollama cloud run
---
Ollama is a great way to run many open Large Language Models (LLMs). You can run Google Gemma 2, Phi 4, Mistral, and Llama 3 on your machine or the cloud with [Ollama](https://ollama.com/). You can also host these open LLMs as APIs using Ollama. In this post, you will learn how to host Gemma 2 (2b) with Ollama 4.x on Google Cloud Run; let’s get started!

<!-- more -->

<img class="center" src="/images/ollama-google-cloud-run/01ollama-google-cloud-run.jpg" title="How to run (any) open LLM with Ollama on Google Cloud Run [Step-by-step]" alt="How to run (any) open LLM with Ollama on Google Cloud Run [Step-by-step]">

## Why Google Cloud Run

Good question; I have written multiple [blog posts](https://geshan.com.np/blog/categories/google-cloud-run/) about Google Cloud Run and also given a couple of [talks](/blog/2019/11/from-0-to-working-serverless-url-for-a-containerized-app-with-google-cloud-run-slides-and-video/) in the past years, Some great [reasons](/blog/2019/11/why-use-google-cloud-run-5-compelling-reasons/) to use Google Cloud Run to host open LLMs with [serverless containers](/blog/2023/04/serverless-containers/) are:

* The resources (like CPU, memory, and even GPU) are allocated in a serverless way. Meaning you only pay for the time you use it.
* You don’t need to send data out of your [VPC](https://cloud.google.com/vpc?hl=en), putting security first
* More cost control without counting tokens, as the LLMs are self-hosted; you can define how the resources are allocated rather than just counting the number of tokens sent and received.

Now that that's out of the way let’s access the Google Cloud Console and deploy Gemma 2 (2b—2 billion parameters) on Google Cloud Run.

## Create a GCS bucket

First, you will need an existing Project on Google Cloud, or you can create a [new project](https://console.cloud.google.com/projectcrea). For this tutorial, we will assume that you have a new(ish) project. Since the project has already been selected, you will create a new Google Cloud Storage (GCS) bucket. You are creating a GCS bucket to store the files needed for the open LLM, which is Gemma2 2b in the case of this guide.

To create a new bucket, search for `bucket` on the search bar:

<img class="center" src="/images/ollama-google-cloud-run/02search-buckets.jpg" loading="lazy" title="Search for bucket on Google Cloud Console search bar" alt="Search for bucket on Google Cloud Console search bar">

Then select the `Buckets` option, as shown above. Then click the `+ Create` option on the “Buckets” page:

<img class="center" src="/images/ollama-google-cloud-run/03create-bucket-button.jpg" loading="lazy" title="Click on the create bucket button on the GCS buckets page" alt="Click on the create bucket button on the GCS buckets page">

After that, name the bucket something unique, like `ollama-gemma2-2b-xyz.`. All buckets across GCP have unique names, so you might need a suffix. Then click the down arrow beside `Optimize storage for data-intensive workloads` and check the `Enable Hierarchical namespace on this bucket` checkbox as shown below:

<img class="center" src="/images/ollama-google-cloud-run/04name-the-bucket.jpg" loading="lazy" title="Name the bucket and enable hierarchical namespace" alt="Name the bucket and enable hierarchical namespace">

This will help optimize the LLM access later. After that, select the bucket to be a  single region and the `Region` as `us-central1 (Iowa)` as follows:

<img class="center" src="/images/ollama-google-cloud-run/05select-bucket-region.jpg" loading="lazy" title="Make it single region bucket and select us-central1 region" alt="Make it single region bucket and select us-central1 region">

Then click `Continue`. Next, keep the `Storage Class` as `Standard` and then click `Continue`:

<img class="center" src="/images/ollama-google-cloud-run/06select-standard-bucket.jpg" loading="lazy" title="Make it a standard bucket class" alt="Make it a standard bucket class">

After that, let the access control be on the bucket level (not `Fine-grained` ) and click `Continue`:

<img class="center" src="/images/ollama-google-cloud-run/07bucket-access-control.jpg" loading="lazy" title="Make the bucket a uniform access control one, not fine grained access control" alt="Make the bucket a uniform access control one, not fine grained access control">

Then, keep the data protection policy as shown below, and click `Create` to create the bucket.

<img class="center" src="/images/ollama-google-cloud-run/08bucket-create.jpg" loading="lazy" title="Keep the soft delete policy and create the bucket" alt="Keep the soft delete policy and create the bucket">

Next, it will ask you to confirm the access as below:

<img class="center" src="/images/ollama-google-cloud-run/09bucket-create-confirm.jpg" loading="lazy" title="Confirm the bucket creation" alt="Confirm the bucket creation">

Click `Confirm`. It will take some time, but the bucket will be created, which will look like the below:

<img class="center" src="/images/ollama-google-cloud-run/10bucket-created.jpg" loading="lazy" title="The bucket to store the Gemma 2:2b LLM and Ollama files has been created" alt="The bucket to store the Gemma 2:2b LLM and Ollama files has been created">

After the bucket is created, the next task is to deploy Ollama on Google Cloud Run.

## Deploy Ollama on Google Cloud Run

To deploy Ollama on Google Cloud Run, search for `cloud run` on the search bar:

<img class="center" src="/images/ollama-google-cloud-run/11search-cloud-run.jpg" loading="lazy" title="Serach for cloud run on the GCP console search bar" alt="Serach for cloud run on the GCP console search bar">

Then click `Cloud Run` to go to the Cloud Run page. On that page, click on `Deploy Container` and then click on `Service` as shown below:

<img class="center" src="/images/ollama-google-cloud-run/12add-cloud-run-service.jpg" loading="lazy" title="Add a cloud run service on the Cloud Run service listing page" alt="Add a cloud run service on the Cloud Run service listing page">

You will do all the important configurations on this page, so be careful. You will need to fill up the form as follows:

* In the `Container image URL` type in `ollama/ollama:0.5.7` - at the time of writing, `0.5.7` is the latest release and available as an image on [DockerHub](https://hub.docker.com/r/ollama/ollama)
* In the service name, type in `ollama-gcs`
* Make sure the region is the same as the bucket, which is `us-central1`
* For now, select `Allow unauthenticated invocations`. This will make it accessible to anyone on the web, but we are doing it for the sake of this demo. In a real-life scenario, you would put it behind authentication.
 
Till now, the form will look like the below:

<img class="center" src="/images/ollama-google-cloud-run/13cloud-run-container-settings.jpg" loading="lazy" title="Point Cloud Run to use Ollama version 0.5.7 on Docker hub and use us-centra1 as the region" alt="Point Cloud Run to use Ollama version 0.5.7 on Docker hub and use us-centra1 as the region">

Then, for billing select `Instance-based` and keep the `Minimum number of instances` to 0. This makes it serverless. When no requests are coming in, no instances will be up and running, saving you money. After that, select the `Ingerss` to be `All` so that it allows traffic from the internet. At this point, your form will look as follows:

<img class="center" src="/images/ollama-google-cloud-run/14cloud-run-billing.jpg" loading="lazy" title="Select instance based billing, set minimum instances to 0 and ingress to All" alt="Select instance based billing, set minimum instances to 0 and ingress to All">

In the next part, you will link the GCS bucket as a Cloud Run volume.

### Wire up GSC bucket as a Cloud Run Volume

This is an important part where you will link up the Google Cloud Storage (GCS) bucket created in the previous part as a volume for Google Cloud Run Containers. Click the volumes tab on the `Container(s), Volumes, Networking, Security` part:

<img class="center" src="/images/ollama-google-cloud-run/15cloud-run-volumes-tab.jpg" loading="lazy" title="Click the Cloud Run - Volumes tab" alt="Click the Cloud Run - Volumes tab">

Then click `Add Volume` and select the `Volume type` as `Cloud Storage Bucket`. Let the name be `gcs-1`, and then for the `Bucket` click `Browse` and select the bucket you created in the previous step, which will be named something like `olllama-gemma2-2b-xyz`. Then click `Select`, at this point, the form will look like the below:

<img class="center" src="/images/ollama-google-cloud-run/16cloud-run-volume-gcs.jpg" loading="lazy" title="Link the GCS bucket created in the previous step as volume named gcs-1" alt="Link the GCS bucket created in the previous step as volume named gcs-1">

Leave the `Read-only` checkbox unchecked, as the Cloud Run instances will write files to this bucket. Then click `Done`. It will say the bucket is `Not mounted` , which is fine.

<img class="center" src="/images/ollama-google-cloud-run/17cloud-run-not-mounted.jpg" loading="lazy" title="Cloud Run GCS volume linked but not mounted" alt="Cloud Run GCS volume linked but not mounted">

After that, click the `Go to container(s) tab` or the `Container(s)` tab; on this tab, click the `Volume mounts` sub-tab, then click `Mount Volume`. Next, select the `Name-1` as `gcs-1` and on the `Mount path 1` type in `/root/.ollama`  (don’t miss the `.` in front of ollama); this is where Ollama stores its models. So when the models are pulled (downloaded), they will be saved in this volume, which will also be saved in the bucket. It can be used in other instances as it is in the bucket.

<img class="center" src="/images/ollama-google-cloud-run/18cloud-run-mount-volume.jpg" loading="lazy" title="Mount gcs-1 volume at /root/.ollama path" alt="Mount gcs-1 volume at /root/.ollama path">

Then click `Done`. You will set some environment variables for the container next. Click `Container: ollama-1` under the `Containers` tab to do this. Then click the `Variables and Secrets` sub-tab; after that, click `Add Variable`, and fill up the following in `Name 1` and `Value 1`:

* `OLLAMA_HOST` with value `0.0.0.0:8080` – this will make Ollama run on port 8080, not the default port of `11434`

Similarly, add three more variables using the `Add Variable` button and fill up the following values:

* `OLLAMA_DEBUG` with value `false` – this is self-explanatory
* `OLLAMA_KEEP_ALIVE` with value `-1` – it keeps the model weight on the GPU (if GPU is used)
* `GIN_MODE` with value `release` – is to remove any [Go Gin](https://github.com/gin-gonic/gin) debug-related message. Ollama uses [Gin](https://github.com/ollama/ollama/blob/main/server/routes.go#L43) under the hood,

Your `Variables and Secrets` section will look like the below when you are done:

<img class="center" src="/images/ollama-google-cloud-run/19cloud-run-variables.jpg" loading="lazy" title="Set all 4 needed variables of Ollama for Cloud Run" alt="Set all 4 needed variables of Ollama for Cloud Run">

After that, click the `Settings` tab and set the `Memory` to `32 GiB` and the `CPU` to `8`. You can request GPU access for your project by clicking the `GPU quota` link and filling out a form. Gemma 2 on Ollama will run (a bit slower, though) without the GPU.

<img class="center" src="/images/ollama-google-cloud-run/20cloud-run-resources.jpg" loading="lazy" title="Set Port for Cloud Run to 8080 and allocate 32 GB of memory and 8 CPUs" alt="Set Port for Cloud Run to 8080 and allocate 32 GB of memory and 8 CPUs">

Your `Setting` section will look like the above when you are done editing it; after that, you can click `Done`. Then, move on to the `Requests` section. Here, you can set the `Request timeout` to `300` seconds  (5 minutes), the default value, and keep the  
`Maximum concurrent requests per instance` at `80`. Keep the `Minimum number of instances` as `0`; the only value you should change will be `Maximum number of instances`; keep it at 3 or 4 maximum. If someone attacks your service, it should timeout or send back a server error, then scale a lot, costing you loads of money. Your Cloud Run service creation form will look like the below:

<img class="center" src="/images/ollama-google-cloud-run/21cloud-run-instances.jpg" loading="lazy" title="Set Port for Cloud Run timeout, max concurrency and min and max number of instances" alt="Set Port for Cloud Run timeout, max concurrency and min and max number of instances">

Then click `Create` and wait for some time as the `Ollama` image is 1.5 GB, it will take a bit to start. It will look like the following when it is deploying:

<img class="center" src="/images/ollama-google-cloud-run/22cloud-run-creating.jpg" loading="lazy" title="Cloud run creating the Ollama service" alt="Cloud run creating the Ollama service">

It will look like the below after it is deployed successfully:

<img class="center" src="/images/ollama-google-cloud-run/23cloud-run-created.jpg" loading="lazy" title="Cloud Run Service with Ollama created sucessfully and has a working URL now" alt="Cloud Run Service with Ollama created sucessfully and has a working URL now">

Click the service URL to see if it is working:

<img class="center" src="/images/ollama-google-cloud-run/24cloud-run-ollama-up.jpg" loading="lazy" title="Ollama server is running on Cloud Run without any models" alt="Ollama server is running on Cloud Run without any models">

It will show `Ollama is running` as above if everything went fine. At this point, Ollama has no models to run any inference. So, in the next section, you will pull in and test Gemma 2:2b with Ollama using the Google Cloud Console. Gemma 2 will be the first model for this instance of Ollama.

## Testing Gemma 2 with Ollama on Google Cloud Console

To test Gemma2 (or any other [model](https://ollama.com/search) that can run on Ollama), go back to the Google Cloud Console on the Cloud Run service page and click the Cloud Shell button (or hit G and then S on your keyboard). This will open the [Google Cloud Shell](https://cloud.google.com/shell/docs/using-cloud-shell) terminal.

On the terminal, type `curl -fsSL https://ollama.com/install.sh | sh` to install Ollama; it has been taken from the Ollama Linux installation [page](https://ollama.com/download/linux). Let it execute, and it will show an output like the one below:

<img class="center" src="/images/ollama-google-cloud-run/25ollama-install.jpg" loading="lazy" title="Install Ollama on Google Cloud console with the script from the official website" alt="Install Ollama on Google Cloud console with the script from the official website">

Then, copy the URL of your service, which will be something like `https://ollama-gcs-<some-number-here>.us-central1.run.app`. You can use the copy icon beside the URL. After that, execute the following command on your terminal:

```bash
OLLAMA_HOST=<copied-url> ollama run gemma2:2b
```

It will download (pull) Gemma 2:2b and save it in the GCS bucket (a linked volume), and then you can chat with Gemma 2:2b. You can ask `who are you and Gemma will reply`:

<img class="center" src="/images/ollama-google-cloud-run/26ollama-use-gemma2.jpg" loading="lazy" title="Use Gemma 2 2B params with Ollama installed on Google Cloud Console" alt="Use Gemma 2 2B params with Ollama installed on Google Cloud Console">

You can download/pull any other model Ollama supports and start using it. For example, you can download `llama3.3:70b` by Meta, `phi4:14b` by Microsoft, or even `smollam2:135m`, which is only 271 MB in size compared to other models, which are GBs in size.

You can type `/bye` to get out of the ollama CLI. Now, as Gemma 2:2b is downloaded, you can also send a cURL command to test it out like the one below:

```bash
curl -i https://ollama-gcs-<some-number-here>.us-central1.run.app/api/generate -d '{
  "model": "gemma2:2b",
  "prompt": "Why is the sky blue? Give the shortest answer possible",
  "stream": false
}'
```

It will give an output as follows:
 
<img class="center" src="/images/ollama-google-cloud-run/27ollama-curl.jpg" loading="lazy" title="Use Gemma 2 2B params with Ollama using a cURL POST on the generate API endpoint" alt="Use Gemma 2 2B params with Ollama using a cURL POST on the generate API endpoint">

If you go in the bucket and look at its contents, you will find Gemma 2 there:

<img class="center" src="/images/ollama-google-cloud-run/28ollama-gemma-gcs.jpg" loading="lazy" title="Gemma 2 2B files in the Google Cloud Storage bucket created in the first step" alt="Gemma 2 2B files in the Google Cloud Storage bucket created in the first step">

Google Cloud Run makes it easy to run any LLM on Ollama. You can run Phi 4, Llama 3, or any other model; you must pull it and run your command or POST with curl. You can also use libraries like [LiteLLM](https://www.litellm.ai/) to use the model in your apps using Ollama’s [APIs](https://github.com/ollama/ollama/blob/main/docs/api.md). It would be great if you could explore Ollama more on your own. You can also use [Open WebUI](https://github.com/open-webui/open-webui) to have a GUI on top of Oallma running Gemma 2 LLM.

## Conclusion

It is easy to run any LLM with Ollama on Google Cloud Run. Be careful of the access as Ollama APIs allow pulling models and even [deleting](https://github.com/ollama/ollama/blob/main/docs/api.md#delete-a-model) them. With Cloud Run, you will only pay for the resources when you use it, which makes it ideal for experiments. I hope you learned something new from this post and keep experimenting.
