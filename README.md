# StreamX + Edge Delivery Services Template (RSS + Search)

This repository provides a **template project for integrating StreamX with Edge Delivery Services (EDS)**.

The integration allows **Edge Delivery Services to act as the primary content source**, while **StreamX handles ingestion, delivery, and search indexing**.

All pages and assets published from EDS are automatically ingested into StreamX and can be delivered through **StreamX services alongside the Edge Delivery CDN**.

Additionally, the template includes **OpenSearch**, which indexes all ingested pages to enable search capabilities across the delivered content.

---

# Architecture Overview

The system architecture works as follows:

1. **Edge Delivery Services (EDS)** acts as the primary content source.
2. When content is published from EDS:

    * Pages and assets are ingested into **StreamX**
    * The content becomes available through **StreamX delivery services**
3. **OpenSearch** indexes all ingested pages.
4. Content is delivered through:

    * **Edge Delivery CDN**
    * **StreamX**

```
EDS (Content Source)
        │
        │ publish
        ▼
   StreamX Ingestion
        │
        ├── Content Delivery
        │
        └── OpenSearch Indexing
```

---

# Prerequisites

Before starting the setup ensure you have:

* An existing **Edge Delivery Services (EDS) project**
* A **StreamX project created from this repository**
* Access to the **StreamX Console**

---

# EDS Template Configuration

⚠️ **Using Your Own EDS Repository**

This template is preconfigured to work with a **demo Edge Delivery Services (EDS) source**.

If you want to connect your own EDS project, additional configuration is required.

## Step 1 — Prepare your repository

Before configuring ingestion, you should:

1. **Fork this repository**
2. Update EDS-related domain configuration in the following files:

```
external-references-rewriter.pages.properties
external-references-rewriter.web-resources.properties
```

3. In both files, update:

```
streamx.blueprints.external-references-rewriter.base-url-for-relative-paths=<YOUR_EDS_DOMAIN>
```

Replace `<YOUR_EDS_DOMAIN>` with your actual **Edge Delivery Services domain**.

### Why this matters

These properties control how **relative URLs (links, assets, scripts)** are rewritten.

If you skip this step:

* Your app will still point to the **demo EDS**
* Assets and links may break or resolve incorrectly

---

## Step 2 — Connect your repository in StreamX

After preparing your fork:

1. Go to **StreamX Console**
2. Open your project **Settings**
3. Update the repository URL to point to **your fork**

This ensures that:

* Your configuration changes are used
* Your EDS source is properly integrated

---

# EDS Project Configuration

## Configure ingestion

Your **Edge Delivery Services repository** must be configured to allow synchronization of frontend resources with StreamX.

Add the following **environment variables** to the repository configuration [Github -> Settings -> Secrets and variables -> Actions -> Secrets/Variables].
---

## EDS_DOMAIN_URL (Variables)

You EDS project live url. Used for fetching related resources

---

## STREAMX_INGESTION_INCLUDES (Variables)

Defines the list of file patterns that should be synchronized with StreamX.

Example:

```
STREAMX_INGESTION_INCLUDES=[
  "blocks/**",
  "components/**",
  "fonts/**",
  "icons/**",
  "images/**",
  "scripts/*.js",
  "styles/*.css",
  "libs/**",
  "templates/**",
  "helix-query.yaml"
]
```

These paths define which **frontend resources** will be ingested into StreamX.

---

## STREAMX_INGESTION_URL (Variables)

Use the ingestion URL obtained from the **Rest Ingestion Gateway** in the StreamX Console.

```
STREAMX_INGESTION_URL=<REST_INGESTION_URL>
```

---

## STREAMX_INGESTION_GH_TOKEN (Secrets)

Token used by the GitHub workflows to authenticate with StreamX.

You can retrieve the token from the **StreamX Console**:

```
Sources → GitHub
```

Then configure it in your repository:

```
STREAMX_INGESTION_GH_TOKEN=<TOKEN>
```

---

# GitHub Workflows

This template provides **GitHub workflows** responsible for synchronizing resources and content between EDS and StreamX.

All workflows can be found in:

```
github-action/
```

They must be copied into your EDS repository:

```
.github/workflows/
```

---

# Workflow 1 — Full Repository Sync

This workflow performs a **full synchronization of frontend resources** from the EDS repository into StreamX.

It is typically used:

* During **initial setup**
* When performing **manual re-synchronization**

### Workflow Name

```
Sync web resources with StreamX
```

### How to Run

1. Go to **GitHub Actions**
2. Select:

```
Sync web resources with StreamX
```

3. Click **Run workflow**
4. Choose the branch you want to synchronize (e.g., main).

The workflow will ingest all resources defined in:

```
STREAMX_INGESTION_INCLUDES
```

---

# Workflow 2 — Publish to StreamX

This workflow handles **content published through Edge Delivery Services**.

Whenever new content is published in EDS:

* The content is **ingested into StreamX**
* The pages are **indexed in OpenSearch**
* Updated content becomes available through **StreamX delivery services**

### Workflow Name

```
Publish to StreamX
```

### Trigger

This workflow runs automatically when:

* Content is **published through Edge Delivery Services**

It ensures that **new or updated content is immediately synchronized with StreamX**.

---

# Searching Indexed Pages

All pages ingested from **Edge Delivery Services (EDS)** are automatically indexed in **OpenSearch**.

This allows searching through the delivered content using the built-in search endpoint.

You can query indexed pages using the following path:

```
/search/pages?query=YOUR_QUERY
```

### Example

```
/search/pages?query=homepage
```

This endpoint returns pages that match the provided search query based on the **OpenSearch index** created during ingestion.

### Search Flow

1. Content is published in **Edge Delivery Services**
2. The content is ingested into **StreamX**
3. Pages are indexed in **OpenSearch**
4. The search endpoint returns matching results

```
EDS Publish
     │
     ▼
StreamX Ingestion
     │
     ▼
OpenSearch Index
     │
     ▼
/search/pages?query=YOUR_QUERY
```

---

# Result

After completing the setup:

* Frontend resources from the **EDS repository** are synchronized with **StreamX**
* All pages are **indexed in OpenSearch**
* Content can be delivered through:

    * **Edge Delivery CDN**
    * **StreamX Delivery Services**

