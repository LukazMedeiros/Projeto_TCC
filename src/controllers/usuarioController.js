const conn = require('../model/conexao');

module.exports = {
    
    async atualizar(request,response){
        const {
            cpf,
            nome,
            ra,
            senha
        } = request.body;
        
        const alvo = request.headers.usuario
        
        // validaçoes dados recebidos
        if ((cpf=== '')||(!cpf)) {
            return response.status(400).json({mensagem:`CPF não recebido`})
        }else if ((nome === '')||(!nome)) {
            return response.status(400).json({mensagem:`nome não recebido`})
        } else if((ra === '')||(!ra)){
            return response.status(400).json({mensagem:`RA não recebido`})
        }else if((senha === '')||(!senha)){
            return response.status(400).json({mensagem:`Senha não recebido`})
        }else if((alvo === '')||(!alvo)){
            return response.status(400).json({mensagem:`Usuário não recebido`})
        }
        
        // atualizando usuario no banco de dados
        try {
            await conn('usuarios').update({cpf,nome,ra,senha}).where('ra',alvo)
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
        
        // validaçoes de dados
        if ((cpf==="")||(!cpf)) {
            return response.status(400).json({mensagem:`CPF não recebido`})
        }else if ((nome === "")||(!nome)) {
            return response.status(400).json({mensagem:`nome não recebido`})
        } else if((ra === "")||(!ra)){
            return response.status(400).json({mensagem:`RA não recebido`})
        }else if((senha === "")||(!senha)){
            return response.status(400).json({mensagem:`Senha não recebido`})
        }
        
        // inserindo usuario no banco
        try {
            const usuario = await conn('usuarios').insert({cpf,nome,ra,senha})
            return response.status(200).json({mensagem:`usuário cadastrado com sucesso! ID do usuário ${usuario}`})
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
    },
    
    async deletar(request,response){
        const {
            usuario, 
            senha
        } = request.headers;        
        
        // validações dados recebidos
        if ((usuario==="")||(!usuario)) {
            return response.status(400).json({mensagem:`ID do usuário não recebido`})
        }else if((senha==="")||(!senha)) {
            return response.status(400).json({mensagem:`Senha do usuário não recebido`})
        }
        
        // validação senha do usuario
        try {
            const [validacao] = await conn('usuarios').select('senha').where('ra',usuario)
            if (validacao.senha !== senha) {
                return response.status(400).json({mensagem:`Senha incorreta`})
            }
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
        
        // excluindo usuario
        try {
            await conn('usuarios').delete('*').where('ra',usuario)
            return response.status(200).json({mensagem:`Usuário excluído com sucesso!`})
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
    },
    
}