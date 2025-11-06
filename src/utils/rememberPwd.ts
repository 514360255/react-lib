/*
 * @Author: 郭郭
 * @Date: 2025/11/05
 * @Description:
 */
import cryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import isObject from 'lodash/isObject';

// 记住密码
class RememberPwd {
  private desIv =
    'msvQw2d#9n@R(lcXmMOxs8%i^@3Dd5QDe_lu!U4Hx(wLVHD6Gc8n(v+%t^zzxM';
  private desKey = 'w4D7U_wy)Q%GqoV2';

  constructor(props: any = {}) {
    const { iv, key } = props || {};
    if (iv) {
      this.desIv = iv;
    }
    if (key) {
      this.desKey = key;
    }
  }

  /**
   * 加密方法
   * @returns {string}
   */
  desEncrypt(data: any) {
    const key = cryptoJS.enc.Utf8.parse(this.desKey),
      iv = cryptoJS.enc.Utf8.parse(this.desIv),
      srcs = cryptoJS.enc.Utf8.parse(data),
      encrypted = cryptoJS.DES.encrypt(srcs, key, {
        iv: iv,
        mode: cryptoJS.mode.CBC, //明文长度不是分组长度（8 字节）的整数倍时，需要补齐。补充模式为Pkcs7
        padding: cryptoJS.pad.Pkcs7,
      });
    return encrypted.toString();
  }

  /**
   * 解密方法
   * @returns {string}
   */
  desDecrypt(data: any) {
    const key = cryptoJS.enc.Utf8.parse(this.desKey),
      iv = cryptoJS.enc.Utf8.parse(this.desIv),
      decrypted = cryptoJS.DES.decrypt(data, key, {
        iv: iv,
        mode: cryptoJS.mode.CBC, //明文长度不是分组长度（8 字节）的整数倍时，需要补齐。补充模式为Pkcs7
        padding: cryptoJS.pad.Pkcs7,
      });
    return decrypted.toString(cryptoJS.enc.Utf8);
  }

  /**
   * 设置cookie
   * @param name
   * @param value
   * @param seconds
   */
  setCookie(name: string, value: any, seconds: number = 1000) {
    if (!name || !value || !isObject(value)) return;
    let expires = new Date(Date.now() + seconds * 24 * 60 * 60 * 1000);
    Cookies.set(name, this.desEncrypt(JSON.stringify(value)), { expires });
  }

  /**
   * 获取cookie
   * @param name
   * @returns {string}
   */
  getCookie(name: string) {
    const data = Cookies.get(name);
    if (!data) {
      return;
    }
    return JSON.parse(this.desDecrypt(data));
  }

  /**
   * 移除cookie
   * @param name
   */
  removeCookie(name: string) {
    Cookies.remove(name);
  }
}

export default RememberPwd;
