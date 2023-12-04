const crypto = require('crypto');
const environment = require('../Environment/environment');

// Replace this with your secret key (32 bytes for AES-256)
const secretKey = environment.encryptionanddecryption.SECRETE_KEY;
const iv = environment.encryptionanddecryption.IV; // 12 bytes for AES-GCM
const skey = crypto.createHash('sha512').update(secretKey, 'utf-8').digest('hex').substring(0, 32);
const siv = crypto.createHash('sha512').update(iv, 'utf-8').digest('hex').substring(0, 16);

// Encryption
function encryption(data) {
    try {
        const cipher = crypto.createCipheriv('aes-256-cbc', skey, siv);
        let encrypted = cipher.update(data, 'utf-8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted
    } catch (error) {
        return false
    }

}


// Decryption
function decryption(data) {
    try {
        const decipher = crypto.createDecipheriv('aes-256-cbc', skey, siv);
        let decrypted = decipher.update(data, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        const splitstring = decrypted.split('_')
        if (splitstring && splitstring[0] === environment.encryptionanddecryption.CODE && splitstring[1] === environment.encryptionanddecryption.CON) {
            return true
        }

    } catch (error) {
        return false
    }

}

//get New key

function getNewKey(data) {
    return encryption(data)
}

module.exports = {
    encryption, decryption, getNewKey
}