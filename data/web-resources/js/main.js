import { createSearchInput } from "@streamx-hub/search/search-inline";

createSearchInput({
    showSearchButton: false,
    searchApiUrl: "http://localhost:8082/search/pages",
    searchPageUrl: (query) =>
        `/search-results.html?stx-search=${encodeURIComponent(query)}`,
}, document.querySelector("#site-search"));