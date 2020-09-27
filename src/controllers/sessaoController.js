const conn = require('../model/conexao');
const crypto = require('crypto');

module.exports = {
    
    async login(request, response) {
        const {usuario, senha} = request.body;
        const segredo = crypto.createHash("md5",senha).update(senha).digest('HEX');

        if ((usuario === '')||(!usuario)) {
            return response.status(400).json({mensagem:`Usuário não recebido`})
        }

        if ((senha === '')||(!senha)) {
            return response.status(400).json({mensagem:`Senha não recebida`})
        }

        try {
            const resposta = await conn('usuarios').select('*').where('ra',usuario).first()

            if (!resposta) {
                return response.status(400).json({mensagem:`Usuário informado não localizado`})
            }

            if (resposta.senha !== segredo) {
                return response.status(400).json({mensagem:`A senha informada não confere, caso tenha esquecido, solicite um reset junto à coordenação`})
            }
            return response.status(200).json(resposta)
        } catch (error) {
            return response.status(400).json({mensagem:`${error}`})
        }
    }
    
}