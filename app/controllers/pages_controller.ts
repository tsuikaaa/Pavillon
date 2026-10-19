import type { HttpContext } from '@adonisjs/core/http'
import { createPageValidator, updatePageValidator } from '#validators/page'

export default class PagesController {
  async index({ auth, view }: HttpContext) {
    const pages = await auth.user!.related('pages').query().withCount('links').orderBy('id', 'desc')
    return view.render('pages/my_pages/index', { pages })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/my_pages/form', { page: null })
  }

  async store({ auth, request, response }: HttpContext) {
    const data = await request.validateUsing(createPageValidator)
    await auth.user!.related('pages').create(data)
    return response.redirect().toRoute('pages.index')
  }

  async edit({ auth, params, view }: HttpContext) {
    const page = await auth.user!.related('pages').query().where('id', params.id).firstOrFail()
    return view.render('pages/my_pages/form', { page })
  }

  async update({ auth, params, request, response }: HttpContext) {
    const page = await auth.user!.related('pages').query().where('id', params.id).firstOrFail()
    const data = await request.validateUsing(updatePageValidator, { meta: { pageId: page.id } })
    await page.merge(data).save()
    return response.redirect().toRoute('pages.index')
  }

  async destroy({ auth, params, response }: HttpContext) {
    const page = await auth.user!.related('pages').query().where('id', params.id).firstOrFail()
    await page.delete()
    return response.redirect().toRoute('pages.index')
  }
}