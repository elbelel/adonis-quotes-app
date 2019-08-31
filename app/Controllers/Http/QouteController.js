'use strict'
const Qoute = use('App/Models/Qoute')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with qoutes
 */
class QouteController {
  /**
   * Show a list of all qoutes.
   * GET qoutes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const qoute = await Qoute.all()

    return view.render('index',{
      qoutes:qoute.toJSON(),
    })
  }

  /**
   * Render a form to be used for creating a new qoute.
   * GET qoutes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('dashboard.create_qoute')
  }

  /**
   * Create/save a new qoute.
   * POST qoutes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request,auth,session, response }) {
    const qoute = new Qoute()
    qoute.user_id = auth.user.id
    qoute.username = auth.user.username
    qoute.body = request.input('body')

    await qoute.save()
    session.flash({'successmessage':'Qoute has been created'})
    return response.redirect('/')

  }

  /**
   * Display a single qoute.
   * GET qoutes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params,view }) {

    const qoute = await Qoute.find(params.id)

    return view.render('dashboard.view_qoute',{
      qoute:qoute.toJSON()
    })
  }

  /**
   * Render a form to update an existing qoute.
   * GET qoutes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const qoute = await Qoute.find(params.id)
    return view.render('dashboard.edit_qoute',{
      qoute:qoute.toJSON()
    })
  }

  /**
   * Update qoute details.
   * PUT or PATCH qoutes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params,session, request, response }) {
    const qoute = await Qoute.find(params.id)
    qoute.body = request.input('body')

    await qoute.save()

    session.flash({'successmessage':'Qoute has been updated'})
    return response.redirect('/')
  }

  /**
   * Delete a qoute with id.
   * DELETE qoutes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params,session, request, response }) {
    const qoute = await Qoute.find(params.id)
    await qoute.delete()
    session.flash({'successmessage':'Qoute has been deleted'})
    return response.redirect('/')
  }
}

module.exports = QouteController
