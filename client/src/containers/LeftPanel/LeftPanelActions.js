import { navigateTo } from 'framework7-redux';

const filterTorrentList = (filter) => {
	return { type: 'SET_TORRENT_LIST_FILTER', item: filter };
}

export const filterAndNavigateToTorrentList = (filter) => {
	return (dispatch, getState) => {
		dispatch(filterTorrentList(filter));
		dispatch(navigateTo('/list/', true));
	};
}