
var PeerTags = require('../lib/node-peertags.js');


var pt = new PeerTags({
    id: process.env.APP_API_ID,
    key: process.env.APP_API_KEY,
    secret: process.env.APP_API_SECRET,
    url: process.env.APP_API_URL,
    timeout: process.env.APP_API_TIMEOUT
});
exports.api = {

    "simple test" : function(test) {
        pt.test(function(err,res) {
            test.ok(err === null,"err is nul")
            test.done();
        });
    },
};
