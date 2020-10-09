const conn = require('../model/conexao');

module.exports = {
    
    async criar(request,response){
        const hoje = new Date();
        const solicitante = request.headers.usuario;
        const {titulo, descricao} = request.body;
        const data_abertura = hoje.toGMTString();
        
        // validações de dados recebidos
        if ((titulo === '')||(!titulo)) {
            return response.status(400).json({mensagem:`título não recebido`})
        }else if((descricao === '')||(!descricao)) {
            return response.status(400).json({mensagem:`descrição não recebido`})
        } else if ((solicitante === '')||(!solicitante)) {
            return response.status(400).json({mensagem:`solicitante não recebido`})
        }
        
        // validação de usuario
        try {
            const [resposta] = await conn('usuarios').select('ra').where('ra',solicitante)
            if (resposta.ra !== solicitante) {
                return response.status(400).json({mensagem:`usuário incorreto`})
            }
        } catch (error) {
            return response.status(400).json({mensagem:`usuario nao encontrado ${error}`})
        }        
        
        try {
            const resposta = await conn('incidentes').insert({titulo, descricao, solicitante, "data_abertura":data_abertura, "resolucao":"", "status":"aberto" })
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
            return response.status(400).json({mensagem:`${error}`})
        }
        
        
        try {
            await conn('incidentes').delete('*').where('id',dados.id)
            return response.status(200).json({mensagem:`incidente excluído com sucesso!`})
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
    },
    
    async listar(request,response){
        const usuario= request.headers.usuario;
        
        // validações
        if ((usuario === '')||(!usuario)) {
            return response.status(400).json({mensagem:`ID do usuário não recebido`})
        }
        
        try {
            const resposta = await conn('incidentes').select('*').where('solicitante',usuario)
            return response.status(200).json(resposta)
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
        
    },
    
    async listarStatus(request,response){
        const status= request.params.status;
        const usuario= request.params.usuario;
        
        // validações
        if ((status === '')||(!status)) {
            return response.status(400).json({mensagem:`ID do status não recebido`})
        }
        
        try {
            const resposta = await conn('incidentes').select('*').where({'status':status, 'solicitante':usuario})
            return response.status(200).json(resposta)
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
        
    },
    
    async encerrar(request,response){
        const hoje = new Date();
        const {id, resolucao} = request.body;
        const data_encerramento = hoje.toGMTString();
        
        // validações
        if((resolucao === "")||(!resolucao)){
            return response.status(400).json({mensagem:`resolução não recebida`})
        }
        
        if((id === "")||(!id)){
            return response.status(400).json({mensagem:`ID não recebida`})
        }
        
        
        try {
            const [resposta] = await conn('incidentes').select('*').where('id',id)
            if (resposta === undefined) {
                return response.status(400).json({mensagem:`O incidente informado não existe`})
            }else if (resposta.status === "solucionado") {
                return response.status(400).json({mensagem:`O incidente informado já está solucionado`})
            }
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
        
        try {
            await conn('incidentes').update({'resolucao':resolucao, "data_encerramento":data_encerramento, "status":"solucionado"}).where('id',id)
            return response.status(200).json({mensagem:`incidente encerrado com sucesso!`})
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
    }
}