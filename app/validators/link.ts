import vine from '@vinejs/vine'

const label = () => vine.string().trim().minLength(1).maxLength(100)

/**
 * Seuls http et https sont acceptés, ce qui bloque les liens "javascript:".
 */
const url = () =>
  vine
    .string()
    .trim()
    .maxLength(2000)
    .url({ require_protocol: true, protocols: ['http', 'https'] })

export const linkValidator = vine.create({
  label: label(),
  url: url(),
  pageIds: vine.array(vine.number()).optional(),
  isPublic: vine.boolean().optional(),
})