import React, { Component } from 'react';
import { Page, Navbar, NavLeft, NavCenter, NavRight, Link, Icon, List, ListItem, ContentBlockTitle, ContentBlock, Progressbar, ListItemSwipeoutButton, ListItemSwipeoutActions } from 'framework7-react';
import { humanizeSize, humanizeTime, getPriorityLabel } from '../../utils/utils';

export class TorrentDetailPage extends Component {

    componentDidMount() {
        this.props.loadTorrentFiles();
        this.loadTorrentFilesInterval = setInterval(() => { this.props.loadTorrentFiles(); }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.loadTorrentFilesInterval);
    }

    render() {
        return (
            <Page>
                <Navbar>
                    <NavLeft backLink onBackClick={this.props.onBackSelected} sliding></NavLeft>
                    <NavCenter>{this.props.torrent.name}</NavCenter>
                    <NavRight>
                    </NavRight>
                </Navbar>
                <ContentBlockTitle>Files</ContentBlockTitle>
                {this.props.files && this.props.files.length === 0 ? <ContentBlock>No file yet</ContentBlock> : ''}
                <List mediaList>
                    {
                        this.props.files && this.props.files.map((f, i) =>
                            <ListItem
                                swipeout
                                key={f[0]}
                                title={f[0]}
                                after={getPriorityLabel(f[3])}
                                subtitle={`${humanizeSize(f[2])} of ${humanizeSize(f[1])} (${((f[2] / f[1]) * 100).toFixed(1)} %)`}
                            >
                                <ListItemSwipeoutActions>
                                    <ListItemSwipeoutButton onClick={this.props.setFilePriority.bind(this, this.props.torrent.hash, i, 0)} close color="red">Skip</ListItemSwipeoutButton>
                                    <ListItemSwipeoutButton onClick={this.props.setFilePriority.bind(this, this.props.torrent.hash, i, 1)} close color="yellow">Low</ListItemSwipeoutButton>
                                    <ListItemSwipeoutButton onClick={this.props.setFilePriority.bind(this, this.props.torrent.hash, i, 2)} close color="orange">Normal</ListItemSwipeoutButton>
                                    <ListItemSwipeoutButton onClick={this.props.setFilePriority.bind(this, this.props.torrent.hash, i, 3)} close color="green">High</ListItemSwipeoutButton>
                                </ListItemSwipeoutActions>
                            </ListItem>
                        )
                    }
                </List>

            </Page>
        );
    }
}
