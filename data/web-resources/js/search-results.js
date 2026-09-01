import { createResultsPanel } from "@streamx-hub/search/search-results-panel";
import { renderers } from "./utils.js";

const searchPage = createResultsPanel(
    {
        showSearchButton: false,
        searchApiUrl: "http://localhost:8082/search/pages",
        searchPageUrl: (query) =>
            `/search-results.html?stx-search=${encodeURIComponent(query)}`,
    },
    {
        dataSources: ["http://localhost:8082/search/query/body"],
        method: "POST",
        requestId: "eds-pages",
        pageSize: 20,
        facetFields: ["category"],
        renderers,
    },
);

document.querySelector("#search-results-list").append(searchPage);
