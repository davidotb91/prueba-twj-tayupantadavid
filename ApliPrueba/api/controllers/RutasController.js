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

    //ruta para editar usuario
    editarUsuario: function (req, res) {

        var parametros = req.allParams();
        console.log(parametros);
        if (parametros.id) {

            Usuario.findOne({
                id: parametros.id
            }).exec(function (error, usuarioEncontrado) {
                if (error) return res.serverError()
                return res.view('vistas/Usuario/editarUsuario', {
                    title: 'Editar usuario - ' + usuarioEncontrado.apellidos,
                    usuario: usuarioEncontrado
                })
            });

        } else {
            return res.view('error', {
                title: 'Error',
                error: {
                    descripcion: 'No existe el ID'
                }
            });
        }
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
    },
    crearAgarre: function (req, res) {
        Usuario.find().exec(function (error, usuariosEncontrados) {
            if (error) return res.serverError();
            return res.view('vistas/Agarre/crearAgarre', {
                title: 'Crear Agarre',
                usuarios: usuariosEncontrados
            });
        });

    },
    listarAgarre: function (req, res) {

        Agarre.find().exec(function (error, agarresEncontrados) {
            if (error) return res.serverError()
            sails.log.info(agarresEncontrados);
            return res.view('vistas/Agarre/listarAgarre', {
                title: 'Lista de Agarres',
                agarres: agarresEncontrados
            })
        });
    },

    editarAgarre: function (req, res) {

        var parametros = req.allParams();
        console.log(parametros);
        if (parametros.id) {

            Agarre.findOne({
                id: parametros.id
            }).exec(function (error, agarreEncontrado) {
                if (error) return res.view('error', {
                    title: 'Error',
                    error: {
                        descripcion: 'Fallo al buscar el agarre',
                        url: '/crearAgarre'
                    }
                });


                Usuario.find().exec(function (error, usuariosEncontrados) {
                    if (error) return res.view('error', {
                        title: 'Error',
                        error: {
                            descripcion: 'Fallo al buscar el agarre',
                            url: '/crearAgarre'
                        }
                    });

                    return res.view('vistas/Agarre/editarAgarre', {
                        title: 'Editar Agarre - ' + agarreEncontrado.nombre,
                        agarre: agarreEncontrado,
                        usuarios: usuariosEncontrados
                    })
                });

            });

        } else {
            return res.view('error', {
                title: 'Error',
                error: {
                    descripcion: 'No existe el ID'
                }
            });
        }
    },
};