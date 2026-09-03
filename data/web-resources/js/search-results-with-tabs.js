import { createSearchTabs } from "@streamx-hub/search/search-tabs";
import {
    BASE_SEARCH_URL,
    facetFields,
    renderers,
    SEARCH_QUERY_PARM,
    suggestionItem,
    suggestionItemSubmitValue
} from "./utils.js";

const searchTabs = createSearchTabs(
    {
        showSearchButton: false,
        searchApiUrl: `${BASE_SEARCH_URL}/pages`,
        searchPageUrl: (query) =>
            `/search-results.html?${SEARCH_QUERY_PARM}=${encodeURIComponent(query)}`,
        submitInPlace: true,
        renderers: { suggestionItem },
        suggestionItemSubmitValue,
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
                facetFields,
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
                facetFields,
                renderers,
            },
        },
    ],
);

document.querySelector("#search-results-list").append(searchTabs);
