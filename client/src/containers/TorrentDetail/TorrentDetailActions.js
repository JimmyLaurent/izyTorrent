import { showAlert, showPreloader, hidePreloader, navigateTo } from 'framework7-redux';
import { goBack} from 'framework7-redux';
import { showNotification } from '../../common/Framework7Actions';

const loadTorrentFilesSuccess = (torrentFilesResponse) => {
	return { type: 'LOAD_TORRENT_FILES_SUCCESS', item: torrentFilesResponse };
}

const clearTorrentFiles = () => {
	return { type: 'CLEAR_TORRENT_FILES' };
}

export const backSelected = () => {
	return (dispatch) => {
		dispatch(clearTorrentFiles());
		dispatch(goBack());
	};
};

export const loadTorrentFiles = () => {
	return (dispatch, getState) => {
		fetch(`/api/torrent/do?action=getfiles&hash=${getState().torrentList.currentTorrentHash}`, {
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		})
			.then((res) => res.json())
			.then((torrentFilesResponse) => {
				dispatch(loadTorrentFilesSuccess(torrentFilesResponse));
			})
			.catch(error => {
				dispatch(showAlert(error, 'Error'));
			});
	};
}

export const setFilePriority = (hash, fileIndex, priority) => {
	return (dispatch, getState) => {
		fetch(`/api/torrent/do?action=setprio&hash=${hash}&p=${priority}&f=${fileIndex}`,
			{ credentials: 'include' })
			.then(() => dispatch(showNotification('Priority changed')))
			.catch(error => dispatch(showAlert(error, 'Error')));
	};
}