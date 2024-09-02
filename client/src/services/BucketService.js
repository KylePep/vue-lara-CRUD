import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import { Bucket } from "@/models/Bucket.js"

class BucketService {
  async getBuckets() {
    const res = await api.get('api/buckets')
    const buckets = res.data.map(b => new Bucket(b))
    AppState.buckets = buckets
  }
  async getBucketById(bucketId) {
    const res = await api.get(`api/buckets/${bucketId}`)
    const bucket = new Bucket(res.data)
    AppState.activeBucket = bucket
  }

  async createBucket(bucketData) {
    const res = await api.post('api/buckets', bucketData)
    const bucket = new Bucket(res.data)
    AppState.buckets.push(bucket)
    return bucket
  }

  async editBucket(bucketData) {
    const res = await api.put(`api/buckets/${bucketData.id}`, bucketData)
    const newBucket = new Bucket(res.data)
    const indexToReplace = AppState.buckets.findIndex((i) => i.id == newBucket.id)
    AppState.buckets[indexToReplace] = newBucket;
    AppState.activeBucket = newBucket

  }

  async deleteItem(itemId) {
    await api.delete(`api/buckets/${itemId}`, itemId)
    AppState.buckets = AppState.buckets.filter(a => a.id != itemId)
  }
}

export const bucketService = new BucketService()