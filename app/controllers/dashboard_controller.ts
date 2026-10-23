import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async show({ auth, view }: HttpContext) {
    const user = auth.user!

    const pages = await user.related('pages').query().withCount('links').orderBy('id', 'desc')
    const links = await user.related('links').query().preload('page').orderBy('id', 'desc')

    return view.render('pages/dashboard', {
      user,
      pages,
      pagesCount: pages.length,
      linksCount: links.length,
      recentLinks: links.slice(0, 5),
    })
  }
}