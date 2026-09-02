import { createSearchInput } from "@streamx-hub/search/search-inline";
import { BASE_SEARCH_URL } from "./utils.js";

createSearchInput({
    showSearchButton: false,
    searchApiUrl: `${BASE_SEARCH_URL}/pages`,
    queryParam: "stx-search",
    searchPageUrl: (query) =>
        `/search-results.html?stx-search=${encodeURIComponent(query)}`,
}, document.querySelector("#site-search"));