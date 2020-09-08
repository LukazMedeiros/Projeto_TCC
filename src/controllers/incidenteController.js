
module.exports = {
    
    async criar(request,response){
        const dados = request.body;
        const solicitante = request.headers;

        // validações
        if ((dados.titulo === '')||(!dados.titulo)) {
            return response.status(400).json({mensagem:`título não recebido`})
        }else if((dados.descricao === '')||(!dados.descricao)) {
            return response.status(400).json({mensagem:`descrição não recebido`})
        } else if ((solicitante.usuario === '')||(!solicitante.usuario)) {
            return response.status(400).json({mensagem:`ID usuário não recebido`})
        }
        
        await console.log(dados) //incluir query de cadastro no banco
        try {
            return response.status(201).json({
                mensagem:`incidente cadastrado com sucesso!`,
                id:`id do incidente`
            })
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
    },
    
    async deletar(request,response){
        const dados = request.params;
        const solicitante = request.headers;
        
        // validações
        if ((dados.id === '')||(!dados.id)) {
            return response.status(400).json({mensagem:`ID do incidente não recebido`})
        }else if((solicitante.usuario === '')||(!solicitante.usuario)) {
            return response.status(400).json({mensagem:`Usuário não recebido`})
        }
        
        await console.log(dados) //incluir query de conexão com o banco
        try {
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
        
        const resposta = await console.log(dados) //incluir query de conexão com o banco
        try {
            return response.status(200).json(dados.usuario)
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
        
    }
    
}