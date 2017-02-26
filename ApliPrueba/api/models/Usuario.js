/**
 * Usuario.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        nombres: {
            type: 'string',
            minLength: 5,
            required: true
        },
        preferencia: {
            type: 'string',
            minLength: 5,
            required: true
        },
        fechaNacimiento: {
            type: 'date',
        },
        agarres: {
            collection: 'Agarre',
            via: 'idUsuario'
        }

    }
};