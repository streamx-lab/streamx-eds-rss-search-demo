# StreamX + Search + RSS

StreamX template project with Search and RSS Feed.

# Running the Mesh Locally

Follow the steps below to set up and run the Mesh in a local environment.

## 1. Install the StreamX CLI

Install the StreamX CLI using Homebrew:

```bash
brew install streamx-com/preview-tap/streamx
```

## 2. Start StreamX

From the root directory of the project, run:

```bash
streamx local run -f ./mesh/mesh.yaml
```

This will start the local StreamX environment using the Mesh configuration defined in `mesh/mesh.yaml`.

## 3. Configure the Ingestion Endpoint

Configure the local ingestion endpoint:

```bash
streamx settings set streamx.ingestion.url http://localhost:8080
streamx settings set streamx.ingestion.auth-token <token-generated-when-starting-streamx>
```

Replace `<token-generated-when-starting-streamx>` with the authentication token generated when starting StreamX.

## 4. Publish Templates

Templates use Pebble Templates to generate output. The query result is serialized into the following payload structure:

```json
{
  "resources": [
    {
      "subject": "...",
      "title": "...",
      "content": "...",
      "facets": {
        "...": "..."
      },
      "fields": {
        "...": "..."
      }
    }
  ]
}
```

Templates used to generate the output files are located in:

```text
/data/templates
```

Publish the templates with:

```bash
streamx publish events data/templates
```

## 5. Publish Contexts

The following configuration values are required for the renderer:

```json
{
  "rendererKey": "templates/feeds.html",
  "dataKeyMatchPattern": "latest-articles-rss",
  "dataTypeMatchPattern": null,
  "outputKeyTemplate": "/latestArticlesRss.xml",
  "outputTypeTemplate": "data/json",
  "outputFormat": "PAGE"
}
```

### Configuration

| Variable | Description                                                                                         |
|---|-----------------------------------------------------------------------------------------------------|
| `rendererKey` | Path to the template used to render the output.                                                     |
| `dataKeyMatchPattern` | Pattern used to match the data that should be passed to the renderer. Transformation name           |
| `dataTypeMatchPattern` | Optional pattern used to match the data type. Set to `null` when no data type matching is required. |
| `outputKeyTemplate` | Path where the generated output will be available.                                                  |
| `outputTypeTemplate` | Type of the generated output. Leave as it is.                                                       |
| `outputFormat` | Format of the generated output. Leave as it is.                                                     |

Contexts are located in:

```text
/data/contexts
```

They connect the templates with the corresponding data. Publish them using:

```bash
streamx publish events data/contexts
```

## 6. Publish Test Pages

Test pages are available in:

```text
/data/pages
```

Publish them with:

```bash
streamx publish events data/pages
```

## 7. Open the Sample Pages

Once everything is configured and published open:

http://edge.127.0.0.1.nip.io

to view the whole site. 

Sample feeds are available at:
http://edge.127.0.0.1.nip.io/latest-articles.xml

# How to add new FEED

1. Add new configuration in indexable-resources-producer.yaml

```yaml
car:
  facet: false
  element-selector: "//*[local-name()='meta'][@property='car']"
  key: car
  value-selector: "./@content"
```

2. Update Transformer configuration in indexable-resources-sql-transformer.yaml

```yaml
indexable-resources-sql-transformer:
  persisted-data:
    include-content: false
    fields: url,author,description,publication_date,modification_date,car
    facets: category
  transformations:
    latest-car-rss:
      sql-query: "SELECT r.* FROM indexable_resource r LEFT JOIN indexable_resource_fields f ON f.resource_subject = r.subject AND f.key = 'publication_date' ORDER BY f.value IS NULL, f.value DESC"

```
3. Add new template under /data/templates and publish it.

```text
<div>
  {% for resource in resources %}
  <feed>
    <id></id>
    <updated>{{ resource.fields.publication_date }}</updated>
    <title type="html">{{ resource.title }}</title>
    <description>{{ resource.fields.description }}</description>
    <car>{{ resource.fields.car }}</car>
  </feed>
  {% endfor %}
</div>
```
4. Add new context under /data/contexts and publish it.

Value in `dataKeyMatchPattern` should match `latest-car-rss` transformation name.

```text
{
  "rendererKey": "templates/cars-feed.html",
  "dataKeyMatchPattern": "latest-car-rss",
  "dataTypeMatchPattern": null,
  "outputKeyTemplate": "/latest-cars.xml",
  "outputTypeTemplate": "data/xml",
  "outputFormat": "PAGE"
}

```

Once everything is configured and published, sample feeds are available at:
http://edge.127.0.0.1.nip.io/latest-cars.xml

# Test Cases for RSS

**RSS-01 – Basic RSS generation**

1. Publish templates, contexts and pages.
2. Open `/latest-articles.xml`.
3. Verify the RSS response.

**Expected result:**
RSS is generated successfully and contains articles.

**RSS-02 – Change title in RSS template**

1. Open the RSS template.
2. Change the title mapping, for example:

```
<title type="html">TEST {{ resource.title }}</title>
```

3. Publish the template.
4. Open `/latest-articles.xml`.

**Expected result:**
The updated title is visible in the RSS feed.

**RSS-03 – Change description in RSS template**

1. Open the RSS template.
2. Change the description mapping to e.g. `summary`.
3. Publish the template.
4. Open `/latest-articles.xml`.

**Expected result:**
The updated description is visible in the RSS feed.

**RSS-04 – Add a new field to the RSS template**

1. Open the RSS template.
2. Add a new field, for example:

```
<car>{{ resource.fields.car }}</car>
```

3. Publish the template.
4. Add a new field to the page:

```text
  <meta property="car" content="Fiat">
```
5. Publish page
6. Open `/latest-articles.xml`.

**Expected result:**
The new `<car>` field is present in the generated RSS feed and contains the expected value.

**RSS-05 – Change transformation**

1. Open the `latest-articles-rss` transformation.
2. Modify the SQL query.
3. Publish the transformation.
4. Open `/latest-articles.xml`.

**Expected result:**
The RSS feed contains results according to the updated transformation.

**RSS-06 – Change RSS context**

1. Open the RSS context configuration.
2. Change the `outputKeyTemplate`.
3. Publish the context.
4. Open the RSS endpoint.

**Expected result:**
The RSS feed uses the updated context configuration and is generated successfully.