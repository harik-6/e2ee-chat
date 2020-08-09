import crypt from 'crypto-js';
class Crypto {
  constructor(key){
    this.key = key;
  }

  encrypt = pt => {
    const ct = crypt.AES.encrypt(pt, this.key).toString();
    return ct;
  }

  decrypt = ct => {
    const bytes  = crypt.AES.decrypt(ct, this.key);
    const pt = bytes.toString(crypt.enc.Utf8);
    return pt;
  }

}

export default Crypto;