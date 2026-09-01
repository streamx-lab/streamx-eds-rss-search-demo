import { createSearchTabs } from "@streamx-hub/search/search-tabs";
import { renderers } from "./utils.js";

const searchTabs = createSearchTabs(
    {
        showSearchButton: false,
        searchApiUrl: "/api/suggestions",
        searchPageUrl: (query) => `/search?stx-search=${encodeURIComponent(query)}`,
    },
    [
        {
            id: "products",
            displayName: "Products",
            results: {
                dataSources: ["http://localhost:8082/search/query/body"],
                method: "POST",
                requestId: "eds-pages",
                pageSize: 20,
                facetFields: ["category"],
                renderers,
            },
        },
        {
            id: "articles",
            displayName: "Articles",
            results: {
                dataSources: ["http://localhost:8082/search/query/body"],
                method: "POST",
                requestId: "eds-pages",
                pageSize: 20,
                facetFields: ["category"],
                renderers,
            },
        },
    ],
);

document.querySelector("#search-results-list").append(searchTabs);
