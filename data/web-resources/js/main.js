import { createSearchInput } from "@streamx-hub/search/search-inline";
import { BASE_SEARCH_URL, SEARCH_QUERY_PARM } from "./utils.js";

createSearchInput({
    showSearchButton: false,
    searchApiUrl: `${BASE_SEARCH_URL}/pages`,
    searchPageUrl: (query) =>
        `/search-results.html?${SEARCH_QUERY_PARM}=${encodeURIComponent(query)}`,
    suggestionsAsLinks: true,
}, document.querySelector("#site-search"));