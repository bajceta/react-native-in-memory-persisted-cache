const MemoryCache = require('react-native-clcasher/MemoryCache').default;

const SyncronousPersistedCache = {};

console.log('Load all cached values');
let syncCache = {};

MemoryCache.getAllKeys()
  .then(all => MemoryCache.multiGet(all))
  .then(res => syncCache = res);

SyncronousPersistedCache.get = function getSync(key) {
  const val = syncCache[key];
  return Promise.resolve(val);
};

SyncronousPersistedCache.remove = function removeSync(key) {
  delete syncCache[key];
  return MemoryCache.remove(key);
};
SyncronousPersistedCache.flush = function flushSync() {
  syncCache = {};
  return MemoryCache.flush();
};
SyncronousPersistedCache.set = function setSync(key, value, expires) {
  syncCache[key] = value;
  return MemoryCache.set(key, value, expires);
};

export default SyncronousPersistedCache;

