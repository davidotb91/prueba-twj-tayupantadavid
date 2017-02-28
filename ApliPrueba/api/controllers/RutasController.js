/**
 * RutasController
 *
 * @description :: Server-side logic for managing Rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
     home: function (req, res) {

    // res.view(String: Nombre vista, Datos JSON)
    return res.view('vistas/home', {
      titulo: 'Inicio',
      title: 'Inicio',
     
    })
  },
    //ruta para crear usuario
    crearUsuario: function (req, res) {
        return res.view('vistas/Usuario/crearUsuario', {
            title: 'Crear Usuarios'
        })
    },
    listarUsuarios: function (req, res) {

    Usuario.find().exec(function (error, usuariosEncontrados) {
      if (error) return res.serverError()
      sails.log.info(usuariosEncontrados);
      return res.view('vistas/Usuario/listarUsuarios', {
        title: 'Lista de Usuarios',
        usuarios: usuariosEncontrados
      })
    });
  }
};