
var PeerTags = require('../lib/node-peertags.js');


var pt = new PeerTags({
    id: process.env.APP_API_ID,
    key: process.env.APP_API_KEY,
    secret: process.env.APP_API_SECRET,
    url: process.env.APP_API_URL,
    timeout: process.env.APP_API_TIMEOUT
});
exports.user = {
    "auth fail" : function(test) {
        pt.auth({ username: "lol", password: "u"},function(err,res) {
            test.ok(err === null,"err is not null");
            test.equal(res.message,"Login Failed");
            test.done();
        });
    },
    "user auth" : function(test) {
        pt.auth({username: process.env.TEST_USERNAME, password: process.env.TEST_PASSWORD },function(err,res) {
            test.ok(err === null,"err is null");
            test.equal(res.success,true,res.message);
            test.equal(res.message.id,1,"user id is not 1");
            test.equal(res.message.username,process.env.TEST_USERNAME,"username does not match");
            test.done();
        });
    }
};
