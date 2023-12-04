const { encryptionanddecryption } = require("../Environment/environment");

function setName(id) {
    const date = new Date();
    return (
        encryptionanddecryption.CODE +
        "_" +
        date.getFullYear().toString() +
        "_" +
        (date.getMonth() + 1).toString() +
        "_" +
        date.getDate().toString() +
        "_" +
        id.toString()
    );
}
module.exports = {
    setName

}