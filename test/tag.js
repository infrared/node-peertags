
var PeerTags = require('../lib/node-peertags.js');


var pt = new PeerTags({
    id: process.env.APP_API_ID,
    key: process.env.APP_API_KEY,
    secret: process.env.APP_API_SECRET,
    url: process.env.APP_API_URL,
    timeout: process.env.APP_API_TIMEOUT
});
exports.Tags = {
    "search a" : function(test) {
        pt.tagSearch("a",function(err,res) {
            test.equal(res.statusCode,200,res.statusCode);
            test.ok(err === null,"err is not null");
            test.done();
        });
    },
    "create tag": function(test) {
        pt.tagCreate("fzzzarfeafefafef feafeaftlol face",1,function(err,res) {
            test.ok(err === null,"err");
            test.equal(res.success,true,"success is false");
            test.equal(res.statusCode,200,res.statusCode);
            test.done();
        });
    }
};
