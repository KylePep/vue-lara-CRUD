export class Item {
  constructor(data) {
    this.id = data.id
    this.description = data.description
    this.name = data.name
    this.price = data.price
    this.bucketItemId = data.bucketItemId ? data.bucketItemId : null
  }
}