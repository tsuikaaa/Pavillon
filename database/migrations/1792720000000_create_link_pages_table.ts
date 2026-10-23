import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'link_pages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('link_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('links')
        .onDelete('CASCADE')
      table
        .integer('page_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('pages')
        .onDelete('CASCADE')
      table.unique(['link_id', 'page_id'])
    })

    // Les liens déjà rattachés à une page gardent leur page
    this.defer(async (db) => {
      await db.rawQuery(
        'INSERT INTO link_pages (link_id, page_id) SELECT id, page_id FROM links WHERE page_id IS NOT NULL'
      )
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}