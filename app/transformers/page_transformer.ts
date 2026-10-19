import { BaseTransformer } from '@adonisjs/core/transformers'
import Page from '#models/page'

export default class PageTransformer extends BaseTransformer<Page> {
  toObject() {
    return this.pick(this.resource, ['id'])
  }
}