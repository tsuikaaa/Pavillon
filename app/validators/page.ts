import vine from '@vinejs/vine'

const title = () => vine.string().trim().minLength(2).maxLength(100)
const description = () => vine.string().trim().maxLength(500).nullable()
const slugRule = () =>
  vine
    .string()
    .trim()
    .toLowerCase()
    .minLength(3)
    .maxLength(50)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)

/**
 * Création : le slug ne doit exister nulle part.
 */
export const createPageValidator = vine.create({
  title: title(),
  slug: slugRule().unique({ table: 'pages', column: 'slug' }),
  description: description(),
})

/**
 * Modification : le slug doit être unique, sauf pour la page en cours.
 * L'id de la page est passé en "meta" depuis le contrôleur.
 */
export const updatePageValidator = vine.withMetaData<{ pageId: number }>().create({
  title: title(),
  slug: slugRule().unique(async (db, value, field) => {
    const row = await db
      .from('pages')
      .where('slug', value)
      .whereNot('id', field.meta.pageId)
      .first()
    return !row
  }),
  description: description(),
})