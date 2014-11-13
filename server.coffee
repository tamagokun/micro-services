graft = require('graft')()
spdy = require 'graft/spdy'
ws = require 'graft/ws'

ws
  .server port: 3000
  .pipe graft
  # .pipe adder() # calling it locally
  # .pipe spdy.client(port:3003) # calling it remotely
  .where(cmd: 'add', spdy.client(port: 3001))
  # pipe or where() to more services
