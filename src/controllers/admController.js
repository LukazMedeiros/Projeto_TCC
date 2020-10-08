const conn = require('../model/conexao');

module.exports = {
    
    async listarAdm(request,response){
        
        try {
            const resposta = await conn('incidentes').select('*')
            return response.status(200).json(resposta)
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
        
    },
    
    async listarStatus(request,response){
        const status= request.params.status;
        
        // validações
        if ((status === '')||(!status)) {
            return response.status(400).json({mensagem:`ID do status não recebido`})
        }
        
        try {
            const resposta = await conn('incidentes').select('*').where("status",status)
            return response.status(200).json(resposta)
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
        
    },
}