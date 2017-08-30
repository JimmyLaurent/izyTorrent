# izyTorrent

A mobile uTorrent interface with torrent search feature.

## Features

  * Basic management of your torrents (start, stop, delete with data)
  * List torrent files and set priority
  * Search and add new torrents from a large list of torrent providers (iptorrents, torrentleech, torrent9, torrentz2, 1337x, thepiratebay, Yggtorrent, t411.si, TorrentProject, ...)

## Screenshots

<img src="https://user-images.githubusercontent.com/25406553/29870326-2e5b6018-8d87-11e7-82fc-c3da7de0d987.png" width="400">

## Requirements

 * Node and npm

## Install

```bash
$ git clone https://github.com/JimmyLaurent/izyTorrent.git
$ cd izyTorrent
$ npm install
$ npm run client-install
$ npm run build
```

Edit your configuration file (see configuration section) then start the server.

```bash
$ npm start
```

Open your browser at http://localhost/

## Configuration

```json
{
    "torrentProviders": {
        "torrentproject": [],
        "Yggtorrent": ["myLogin", "myPassword"]
    },
    "utorrent": {
        "host": "localhost",
        "port": "8080",
        "login": "myLogin",
        "password": "myPassword"
    },
    "server" : {
        "port": 80,
        "htaccessFilePath":  "users.htpasswd"
    }
}
```

- torrentProviders: array of enabled torrent providers ( see [torrent-search-api](https://github.com/JimmyLaurent/torrent-search-api) for supported providers)

- utorrent: define connection to your utorrent client (you must enable the Web Interface in utorrent)

- server: define izyTorrent port and a relative file path to the users htaccess file.

Note: The users htaccess file is used to store usernames and passwords for HTTP authentication. Default login is "admin" and default password is "password".

## License

MIT © 2017 [Jimmy Laurent](https://github.com/JimmyLaurent)