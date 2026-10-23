import type { HttpContext } from '@adonisjs/core/http'
import type User from '#models/user'
import { linkValidator } from '#validators/link'

/**
 * Garde uniquement les pages qui appartiennent bien à l'utilisateur.
 */
async function ownedPageIds(user: User, ids?: number[]) {
  if (!ids || ids.length === 0) return []
  const pages = await user.related('pages').query().whereIn('id', ids)
  return pages.map((p) => p.id)
}

export default class LinksController {
  async index({ auth, request, view }: HttpContext) {
    const sort = request.input('tri', 'az')
    const query = auth.user!.related('links').query().preload('pages')

    if (sort === 'za') {
      query.orderByRaw('label COLLATE NOCASE DESC')
    } else if (sort === 'recent') {
      query.orderBy('id', 'desc')
    } else {
      query.orderByRaw('label COLLATE NOCASE ASC')
    }

    const links = await query
    return view.render('pages/links/index', { links, sort })
  }

  async create({ auth, request, view }: HttpContext) {
    const pages = await auth.user!.related('pages').query().orderBy('title')

    // /links/create?page=3 coche directement la page 3
    const preselected = Number(request.input('page'))
    const selectedPageIds = Number.isInteger(preselected) && preselected > 0 ? [preselected] : []

    return view.render('pages/links/form', { link: null, pages, selectedPageIds })
  }

  async store({ auth, request, response }: HttpContext) {
    const data = await request.validateUsing(linkValidator)
    const pageIds = await ownedPageIds(auth.user!, data.pageIds)

    const link = await auth.user!.related('links').create({
      label: data.label,
      url: data.url,
      isPublic: data.isPublic ?? false,
    })
    await link.related('pages').sync(pageIds)

    if (request.input('retour') === 'pages') {
      return response.redirect().toRoute('pages.index')
    }
    return response.redirect().toRoute('links.index')
  }

  async edit({ auth, params, view }: HttpContext) {
    const link = await auth.user!
      .related('links')
      .query()
      .where('id', params.id)
      .preload('pages')
      .firstOrFail()
    const pages = await auth.user!.related('pages').query().orderBy('title')
    const selectedPageIds = link.pages.map((p) => p.id)
    return view.render('pages/links/form', { link, pages, selectedPageIds })
  }

  async update({ auth, params, request, response }: HttpContext) {
    const link = await auth.user!.related('links').query().where('id', params.id).firstOrFail()
    const data = await request.validateUsing(linkValidator)
    const pageIds = await ownedPageIds(auth.user!, data.pageIds)

    await link
      .merge({
        label: data.label,
        url: data.url,
        isPublic: data.isPublic ?? false,
      })
      .save()
    await link.related('pages').sync(pageIds)

    return response.redirect().toRoute('links.index')
  }

  async destroy({ auth, params, response }: HttpContext) {
    const link = await auth.user!.related('links').query().where('id', params.id).firstOrFail()
    await link.related('pages').detach()
    await link.delete()
    return response.redirect().toRoute('links.index')
  }
}