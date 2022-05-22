import { promises as fs } from 'fs'

const fsCache = new Map()

const readFileWithInMemoryCache: typeof fs.readFile = async (path, options) => {
  const cacheKey = JSON.stringify([path, options])
  if (fsCache.has(cacheKey)) {
    return fsCache.get(cacheKey)
  }

  const fileContent = await fs.readFile(path, options)

  fsCache.set(cacheKey, fileContent)
  return fileContent
}

export const readFile = process.env.NODE_ENV === 'development' ? fs.readFile : readFileWithInMemoryCache
