const MemoryCache = require('react-native-clcasher/MemoryCache').default;

const SynchronousPersistedCache = {};

console.log('Load all cached values');
let syncCache = {};

MemoryCache.getAllKeys()
  .then(all => MemoryCache.multiGet(all))
  .then(res => syncCache = res);

SynchronousPersistedCache.get = function getSync(key) {
  const val = syncCache[key];
  return Promise.resolve(val);
};

SynchronousPersistedCache.remove = function removeSync(key) {
  delete syncCache[key];
  return MemoryCache.remove(key);
};
SynchronousPersistedCache.flush = function flushSync() {
  syncCache = {};
  return MemoryCache.flush();
};
SynchronousPersistedCache.set = function setSync(key, value, expires) {
  syncCache[key] = value;
  return MemoryCache.set(key, value, expires);
};

export default SynchronousPersistedCache;

