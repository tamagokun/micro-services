'use strict'

var graft = require('graft')()
var ws    = require('graft/ws')
var ret   = graft.ReadChannel()

// connect to server
graft.pipe(ws.client({port: 3000}))

// send message
graft.write({
  cmd: 'add',
  a: 2,
  b: 2,
  returnChannel: ret
})

ret.on('data', function(msg) {
  alert(msg)
})
