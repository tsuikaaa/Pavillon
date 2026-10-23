import { LinkSchema } from '#database/schema'
import { belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Page from '#models/page'

export default class Link extends LinkSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @manyToMany(() => Page, { pivotTable: 'link_pages' })
  declare pages: ManyToMany<typeof Page>

  /** Titres des pages du lien, pour l'affichage (nécessite preload('pages')) */
  get pageTitles() {
    const titles = (this.pages ?? []).map((p) => p.title)
    return titles.length ? titles.join(', ') : 'aucune'
  }
}