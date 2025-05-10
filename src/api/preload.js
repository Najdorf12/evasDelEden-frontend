// src/api/preload.js
import { getEvasByProvince } from "./handlers";

let cache = {
  data: null,
  promise: null,
  timestamp: null
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos de cache

export const preloadData = async () => {
  if (cache.data && cache.timestamp && Date.now() - cache.timestamp < CACHE_DURATION) {
    return cache.data;
  }
  if (cache.promise) {
    return cache.promise;
  }

  try {
    cache.promise = getEvasByProvince("Mendoza")
      .then(data => {
        cache.data = data;
        cache.timestamp = Date.now();
        return data;
      })
      .finally(() => {
        cache.promise = null;
      });

    return await cache.promise;
  } catch (error) {
    cache.promise = null;
    throw error;
  }
};

export const getCachedData = () => {
  return cache.data && cache.timestamp && Date.now() - cache.timestamp < CACHE_DURATION 
    ? cache.data 
    : null;
};

export const clearCache = () => {
  cache = {
    data: null,
    promise: null,
    timestamp: null
  };
};