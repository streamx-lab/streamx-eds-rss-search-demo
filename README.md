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
| `outputTypeTemplate` | Type of the generated output.                                                                       |
| `outputFormat` | Format of the generated output.                                                                     |

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

Once everything is configured and published, sample pages are available at:

http://edge.127.0.0.1.nip.io/index.html
