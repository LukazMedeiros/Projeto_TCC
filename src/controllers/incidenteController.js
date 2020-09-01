
module.exports = {
    
    async criar(request,response){
        const dados = request.body;
        
        // validações
        if ((dados.titulo === '')||(!dados.titulo)) {
            return response.status(400).json({mensagem:`título não recebido`})
        }else if((dados.descricao === '')||(!dados.descricao)) {
            return response.status(400).json({mensagem:`descrição não recebido`})
        } else if ((dados.solicitante === '')||(!dados.solicitante)) {
            return response.status(400).json({mensagem:`solicitante não recebido`})
        }
        
        await console.log(dados) //incluir query de cadastro no banco
        try {
            return response.status(201).json({mensagem:`incidente cadastrado com sucesso!`})
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
    },

    async deletar(request,response){
        const dados = request.params;

        // validações
        if ((dados.id === '')||(!dados.id)) {
            return response.status(400).json({mensagem:`ID do incidente não recebido`})
        }

        await console.log(dados) //incluir query de conexão com o banco
        try {
            return response.status(201).json({mensagem:`incidente excluído com sucesso!`})
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
    },
    
}