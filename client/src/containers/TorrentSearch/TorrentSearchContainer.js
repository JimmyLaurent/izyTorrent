import {connect} from 'react-redux';
import {backSelected, loadProviders, providerSelected, categorySelected, queryChanged, searchTorrents, downloadTorrent, goToDetail} from './TorrentSearchActions';
import {TorrentSearchPage} from './TorrentSearchPage';

const mapDispatchToProps = dispatch => {
	return {
		onBackSelected: () => dispatch(backSelected()),
    loadProviders:  () => dispatch(loadProviders()),
    onProviderChange: (e) => dispatch(providerSelected(e.target.value)),
    onCategoryChange: (e) => dispatch(categorySelected(e.target.value)),
    onQueryChange: (e) => dispatch(queryChanged(e.target.value)),
    onTorrentSearch: () => dispatch(searchTorrents()),
    torrentDownload: (torrent) => dispatch(downloadTorrent(torrent)),
    goToDetail: (torrent) => dispatch(goToDetail(torrent)),
	};
};

const mapStateToProps = (state) => ({
  torrentSearch: state.torrentSearch
});

export const TorrentSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TorrentSearchPage);