import { BaseTransformer } from '@adonisjs/core/transformers'
import Link from '#models/link'

export default class LinkTransformer extends BaseTransformer<Link> {
  toObject() {
    return this.pick(this.resource, ['id'])
  }
}