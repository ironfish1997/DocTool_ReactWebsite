export default class indexedDBUtilBuilder {
  databaseName;
  version;

  constructor(databaseName, version) {
    this.databaseName = databaseName;
    this.version = version;
  }

  /**
   * 事务三种模式：
   * readOnly，只读。
   * readwrite，读写。
   * versionchange，数据库版本变化。
   */

  findOne = (objectStoreName, id_number) => {
    return new Promise((resolve, reject) => {
      //判断传入的参数是否齐全
      if (!this.db || !objectStoreName || !id_number) {
        return reject(null);
      }
      let request = this.version
        ? window.indexedDB.open(this.databaseName, this.version)
        : window.indexedDB.open(this.databaseName);
      request.onsuccess = event => {
        let db = event.target.result;
        var transaction = db.transaction([objectStoreName], "readwrite");
        var objectStore = transaction.objectStore(objectStoreName);
        var index = objectStore.index("id_number");
        var request_get = index.get(id_number);
        request_get.onsuccess(event => {
          return resolve(request_get.result);
        });
        request_get.onerror(event => {
          return reject(null);
        });
      };
      request.onerror = event => {
        return reject(null);
      };
    });
  };

  findAll = objectStoreName => {
    return new Promise((resolve, reject) => {
      if (!objectStoreName) {
        return reject(null);
      }
      let request = this.version
        ? window.indexedDB.open(this.databaseName, this.version)
        : window.indexedDB.open(this.databaseName);
      request.onsuccess = event => {
        // let db = event.target.result;
        // var transaction = db.transaction([objectStoreName], "readwrite");
        // var objectStore = transaction.objectStore(objectStoreName);
        // var index = objectStore.index("id_number");
        // var request_get = index.get(id_number);
        // request_get.onsuccess(event => {
        //   return resolve(request_get.result);
        // });
        // request_get.onerror(event => {
        //   return reject(null);
        // });
      };
      request.onerror = event => {
        return reject(null);
      };
    });
  };
}
