var peerflix = require('peerflix');
var Promise = require('bluebird');
var readTorrent = require('read-torrent');
var getPort = require('get-port');
var _ = require('lodash');
var path = require('path');
var os = require('os');
var fs = require('fs');

const temp = path.join(os.tmpdir(), 'throw-server')
if (!fs.existsSync(temp)){
    fs.mkdirSync(temp)
}

module.exports = {
    streams: {},

    init(torrent) {

        return Promise.all([this.read(torrent), getPort()])
            .spread((torrentInfo, port) => {
                var engine = peerflix(torrentInfo, {
                    tracker: true,
                    port,
                    tmp: temp,
                    buffer: (1.5 * 1024 * 1024).toString(),
                    connections: 300
                });
                this.streams[engine.infoHash] = engine;
                engine['stream-port'] = port;
        
                return engine
            });


    },
    destroy(infoHash) {
        if (this.streams[infoHash]) {
            if (this.streams[infoHash].server._handle)
                this.streams[infoHash].server.close();
            this.streams[infoHash].destroy();
        }
    },
    read(torrent) {
        return new Promise((resolve, reject) => readTorrent(torrent, (err, parsedTorrent) => (err || !parsedTorrent) ? reject(err) : resolve(parsedTorrent)))
    }
};