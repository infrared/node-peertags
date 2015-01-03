(function() {
   


var request         = require('request');
var crypto          = require('crypto');
   


var PeerTags = function() {

    var allowed = [ "timeout", "version","id","key","secret","url" ];
    var self = this;
    if (arguments.length) {
        for (var key in arguments[0]) {
            if (allowed.indexOf(key) === -1) {
                throw new Error("invalid argument " + key );
            } else {
                self[key] = arguments[0][key];
            }
        }
    }
    self.timeout = (typeof self.timeout === "undefined") ? 60000 : self.timeout;
    self.version = (typeof self.version === "undefined") ? 1 : self.version;
    self.url     = (typeof self.url     === "undefined") ? "https://www.peertags.com/ws" : self.url;
    /* Mandatory */
    if (typeof self.key === "undefined") {
        console.log("API key required");
        process.exit(0);
    } else if (typeof self.secret === "undefined") {
        console.log("API secret required");
        process.exit(0);
    } else if (typeof self.url === "undefined") {
        console.log("API url required");
        process.exit(0);
    } else if (typeof self.id === "undefined") {
        console.log("API auth id required");
        process.exit(0);
    }

};

PeerTags.prototype.post = function(path,data,callback) {
    if (typeof callback !== 'function') {
        throw new Error("Expecting a callback function");
    }
    var self = this;
    var epoch = Math.floor(parseInt((new Date).getTime())/ self.timeout) * self.timeout;
    var secret = self.secret + epoch.toString();
    var hash = crypto.createHmac('sha256', secret).update(self.key).digest('hex');
    if (data === undefined) {
        data = { };
    }
    data._signedKey = hash;
    data._id = self.id;
    request.post({ url: self.url + path, form: data, json:true, timeout: self.timeout }, function(error,response,body) {
        if (error) {
            callback(error,null);
        } else {
            body.statusCode = response.statusCode;
            callback(null,body);
        }
    });
}
PeerTags.prototype.test = function(callback) {
    if (typeof arguments[ arguments.length -1] !== 'function') {
        throw new Error("Expecting function as last argument");
    }
    var self = this;
    self.post('/test',{},function(err,res) {
        (err === null) ? callback(null,res) : callback(res,null); 
    });
}
PeerTags.prototype.auth = function(data,callback) {
    if (typeof arguments[ arguments.length -1] !== 'function') {
        throw new Error("Expecting function as last argument");
    }
    var self = this;
    data.userId = 0;
    self.post('/auth',data,function(err,res) {
        (err === null) ? callback(null,res) : callback(res,null); 
    });
}
PeerTags.prototype.tagSearch = function(tag,callback) {
    if (typeof arguments[ arguments.length -1] !== 'function') {
        throw new Error("Expecting function as last argument");
    }
    var self = this;
    self.post('/search-tag/' + tag,{},function(err,res) {
        (err === null) ? callback(null,res) : callback(res,null); 
    });
}
PeerTags.prototype.userCreate = function(data,callback) {
    if (typeof arguments[ arguments.length -1] !== 'function') {
        throw new Error("Expecting function as last argument");
    }
    var self = this;
    data.userId = 0;
    self.post('/create-user',data,function(err,res) {
        (err === null) ? callback(null,res) : callback(res,null);
    });
}
PeerTags.prototype.tagCreate = function(tag,userId,callback) {
    if (typeof arguments[ arguments.length -1] !== 'function') {
        throw new Error("Expecting function as last argument");
    }
    if (arguments.length === 3) {
        var data = {
            tag: arguments[0],
            userId: arguments[1]
        };
    } else {
        var data = {
            tag: arguments[0]
        };
    }
    var self = this;
    self.post('/create-tag',data,function(err,res) {
        (err === null) ? callback(null,res) : callback(res,null); 
    });
}
    
module.exports = PeerTags; 

})();
