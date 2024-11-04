class BaseStorage {
  constructor(apiName, namespace = "") {
    this.apiName = apiName;
    this.namespace = namespace;
  }
  set = (key, value, expireTime = 0) => {
    window[this.apiName].setItem(this._getKeyName(key), JSON.stringify({
      value,
      updateTime: Date.now(),
      expireTime
    }));
  };
  all = () => {
    const storageData = window[this.apiName];
    const keys = Object.keys(storageData);
    return keys.reduce((values, key) => {
      if (this._hasKey(key)) {
        values[this._delNamespace(key)] = JSON.parse(storageData[key]);
      }
      return values;
    }, {});
  };
  allValues = () => {
    const all = this.all();
    const values = {};
    for (let key in all) {
      if (!Object.prototype.hasOwnProperty.call(all, key)) continue;
      const item = all[key];
      if (item !== null) {
        values[this._delNamespace(key)] = item.value;
      }
    }
    return values;
  };
  get = key => JSON.parse(window[this.apiName].getItem(this._getKeyName(key)));
  getValue = key => {
    const value = this.get(key);
    if (value === null) return null;
    return value.value;
  };
  has = key => this._getKeyName(key) in window[this.apiName];
  delete = key => {
    window[this.apiName].removeItem(this._getKeyName(key));
  };
  clear = () => {
    Object.keys(this.all()).forEach(key => {
      this.delete(key);
    });
  };
  expired = key => {
    const value = this.get(key);
    if (value === null) return false;
    return value.expireTime > 0 && Date.now() > value.expireTime;
  };
  clearExpired = () => {
    let count = 0;
    const all = this.all();
    for (let key in all) {
      if (!Object.prototype.hasOwnProperty.call(all, key)) continue;
      const item = all[key];
      if (item !== null && item.expireTime > 0 && Date.now() > item.expireTime) {
        count++;
        this.delete(key);
      }
    }
    return count;
  };
  _hasKey = key => {
    const regx = this.namespace ? `^${this.namespace}\\.` : `^${key}$`;
    return new RegExp(regx).test(key);
  };
  _getKeyName = key => {
    return this.namespace ? `${this.namespace}.${key}` : `${key}`;
  };
  _delNamespace = key => {
    const keyStr = `${key}`;
    return this.namespace ? keyStr.replace(new RegExp(`^${this.namespace}\\.`), "") : keyStr;
  };
}
class LocalStorage extends BaseStorage {
  constructor(namespace) {
    super("localStorage", namespace);
  }
}
class SessionStorage extends BaseStorage {
  constructor(namespace) {
    super("sessionStorage", namespace);
  }
}

export { LocalStorage, SessionStorage };
