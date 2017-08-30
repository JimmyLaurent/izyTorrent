import { navigateTo, goBack, showAlert, showPreloader, hidePreloader } from 'framework7-redux';
import { showNotification } from '../../common/Framework7Actions'

const loadProvidersSuccess = (providers) => {
	return { type: 'LOAD_PROVIDERS_SUCCESS', item: providers };
}

const loadTorrentsSuccess = (torrents) => {
	return { type: 'LOAD_TORRENTS_SUCCESS', item: torrents };
}

const loadTorrentDetailSuccess = (result) => {
	return { type: 'LOAD_TORRENT_SEARCH_DETAIL_SUCCESS', item: result };
}

export const providerSelected = (provider) => {
	return { type: 'PROVIDER_SELECTED', item: provider };
}

export const categorySelected = (cat) => {
	return { type: 'CATEGORY_SELECTED', item: cat };
}

export const queryChanged = (query) => {
	return { type: 'QUERY_CHANGED', item: query };
}

export const backSelected = () => {
	return goBack();
};

export const loadProviders = () => {
	return (dispatch) => {
		fetch('/api/torrent/search/providers',
			{ credentials: 'include' })
			.then((res) => {
				return res.json();
			})
			.then((providers) => dispatch(loadProvidersSuccess(providers)))
			.catch(error => dispatch(showAlert(error, 'Error')))
	};
}

export const downloadTorrent = (torrent) => {
	return (dispatch) => {
		dispatch(showPreloader());
		fetch(`/api/torrent/add`, {
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify(torrent)
		})
			.then(() => {
				dispatch(showNotification('Torrent added'));
				dispatch(hidePreloader());
			})
			.catch(error => {
				dispatch(showNotification(error));
				dispatch(hidePreloader());
			});
	};
}

export const goToDetail = (torrent) => {
	return (dispatch) => {
		dispatch(showPreloader());
		fetch(`/api/torrent/search/details`, {
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify(torrent)
		})
			.then((res) => res.text())
			.then((torrentDetailRawHtml) => {
				dispatch(loadTorrentDetailSuccess({ torrent: torrent, html: torrentDetailRawHtml }));
				dispatch(hidePreloader());
				dispatch(navigateTo('/search-detail/'));
			})
			.catch(error => {
				dispatch(showAlert(error, 'Error'));
				dispatch(hidePreloader());
			});
	};
}

export const searchTorrents = () => {
	return (dispatch, getState) => {
		const torrentSearchState = getState().torrentSearch;
		let limit = 50;
		dispatch(showPreloader());
		// TODO: REPLACE FETCHS CALLS WITH AXIOS LIB
		fetch(`/api/torrent/search/${torrentSearchState.query}?providers=${torrentSearchState.selectedProvider.name}&category=${torrentSearchState.selectedCategory}&limit=${limit}`,
			{ credentials: 'include' })
			.then((res) => {
				return res.json();
			})
			.then((torrents) => {
				dispatch(loadTorrentsSuccess(torrents));
				dispatch(hidePreloader());
			})
			.catch(error => {
				dispatch(showNotification(error));
				dispatch(hidePreloader());
			});
	};
}

