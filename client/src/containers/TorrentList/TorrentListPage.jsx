import React, { Component } from 'react';
import { Page, Navbar, NavLeft, NavCenter, NavRight, Link, List, ListItem, ListItemSwipeoutButton, ListItemSwipeoutActions, Searchbar, Views, View, Pages, Progressbar, ContentBlockTitle } from 'framework7-react';
import { getStatusLabel, humanizeSize, humanizeTime } from '../../utils/utils';

export class TorrentListPage extends Component {

    componentWillUnmount() {
        clearInterval(this.loadTorrentListInterval);
    }

    render() {
        return (
            <Page>
                <Navbar className="navbar-no-shadow nav-bar-small-text">
                    <NavLeft>
                        <Link icon="icon-bars" openPanel="left" />
                    </NavLeft>
                    <NavCenter sliding>Torrents ({this.props.filter})</NavCenter>
                    <NavRight className="margin-right">{this.props.downloadSpeed !== undefined ? '↓ ' + humanizeSize(this.props.downloadSpeed) + '/s ' : ''} {this.props.uploadSpeed  !== undefined ? '↑ ' +  humanizeSize(this.props.uploadSpeed) + '/s' : ''}</NavRight>
                </Navbar>
                {!this.props.connected && <ContentBlockTitle>Server not connected to utorrent</ContentBlockTitle>}
                <List mediaList>
                    {
                        this.props.torrents && this.props.torrents.map((t) => {
                            return <ListItem swipeout
                                key={t.name}
                                title={t.name}
                                after={t.percentProgress === 1000 || t.eta === 0 ? '' : humanizeTime(t.eta)}
                                subtitle={
                                    t.percentProgress === 1000 ?
                                        `DL ${humanizeSize(t.downloaded)} / UP ${humanizeSize(t.uploaded)} (${(t.percentProgress / 10).toFixed(1)} %)` :
                                        `${humanizeSize(t.downloaded)} of ${humanizeSize(t.size)} (${(t.percentProgress / 10).toFixed(1)} %)`
                                }
                                innerSlot={
                                    <div>
                                        <Progressbar progress={Math.round(t.percentProgress / 10)} color={t.percentProgress === 1000 ? 'green' : 'blue'}></Progressbar>
                                        <div className="item-title-row">
                                            <div className="item-subtitle">{getStatusLabel(t.status, t.percentProgress)}</div>
                                            <div className="item-after">{t.percentProgress === 1000 ? 'Ratio: ' + (t.ratio / 1000).toFixed(2) : ''} {t.downloadSpeed !== 0 ? ' ↓ ' + humanizeSize(t.downloadSpeed) + '/s' : ''} {t.uploadSpeed !== 0 ? ' ↑ ' + humanizeSize(t.uploadSpeed) + '/s' : ''}</div>
                                        </div>
                                    </div>
                                }
                                onClick={() => this.props.goToDetail(t.hash)}
                            >
                                <ListItemSwipeoutActions>
                                    <ListItemSwipeoutButton onClick={this.props.toggleTorrentState.bind(this, t.hash)} close color="orange">{t.status & 1 ? 'Stop' : 'Start'}</ListItemSwipeoutButton>
                                    {/*<ListItemSwipeoutButton onClick={this.props.removeTorrent.bind(this, t.hash)} close color="red">Delete</ListItemSwipeoutButton>*/}
                                    <ListItemSwipeoutButton onClick={this.props.removeTorrentAndDatas.bind(this, t.hash)} close color="red">Delete</ListItemSwipeoutButton>
                                </ListItemSwipeoutActions>
                            </ListItem>
                        })
                    }
                </List>
            </Page>
        )
    };
};
