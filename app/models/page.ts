import { PageSchema } from '#database/schema'
import { belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Link from '#models/link'

export default class Page extends PageSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @manyToMany(() => Link, { pivotTable: 'link_pages' })
  declare links: ManyToMany<typeof Link>
}