import { createSearchTabs } from "@streamx-hub/search/search-tabs";
import {BASE_SEARCH_URL, renderers} from "./utils.js";

const searchTabs = createSearchTabs(
    {
        showSearchButton: false,
        searchApiUrl: `${BASE_SEARCH_URL}/pages`,
        queryParam: "stx-search",
        searchPageUrl: (query) => `/search?stx-search=${encodeURIComponent(query)}`,
    },
    [
        {
            id: "products",
            displayName: "Products",
            results: {
                dataSources: [`${BASE_SEARCH_URL}/query/body`],
                method: "POST",
                requestId: "eds-pages",
                pageSize: 20,
                facetFields: ["category"],
                queryParam: "stx-search",
                renderers,
            },
        },
        {
            id: "articles",
            displayName: "Articles",
            results: {
                dataSources: [`${BASE_SEARCH_URL}/query/body`],
                method: "POST",
                requestId: "eds-pages",
                pageSize: 20,
                facetFields: ["category"],
                queryParam: "stx-search",
                renderers,
            },
        },
    ],
);

document.querySelector("#search-results-list").append(searchTabs);
