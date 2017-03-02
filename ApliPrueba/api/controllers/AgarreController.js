/**
 * AgarreController
 *
 * @description :: Server-side logic for managing Agarres
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    crearAgarre: function (req, res) {
    var parametros = req.allParams();

    if (req.method == 'POST') {
      if (parametros.nombre && parametros.veces && parametros.dineroGastado && parametros.idUsuario) {
        Agarre.create({
          nombre: parametros.nombre,
          veces: parametros.veces,
          dineroGastado: parametros.dineroGastado,
          idUsuario: parametros.idUsuario,
        }).exec(function (error, AgarreCreado) {
          if (error) return res.view('error', {
            title: 'Error',
            error: {
              descripcion: 'Hubo Problemas creando el agarre, intentalo de nuevo: ' + error,
              url: '/crearAgarre'
            }
          });

          Agarre.find().exec(function (error, AgarresEncontrados) {
            if (error) return res.serverError()
            sails.log.info(AgarresEncontrados);
            return res.view('vistas/Agarre/listarAgarre', {
              title: 'Lista de Agarres',
              agarres: AgarresEncontrados
            })
          });

        });
      } else {
        // bad Request
        return res.view('error', {
          title: 'Error',
          error: {
            descripcion: 'No envia todos los parametros',
            url: '/crearAgarre'
          }
        });
      }
    } else {
      return res.view('error', {
        title: 'Error',
        error: {
          descripcion: 'Falla en el metodo HTTP',
          url: '/crearAgarre'
        }
      });
    }

  },
    editarAgarre: function (req, res) {
         var parametros = req.allParams();
    if (req.method == 'POST') {
       if (parametros.nombre && parametros.veces && parametros.dineroGastado && parametros.idUsuario) {
        //creo el usuario
        console.log('Va a actualizar el agarre.')
        Agarre.update({
            id: parametros.id
        }, {
         nombre: parametros.nombre,
          veces: parametros.veces,
          dineroGastado: parametros.dineroGastado,
          idUsuario: parametros.idUsuario,
        }).exec(function (error, AgarreCreado) {
          if (error) return res.view('error', {
            title: 'Error',
            error: {
              descripcion: 'Hubo Problemas actualizando el agarre, intentalo de nuevo: ' + error,
              url: '/crearAgarre'
            }
          });
         sails.log.info('Se actualizo el agarre: ', AgarreCreado);

          Agarre.find().exec(function (error, AgarresEncontrados) {
            if (error) return res.serverError()
            sails.log.info(AgarresEncontrados);
            return res.view('vistas/Agarre/listarAgarre', {
              title: 'Lista de Agarres',
              agarres: AgarresEncontrados
            })
          });

        });
      } else {
        // bad Request
        return res.view('error', {
          title: 'Error',
          error: {
            descripcion: 'No envia todos los parametros',
            url: '/editarAgarre'
          }
        });
      }
    } else {
      return res.view('error', {
        title: 'Error',
        error: {
          descripcion: 'Falla en el metodo HTTP',
          url: '/editarAgarre'
        }
      });
    }
    }
     
	
};

