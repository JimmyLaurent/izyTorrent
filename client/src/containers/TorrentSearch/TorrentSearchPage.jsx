import React, { Component } from 'react';
import { Page, Navbar, NavLeft, NavCenter, Link, List, ListItem, ListItemSwipeoutButton, ListItemSwipeoutActions, Searchbar, Views, View, Pages } from 'framework7-react';

export class TorrentSearchPage extends Component {

    constructor(props, context) {
        super(props, context);
        
    }

    componentDidMount() {
        if (!this.props.torrentSearch.providers) {
            this.props.loadProviders();
        }
    }

    handleSearchSubmit(e) {
        // Hack to hide keyboard on smartphone
        e.target.firstElementChild.firstElementChild.blur();
        this.props.onTorrentSearch();
    }

    render() {
        return (
            <Page>
                <Navbar className="navbar-no-shadow">
                    <NavLeft>
                        <Link icon="icon-bars" openPanel="left" />
                    </NavLeft>
                    <NavCenter sliding>Search</NavCenter>
                </Navbar>
                <Searchbar
                    cancelLink="Cancel"
                    placeholder="Search"
                    onChange={this.props.onQueryChange}
                    onSubmit={this.handleSearchSubmit.bind(this)}
                    value={this.props.torrentSearch.query}
                    clearButton={true}
                />
                <List form className="list-block-no-top-margin">
                    <ListItem smartSelect smartSelectOpenIn="picker" smartSelectBackOnSelect={true} title="Site" after={this.props.torrentSearch.selectedProvider && this.props.torrentSearch.selectedProvider.name}>
                        <select onChange={this.props.onProviderChange}>
                            {this.props.torrentSearch.providers && this.props.torrentSearch.providers.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                        </select>
                    </ListItem>
                    <ListItem smartSelect smartSelectOpenIn="picker" smartSelectBackOnSelect={true} title="Category" afterStartSlot={<div className="item-after">{this.props.torrentSearch.selectedCategory}</div>}>
                        <select onChange={this.props.onCategoryChange} value={this.props.torrentSearch.selectedCategory}>
                            {this.props.torrentSearch.selectedProvider && this.props.torrentSearch.selectedProvider.categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </ListItem>
                </List>
                <List mediaList>
                    {
                        this.props.torrentSearch.torrents && this.props.torrentSearch.torrents
                            .map(t =>
                                <ListItem swipeout
                                    key={t.title}
                                    title={t.title}
                                    subtitle={`Size: ${t.size} Leechers: ${t.peers} Seeders: ${t.seeds} Time: ${t.time}`}
                                    link
                                    onClick={this.props.goToDetail.bind(this, t)}
                                >
                                    <ListItemSwipeoutActions>
                                        <ListItemSwipeoutButton value={t} onClick={this.props.torrentDownload.bind(this, t)} close color="green">Download</ListItemSwipeoutButton>
                                    </ListItemSwipeoutActions>
                                </ListItem>)
                    }
                </List>
            </Page>
        )
    };
};
