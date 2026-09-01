import { createResultsPanel } from "@streamx-hub/search/search-results-panel";

export function html(
    strings,
    ...values
) {
    const template = document.createElement("template");

    template.innerHTML = strings.reduce((acc, str, i) => {
        const val = values[i];
        if (
            val instanceof HTMLElement ||
            val instanceof Array ||
            val instanceof NodeList
        ) {
            return `${acc}${str}<template data-html-id="value-${i}"></template>`;
        }

        return acc + str + (val ?? "");
    }, "");

    template.content.querySelectorAll("[data-html-id]").forEach((el) => {
        const htmlId = el.dataset.htmlId;
        if (!htmlId) return;

        const idString = htmlId.split("-")[1];
        if (!idString) return;

        const numberFromID = parseInt(idString, 10);
        const targetValue = values[numberFromID];

        if (targetValue instanceof Array) {
            el.replaceWith(...targetValue);
            return;
        }

        if (targetValue instanceof NodeList) {
            el.replaceWith(...Array.from(targetValue));
            return;
        }

        if (targetValue instanceof HTMLElement) {
            el.replaceWith(targetValue);
            return;
        }

        console.error("Case not handled for", el);
    });

    const { children } = template.content;

    return children.length === 1 ? children[0] : children;
}

const renderers = {
    "item-page/eds": (item) => {
        const { title, fields } = item._source.payload;
        const { author, publication_date, description } = fields ?? {};
        const href = item._id.replace(/^\//, "");

        return html`
        <article class="custom-result-item-render">
          <div class="custom-result-item-render__header">
            <a class="custom-result-item-render__title" href="${href}">${title}</a>
          </div>
          <p class="custom-result-item-render__excerpt">${description}</p>
          <div class="custom-result-item-render__meta">
            ${author ? `<span>${author}</span>` : ""}
            ${publication_date ? `<span>${publication_date}</span>` : ""}
          </div>
        </article>
      `;
    },
};

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
        sortFields: ['publication_date'],
        renderers,
    },
);

document.querySelector("#search-results-list").append(searchPage);
