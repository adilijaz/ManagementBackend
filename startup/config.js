const config = require('config')

module.exports = function(){
    // related to token
    if(!config.get('jwtPrivateKey')){
        console.log('FATAL ERROR: jwtPrivateKey is not defined.');
    }
}