const config = require('config');

module.exports = function(){
    if (!config.get('jwtPrivateKey')) {
       throw new Error('FaTAL ERROR: jwtPrivateKey is not defined.');
    }

}