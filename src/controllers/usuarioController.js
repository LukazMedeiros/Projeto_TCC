
module.exports = {
    
    async atualizar(request,response){
        const {
            cpf,
            nome,
            ra,
            senha
        } = request.body;
        
        // validaçoes
        if ((cpf=== '')||(!cpf)) {
            return response.status(400).json({mensagem:`CPF não recebido`})
        }else if ((nome === '')||(!nome)) {
            return response.status(400).json({mensagem:`nome não recebido`})
        } else if((ra === '')||(!ra)){
            return response.status(400).json({mensagem:`RA não recebido`})
        }else if((senha === '')||(!senha)){
            return response.status(400).json({mensagem:`Senha não recebido`})
        }
        
        await console.log(`recebido ${cpf} do usuario`) //colocar função de atualização para o banco de dados
        try {
            return response.status(200).json({mensagem:`cadastro atualizado com sucesso!`})
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
    },
    
    async criar(request,response){
        const {
            cpf,
            nome,
            ra,
            senha
        } = request.body;
        
        // validaçoes
        if ((cpf==="")||(!cpf)) {
            return response.status(400).json({mensagem:`CPF não recebido`})
        }else if ((nome === "")||(!nome)) {
            return response.status(400).json({mensagem:`nome não recebido`})
        } else if((ra === "")||(!ra)){
            return response.status(400).json({mensagem:`RA não recebido`})
        }else if((senha === "")||(!senha)){
            return response.status(400).json({mensagem:`Senha não recebido`})
        }
        
        await console.log(`funcionou`); //colocar a função de cadastro no banco de dado
        try {
            return response.status(200).json({mensagem:`usuário cadastrado com sucesso!`})
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
    },
    
    async deletar(request,response){
        const {
            usuario, 
            senha
        } = request.headers;

        // validações
        if ((usuario==="")||(!usuario)) {
            return response.status(400).json({mensagem:`ID do usuário não recebido`})
        }else if((senha==="")||(!senha)) {
            return response.status(400).json({mensagem:`Senha do usuário não recebido`})
        }

        await console.log(`deletar`);
        try {
            return response.status(200).json({mensagem:`Usuário excluído com sucesso!`})
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
    },
    
}