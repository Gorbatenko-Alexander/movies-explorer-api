const urlRegExp = /^https?:\/\/[\-a-z0-9\.]+\.[a-z]+(\/[\-a-z0-9\+\&\@\#\/\%\?\=\~\_\|\!\:\,\.\;]*)?/i;
const emailRegExp = /[\w\.\-]+@[\w\.\-]+\.[\w]+$/;

module.exports = { urlRegExp, emailRegExp };
