# node-peertags

node.js library for peertags.com
### Installation

```sh
$ npm install git://github.com/infrared/node-peertags.git
```
### Usage
```javascript
 var PeerTags = require('peertags');
 var pt = new peertags({
    id: <your API id>,
    key: <your API key>,
    secret: <your API secret>
});
```

### Tags

##### tagCreate(tag,callback) 
```javascript
pt.tagCreate("kittens",function(err,result) {
    ...
});
```
##### tagSearch(tag,callback)
```javascript
pt.tagSearch(tag,function(err,result) {
  ...
});
```
License
----

MIT
