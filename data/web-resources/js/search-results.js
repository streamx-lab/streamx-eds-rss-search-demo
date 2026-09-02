import { createResultsPanel } from "@streamx-hub/search/search-results-panel";
import { BASE_SEARCH_URL, renderers } from "./utils.js";

const searchPage = createResultsPanel(
    {
        showSearchButton: false,
        searchApiUrl: `${BASE_SEARCH_URL}/pages`,
        queryParam: "stx-search",
        searchPageUrl: (query) =>
            `/search-results.html?stx-search=${encodeURIComponent(query)}`,
    },
    {
        dataSources: [`${BASE_SEARCH_URL}/query/body`],
        method: "POST",
        requestId: "eds-pages",
        pageSize: 20,
        facetFields: ["category"],
        queryParam: "stx-search",
        renderers,
    },
);

document.querySelector("#search-results-list").append(searchPage);
