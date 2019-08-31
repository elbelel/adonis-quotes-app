'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.get('/','QouteController.index').as('index')

Route.get('/register','RegisterController.create').as('register.create')
Route.post('/register-store','RegisterController.store').as('register.store').validator('Register')
Route.get('/login','LoginController.create').as('login.create')
Route.post('/login-store','LoginController.store').as('login.store')
Route.get('/view-qoute/:id','QouteController.show').as('view.qoute')


Route.group(() => {
Route.get('/create-qoute','QouteController.create').as('create.qoute')
Route.post('/store-qoute','QouteController.store').as('store.qoute')
Route.get('/edit-qoute/:id','QouteController.edit').as('edit.qoute')
Route.post('/update-qoute/:id','QouteController.update').as('update.qoute')
Route.get('/delete-qoute/:id','QouteController.destroy').as('delete.qoute')
Route.post('/logout','LoginController.destroy').as('logout')
}).middleware(['auth'])



