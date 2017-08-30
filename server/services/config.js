let getConfig = () => {
    try { 
        return require('../../config.mine.json');
    }
    catch(e) { 
        return require('../../config.json');
    }
} 

module.exports =  getConfig();