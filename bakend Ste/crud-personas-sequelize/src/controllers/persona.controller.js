const service = require('../services/persona.service');

exports.getAll = async (req, res) => {
    try {
        const personas = await service.getAll();

        res.json(personas);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener las personas',
            error: error.message
        });
    }
};

exports.getById = async (req, res) => {
    try {
        const persona = await service.getById(req.params.id);

        if (!persona) {
            return res.status(404).json({
                mensaje: 'Persona no encontrada'
            });
        }

        res.json(persona);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener la persona',
            error: error.message
        });
    }
};

exports.create = async (req, res) => {
    try {
        const persona = await service.create(req.body);

        res.status(201).json(persona);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al crear la persona',
            error: error.message
        });
    }
};

exports.update = async (req, res) => {
    try {
        const persona = await service.update(
            req.params.id,
            req.body
        );

        if (!persona) {
            return res.status(404).json({
                mensaje: 'Persona no encontrada'
            });
        }

        res.json(persona);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar la persona',
            error: error.message
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const resultado = await service.delete(req.params.id);

        if (!resultado) {
            return res.status(404).json({
                mensaje: 'Persona no encontrada'
            });
        }

        res.json({
            mensaje: 'Persona eliminada correctamente'
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar la persona',
            error: error.message
        });
    }
};