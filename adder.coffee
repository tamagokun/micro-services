through = require 'through2'

port = process.argv[2] || 3001

module.exports = ->
  through.obj (msg, enc, cb) ->
    res = msg.a + msg.b
    msg.returnChannel.end res
    cb()

# expose service
if require.main == module
  require 'graft/spdy'
    .server port: port
    .on 'ready', ->
      console.log "Added listening on port", port
    .pipe module.exports()
