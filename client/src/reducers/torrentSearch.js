const torrentSearchInitialState = {
    torrentDetailRawHtml: ""
};

export default (state = torrentSearchInitialState, payload) => {
    switch (payload.type) {
        case 'LOAD_PROVIDERS_SUCCESS':
            if (payload.item !== null && payload.item.length > 0) {
                return Object.assign({}, state, {
                    providers: payload.item,
                    selectedProvider: payload.item[0],
                    selectedCategory: payload.item[0].categories[0]
                });
            }
            break;
        case 'PROVIDER_SELECTED':
            let provider = Object.assign({}, state.providers.find((e) => e.name === payload.item));
            return Object.assign({}, state, {
                selectedProvider: provider,
                selectedCategory: provider.categories[0]
            });
        case 'CATEGORY_SELECTED':
            return Object.assign({}, state, { selectedCategory: payload.item });
        case 'QUERY_CHANGED':
            return Object.assign({}, state, { query: payload.item });
        case 'LOAD_TORRENTS_SUCCESS':
            return Object.assign({}, state, { torrents: payload.item });
        case 'LOAD_TORRENT_SEARCH_DETAIL_SUCCESS':
            return Object.assign({}, state, {
                currentSearchTorrent: payload.item.torrent,
                torrentDetailRawHtml: payload.item.html
            });
        default:
            return state;
    }
};