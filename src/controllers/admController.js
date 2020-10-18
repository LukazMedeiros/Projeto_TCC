const conn = require("../model/conexao");

module.exports = {
  async listarAdm(request, response) {
    try {
      const resposta = await conn("incidentes").select("*");
      return response.status(200).json(resposta);
    } catch (error) {
      return response.status(400).json({ mensagem: `${error}` });
    }
  },

  async listarStatus(request, response) {
    const status = request.params.status;

    // validações
    if (status === "" || !status) {
      return response
        .status(400)
        .json({ mensagem: `ID do status não recebido` });
    }

    try {
      const resposta = await conn("incidentes")
        .select("*")
        .where("status", status);
      return response.status(200).json(resposta);
    } catch (error) {
      return response.status(400).json({ mensagem: `${error}` });
    }
  },

  async buscar(request, response) {
    const id = request.params.id;
    try {
      const resposta = await conn("incidentes").select("*").where("id", id);
      return response.status(200).json(resposta);
    } catch (error) {
      return response.status(400).json({ mensagem: `${error}` });
    }
  },

  async encerrar(request, response) {
    const hoje = new Date();
    const data_encerramento = hoje.toGMTString();
    const id = request.params.id;
    const resolucao = request.body.resolucao;
    const responsavel = request.headers.responsavel;
    if (id === "" || !id) {
      return response.json({ mensagem: `ID do ticket não recebido` });
    }

    if (resolucao === "" || !resolucao) {
      return response.json({ mensagem: `Resolução não recebido` });
    }

    if (responsavel === "" || !responsavel) {
      return response.json({ mensagem: `Responsável não recebido` });
    }

    const pesquisa = await conn("incidentes")
      .select("*")
      .where("id", id)
      .first();
    if (pesquisa.status === "solucionado") {
      return response.json({ mensagem: `Erro! o ticket já está encerrado` });
    }
    const resposta = await conn("incidentes")
      .update({
        resolucao: resolucao,
        data_encerramento: data_encerramento,
        status: "solucionado",
        responsavel: responsavel,
      })
      .where("id", id);
    return response.json({ mensagem: `Ticket encerrado` });
  },
};
