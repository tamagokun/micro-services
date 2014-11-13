'use strict'

var graft = require('graft')()
var ws    = require('graft/ws')
var ret   = graft.ReadChannel()

// Patch broken ws client in graft
var jschan= require('jschan')
ws.client.prototype._buildSession = function(opts) {
  var client = jschan.websocketClientSession(opts);
  client._inStream.on('open', this.emit.bind(this, 'ready', this));
  return client;
};

// connect to server
graft.pipe(ws.client({port: 3000}))

// send message
graft.write({
  cmd: 'add',
  a: 2,
  b: 20,
  returnChannel: ret
})

ret.on('data', function(msg) {
  alert(msg)
})
