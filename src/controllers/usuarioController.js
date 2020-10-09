const conn = require('../model/conexao');
const crypto = require('crypto');

module.exports = {
    
    async atualizar(request,response){
        const {
            cpf,
            nome,
            ra,
            senha,
            tipo
        } = request.body;

        const segredo = crypto.createHash("md5",senha).update(senha).digest('HEX');
        
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
        }else if((tipo === '')||(!tipo)){
            return response.status(400).json({mensagem:`tipo não recebido`})
        }
        
        // atualizando usuario no banco de dados
        try {
            await conn('usuarios').update({cpf,nome,ra,"senha":segredo}).where('ra',alvo)
            return response.status(200).json({mensagem:`cadastro atualizado com sucesso!`})
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
    },
    
    criar(request,response){
        const dados = request.body;
        
        dados.forEach(async usuario => {
            if ((usuario.cpf==="")||(!usuario.cpf)) {
                return response.status(400).json({mensagem:`CPF não recebido`})
            }else if ((usuario.nome === "")||(!usuario.nome)) {
                return response.status(400).json({mensagem:`nome não recebido`})
            } else if((usuario.ra === "")||(!usuario.ra)){
                return response.status(400).json({mensagem:`RA não recebido`})
            }else if((usuario.senha === "")||(!usuario.senha)){
                return response.status(400).json({mensagem:`Senha não recebido`})
            }else if((usuario.tipo === '')||(!usuario.tipo)){
                return response.status(400).json({mensagem:`tipo não recebido`})
            }
            
            try {
                await conn('usuarios').insert({"cpf":usuario.cpf,"nome":usuario.nome,"ra":usuario.ra,"senha":usuario.senha,"tipo":usuario.tipo})
            } catch (error) {
                return response.status(400).json({mensagem:`${error}`})
            }
            return response.status(200).json({mensagem:`usuários cadastrados com sucesso!`})
        })
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

    async pesquisar(request, response){
        const alvo = request.headers.usuario

        if ((alvo === "")||(!alvo)) {
            return response.status(400).json({mensagem:`Usuário não recebido`})
        }

        try {
            const resposta = await conn('usuarios').select('*').where('ra',alvo)
            return response.status(200).json(resposta)
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
    }
    
}