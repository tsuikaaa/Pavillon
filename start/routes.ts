/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home').as('home')

// Page publique : accessible sans être connecté
router.get('p/:slug', [controllers.PublicPages, 'show']).as('public.show')

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.get('/dashboard', [controllers.Dashboard, 'show']).as('dashboard')
    router.post('logout', [controllers.Session, 'destroy'])

    router.get('pages', [controllers.Pages, 'index']).as('pages.index')
    router.get('pages/create', [controllers.Pages, 'create']).as('pages.create')
    router.post('pages', [controllers.Pages, 'store']).as('pages.store')
    router.get('pages/:id/edit', [controllers.Pages, 'edit']).as('pages.edit')
    router.post('pages/:id', [controllers.Pages, 'update']).as('pages.update')
    router.post('pages/:id/delete', [controllers.Pages, 'destroy']).as('pages.destroy')

    router.get('links', [controllers.Links, 'index']).as('links.index')
    router.get('links/create', [controllers.Links, 'create']).as('links.create')
    router.post('links', [controllers.Links, 'store']).as('links.store')
    router.get('links/:id/edit', [controllers.Links, 'edit']).as('links.edit')
    router.post('links/:id', [controllers.Links, 'update']).as('links.update')
    router.post('links/:id/delete', [controllers.Links, 'destroy']).as('links.destroy')
  })
  .use(middleware.auth())