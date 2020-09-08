const conn = require('../model/conexao');

module.exports = {
    
    async criar(request,response){
        const dados = request.body;
        
        // validações de dados recebidos
        if ((dados.titulo === '')||(!dados.titulo)) {
            return response.status(400).json({mensagem:`título não recebido`})
        }else if((dados.descricao === '')||(!dados.descricao)) {
            return response.status(400).json({mensagem:`descrição não recebido`})
        } else if ((dados.solicitante === '')||(!dados.solicitante)) {
            return response.status(400).json({mensagem:`solicitante não recebido`})
        }
        
        // validação de usuario
        try {
            const [resposta] = await conn('usuarios').select('ra').where('ra',dados.solicitante)
            if (resposta.ra !== dados.solicitante) {
                return response.status(400).json({mensagem:`usuário incorreto`})
            }
        } catch (error) {
            return response.status(400).json({mensagem:`usuario nao encontrado ${error}`})
        }
        
        await console.log(dados) //incluir query de cadastro no banco
        try {
            const resposta = await conn('incidentes').insert(dados)
            return response.status(201).json({
                mensagem:`incidente cadastrado com sucesso!`,
                id:`${resposta}`
            })
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
    },
    
    async deletar(request,response){
        const dados = request.params;
        const usuario = request.headers.usuario;
        
        // validações dos dados
        if ((dados.id === '')||(!dados.id)) {
            return response.status(400).json({mensagem:`ID do incidente não recebido`})
        }else if ((usuario === '')||(!usuario)) {
            return response.status(400).json({mensagem:`Usuário não recebido`})
        }

        try {
            const [resposta] = await conn('incidentes').select('solicitante').where('solicitante',usuario)
            if (resposta.solicitante !== usuario) {
                return response.status(400).json({mensagem:`usuário incorreto`})
            }
        } catch (error) {
            
        }
        
        
        try {
            await conn('incidentes').delete('*').where('id',dados.id)
            return response.status(200).json({mensagem:`incidente excluído com sucesso!`})
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
    },
    
    async listar(request,response){
        const dados = request.headers;
        
        // validações
        if ((dados.usuario === '')||(!dados.usuario)) {
            return response.status(400).json({mensagem:`ID do usuário não recebido`})
        }
        
        try {
            const resposta = await conn('incidentes').select('*').where('solicitante',dados.usuario)
            return response.status(200).json(resposta)
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
        
    }
    
}