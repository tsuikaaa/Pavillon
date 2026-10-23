import type { HttpContext } from '@adonisjs/core/http'
import { linkValidator } from '#validators/link'

export default class LinksController {
  async index({ auth, request, view }: HttpContext) {
    const sort = request.input('tri', 'az')
    const query = auth.user!.related('links').query().preload('page')

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

  async create({ auth, view }: HttpContext) {
    const pages = await auth.user!.related('pages').query().orderBy('title')
    return view.render('pages/links/form', { link: null, pages })
  }

  async store({ auth, request, response }: HttpContext) {
    const data = await request.validateUsing(linkValidator)

    // Vérifie que la page choisie appartient bien à l'utilisateur
    if (data.pageId) {
      await auth.user!.related('pages').query().where('id', data.pageId).firstOrFail()
    }

    await auth.user!.related('links').create({
      label: data.label,
      url: data.url,
      pageId: data.pageId,
      isPublic: data.isPublic ?? false,
    })
    return response.redirect().toRoute('links.index')
  }

  async edit({ auth, params, view }: HttpContext) {
    const link = await auth.user!.related('links').query().where('id', params.id).firstOrFail()
    const pages = await auth.user!.related('pages').query().orderBy('title')
    return view.render('pages/links/form', { link, pages })
  }

  async update({ auth, params, request, response }: HttpContext) {
    const link = await auth.user!.related('links').query().where('id', params.id).firstOrFail()
    const data = await request.validateUsing(linkValidator)

    if (data.pageId) {
      await auth.user!.related('pages').query().where('id', data.pageId).firstOrFail()
    }

    await link
      .merge({
        label: data.label,
        url: data.url,
        pageId: data.pageId,
        isPublic: data.isPublic ?? false,
      })
      .save()
    return response.redirect().toRoute('links.index')
  }

  async destroy({ auth, params, response }: HttpContext) {
    const link = await auth.user!.related('links').query().where('id', params.id).firstOrFail()
    await link.delete()
    return response.redirect().toRoute('links.index')
  }
}