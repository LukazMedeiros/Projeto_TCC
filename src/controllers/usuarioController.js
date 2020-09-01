
module.exports = {
    
    async atualizar(request,response){
        const {
            cpf,
            nome,
            ra
        } = request.body;
        // validaçoes
        if ((cpf==="")||(!cpf)) {
            return response.status(400).json({mensagem:`CPF não recebido`})
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
            ra
        } = request.body;
        // validaçoes
        if ((cpf === '')||(!cpf)) {
            return response.status(400).json({mensagem:`CPF não recebido`})
        }
        if ((nome === '')||(!nome)) {
            return response.status(400).json({mensagem:`nome não recebido`})
        }
        await console.log(`funcionou`); //colocar a função de cadastro no banco de dado
        try {
            return response.status(200).json({mensagem:`usuário cadastrado com sucesso!`})
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
    },
    
    async deletar(request,response){
        const {naosei} = request.body;
        // validações
        if ((naosei==="")||(!naosei)) {
            return response.status(400).json({mensagem:`verifique os dados informados`})
        }
        await console.log(`deletar`);
        try {
            return response.status(200).json({mensagem:`usuário excluído com sucesso!`})
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
    },
    
}