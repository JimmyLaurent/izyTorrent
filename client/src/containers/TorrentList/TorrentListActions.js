import { showAlert, showPreloader, hidePreloader, navigateTo } from 'framework7-redux';

const loadTorrentListSuccess = (torrentList) => {
	return { type: 'LOAD_TORRENT_LIST_SUCCESS', item: torrentList };
}

const setCurrentTorrent = (torrentHash) => {
	return { type: 'SET_CURRENT_TORRENT_HASH', item: torrentHash };
}

export const loadTorrentList = () => {
	return (dispatch, getState) => {
		const cacheId = getState().torrentList.cacheId || '';
		fetch(`/api/torrent/list/?cid=${cacheId}`,
			{ credentials: 'include' })
			.then((res) => {
				return res.json();
			})
			.then((torrentList) => dispatch(loadTorrentListSuccess(torrentList)))
			.catch(error => dispatch(showAlert(error, 'Error')))
	};
}

export const toggleTorrentState = (hash) => {
	return (dispatch, getState) => {
		let torrent = getState().torrentList.torrents[hash];
		let action = torrent.status & 1 ? 'stop' : 'start';
		fetch(`/api/torrent/do?action=${action}&hash=${hash}`,
			{ credentials: 'include' })
			.catch(error => dispatch(showAlert(error, 'Error')));
	};
}

export const removeTorrentAndDatas = (hash) => {
	return (dispatch, getState) => {
		fetch(`/api/torrent/do?action=removedatatorrent&hash=${hash}`,
			{ credentials: 'include' })
			.catch(error => dispatch(showAlert(error, 'Error')));
	};
}

export const removeTorrent = (hash) => {
	return (dispatch, getState) => {
		fetch(`/api/torrent/do?action=remove&hash=${hash}`,
			{ credentials: 'include' })
			.catch(error => dispatch(showAlert(error, 'Error')));
	};
}

export const goToDetail = (torrentHash) => {
	return (dispatch) => {
		dispatch(setCurrentTorrent(torrentHash));
		dispatch(navigateTo('/detail/'));
	}
}