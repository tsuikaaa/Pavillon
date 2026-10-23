import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'links'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('position').notNullable().defaultTo(0)
    })

    // Les liens existants gardent leur ordre actuel (position = id)
    this.defer(async (db) => {
      await db.rawQuery('UPDATE links SET position = id')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('position')
    })
  }
}