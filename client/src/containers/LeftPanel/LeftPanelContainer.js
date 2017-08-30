import { connect } from 'react-redux';
import { LeftPanel } from './LeftPanel';
import { filterAndNavigateToTorrentList } from './LeftPanelActions';
import { navigateTo } from 'framework7-redux';
import { filterTorrents } from '../../utils/utils';

const getCountByFilter = (torrents, filter) => torrents ? filterTorrents(torrents, filter).length : 0;

const getTorrentCategory = (torrents, name, filter) => {
    return {
        label: name + ' (' + getCountByFilter(torrents, filter) + ')',
        filter: filter
    };
}

const getTorrentCategories = (torrents) => {
    return [
        getTorrentCategory(torrents, 'All', 'all'),
        getTorrentCategory(torrents, 'Downloading', 'downloading'),
        getTorrentCategory(torrents, 'Seeding', 'seeding'),
        getTorrentCategory(torrents, 'Active', 'active'),
        getTorrentCategory(torrents, 'Inactive', 'inactive'),
    ];
}


const mapDispatchToProps = dispatch => {
    return {
        filterAndNavigateToTorrentList: (filter) => dispatch(filterAndNavigateToTorrentList(filter)),
        navigateTo: (path) => dispatch(navigateTo(path, true))
    };
};

const mapStateToProps = (state) => ({
    torrentCategories: getTorrentCategories(state.torrentList.torrents)
});

export const LeftPanelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftPanel);