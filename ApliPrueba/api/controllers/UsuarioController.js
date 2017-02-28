/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing Usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    crearUsuarioForm: function (req, res) {

        var parametros = req.allParams();
        console.log(parametros);

        console.log('Metodo:', req.method);
        if (req.method == 'POST') {
            if (parametros.nombres && parametros.preferencia) {
                //creo el usuario
                console.log('Va a crear el usuario.')
                Usuario.create({
                    nombres: parametros.nombres,
                    preferencia: parametros.preferencia,
                   fechaNacimiento : parametros.fechaNacimiento
                }).exec(function (error, usuarioCreado) {
                    if (error) {
                        return res.view('error', {
                            title: 'Error',
                            error: {
                                descripcion: 'hubo un error enviando los parametros:',
                                error,
                                url: '/crearUsuario'
                            }
                        });
                    }
                    sails.log.info('Se creo el usuario: ', usuarioCreado);

                    Usuario.find().exec(function (error, usuariosEncontrados) {
                        if (error) return res.serverError()
                        sails.log.info(usuariosEncontrados);
                        return res.view('vistas/Usuario/listarUsuarios', {
                            title: 'Lista de Usuarios',
                            usuarios: usuariosEncontrados
                        })
                    });
                });

            } else {
                // bad Request
                console.log('NO PARAMETROS');
                return res.view('error', {
                    title: 'Error',
                    error: {
                        descripcion: 'No envia todos los parametros',
                        url: '/crearUsuario'
                    }
                });
            }
        } else {
            console.log('POST');
            return res.view('error', {
                title: 'Error',
                error: {
                    descripcion: 'Falla en el metodo HTTP',
                    url: '/crearUsuario'
                }
            });
        }

    },



};