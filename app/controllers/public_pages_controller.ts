import type { HttpContext } from '@adonisjs/core/http'
import Page from '#models/page'

export default class PublicPagesController {
  async show({ params, view, response }: HttpContext) {
    const page = await Page.findBy('slug', params.slug)

    if (!page) {
      response.status(404)
      return view.render('pages/public/not_found')
    }

    const links = await page
      .related('links')
      .query()
      .where('is_public', true)
      .orderByRaw('label COLLATE NOCASE ASC')
    return view.render('pages/public/show', { page, links })
  }
}