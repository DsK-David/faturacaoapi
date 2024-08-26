// Importação do módulo Express para criar o servidor web
import express from "express";
import dotenv from "dotenv"
dotenv.config()
// import { v4 as uuidv4 } from "uuid";
import { createServer } from "http";
// Importação de funções para interagir com o banco de dados
import {
  deletarClientePorEntidade,
  mostrarClientePorEntidade,
  mostrarClientes,
} from "../repositories/cliente.js";
import mostrarTodoCliente from "../controller/mostrarTodoCliente.js";
import mostrarTodoProduto from "../controller/mostrarTodoProduto.js";
import { entidade } from "../repositories/entidade.js";
import { auth } from "../repositories/login.js";
import {
  mostrarProdutoPeloNome,  
  mostrarProdutoPorBarCode,
  mostrarProdutoPorCategoria,
  mostrarProdutoPorEntidade,
} from "../repositories/produto.js";
import mostrarTodaCategoria from "../controller/mostrarTodaCategoria.js";
import { mostrarCategoriaPorEntidade } from "../repositories/categorias.js";
import { adicionarVenda, mostrarTodaVendaPorEntidade } from "../repositories/vendas.js";
import mostrarTodaVenda from "../controller/mostrarTodaVenda.js";
import path from "path";
import ejs from "ejs";
import pdf from "html-pdf";
import fs from "fs";


// Criação da instância do aplicativo Express
const app = express();
const server = createServer(app);
app.set("view engine", "ejs");
import { fileURLToPath } from "url";

// Obter o diretório atual usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do caminho para as views
app.set("views", path.join(__dirname, "views"));

// function generateApiKey(){
//   return uuidv4()
// }
function verifyApiKey(req,res,next){
  const apikey = req.headers["authorization"]
  const validApiKey=process.env.APIKEY


  if(!apikey || apikey !== validApiKey){
    return res.status(401).json({message:"a chave da api esta faltando"})
  }
  next()
}
async function teste(venda,res){
  venda.Itens_Comprados.forEach((item) => {
    res.send(item.quantidade)
  });
}
//gerador de fatura automatica
export async function gerarFaturaPDF(venda, res) {
  const data=new Date()
  const hora=`${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()},${data.toLocaleTimeString()}`
const invoiceData = {
  id: venda.Venda_ID,
  nomeCliente: venda.nomeCliente ?? "Cliente Teste",
  data: hora,
  valorTotal: parseFloat(venda.Valor_Total) || 0,
  itens: [],
};

venda.Itens_Comprados.forEach((item) => {
  invoiceData.itens.push({
    precoUni:parseFloat( item.PrecoDoProduto),
    quantidade: parseFloat(item.quantidade) || 0,
    total: parseFloat(item.total) || 0,
  });
});





  try {
    const html = await ejs.renderFile(
      path.join(__dirname, "views", "invoice-template.ejs"),
      { invoice: invoiceData }
    );

    const options = {
      format: "A5",
      border: {
        top: "2mm",
        right: "2mm",
        bottom: "2mm",
        left: "2mm",
      },
      footer: {
        height: "8mm",
        contents: {
          default:
            '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
        },
      },
    };

    pdf.create(html, options).toStream((err, stream) => {
      if (err) {
        console.error("Erro ao criar o PDF:", err);
        if (!res.headersSent) {
          res.status(500).send("Erro ao gerar o PDF");
        }
        return;
      }

      if (!res.headersSent) {
        res.setHeader(
          "Content-disposition",
          `attachment; filename="Fatura.pdf"`
        );
        res.setHeader("Content-type", "application/pdf");
      }

      stream.pipe(res);
    });
  } catch (error) {
    console.error("Erro ao gerar o PDF:", error);
    if (!res.headersSent) {
      res.status(500).send("Erro ao gerar o PDF");
    }
  }
}
// Configuração do middleware para analisar corpos de requisições HTTP com formato JSON
app.use(express.json());
console.log(process.env.APIKEY)


// Rota raiz que retorna uma mensagem simples "Hello World!"
app.get("/", (req, res) => {
  res.sendFile(__dirname+"/index.html");
});

// Endpoint para retornar todos os clientes
app.get("/api/v1/cliente",verifyApiKey, mostrarTodoCliente);

app.delete("/api/v1/cliente/:clienteID/:entidadeID",async (req,res)=>{
  const { clienteID,entidadeID } = req.params;
  try {
    const cliente = await deletarClientePorEntidade(clienteID, entidadeID);
    res.send({ message:`Cliente com id ${clienteID} foi deletado com sucesso`})
  } catch (error) {
    res.status(500).send({error: error.message})
  }
})
// Endpoint para buscar todos os clientes de uma entidade 
app.get("/api/v1/cliente/:entidadeID", async (req, res) => {
  const { entidadeID } = req.params;
  try {
    const cliente = await mostrarClientePorEntidade(entidadeID);
    res.send(cliente);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
// endpoint para listar todas as vendas de uma entidade
app.get("/api/v1/vendas",mostrarTodaVenda)
// Endpoint para retornar todos os produtos
app.get("/api/v1/produto",verifyApiKey, mostrarTodoProduto);

// Endpoint para buscar um produto específico pelo ID da entidade
app.get("/api/v1/produto/:entidadeID", async (req, res) => {
  const { entidadeID } = req.params;
  try {
    const produto = await mostrarProdutoPorEntidade(entidadeID);
    res.send(produto);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para buscar um produto pelo seu código de barras
app.get("/api/v1/produto/barcode/:barcode",verifyApiKey, async (req, res) => {
  const { barcode } = req.params;
  try {
    const produto = await mostrarProdutoPorBarCode(barcode);

   
    if (produto === undefined) {
      return res.status(404).send({ message: "Produto não encontrado" });
    }

    res.send(produto);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


// Endpoint para buscar um produto pelo nome
app.get("/api/v1/produto/nome/:produto_nome/:entidadeID",verifyApiKey, async (req, res) => {
  const { produto_nome,entidadeID } = req.params;
  try {
    const produto = await mostrarProdutoPeloNome(produto_nome,entidadeID);
    if (produto === undefined) {
      res.send({ message: "Usuario não encontrado" });
    }
    res.send(produto);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
app.get("/api/v1/produto/categoria/:categoriaID",verifyApiKey, async (req, res) => {
  const { categoriaID } = req.params;
  try {
    const produto = await mostrarProdutoPorCategoria(categoriaID);
    if (produto === undefined) {
      res.send({ message: "Usuario não encontrado" });
    }
    res.send(produto);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para autenticar um usuário com base no nome de usuário e senha
app.get("/api/v1/auth/:username/:password",verifyApiKey, async (req, res) => {
  const { username, password } = req.params;
  try {
    const user = await auth(username, password);
    if(user.length=== 0){
    throw new Error("Nome de Usuario ou Senha incorretos") 
    }
    else{
      res.send(user);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para buscar informações sobre uma entidade específica pelo ID
app.get("/api/v1/entidade/:id",verifyApiKey, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await entidade(id);
    if (user === undefined) {
      res.send({ message: "Usuario não encontrado" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para retornar todas as categorias
app.get("/api/v1/categoria", verifyApiKey,mostrarTodaCategoria);

// Endpoint para buscar uma categoria específica pelo ID
app.get("/api/v1/categoria/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const categroia = await mostrarCategoriaPorEntidade(id);
    if (categroia === undefined) {
      res.send({ message: "Usuario não encontrado" });
    }
    res.send(categroia);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para buscar todas as vendas associadas a uma entidade específica pelo ID
app.get("/api/v1/vendas/:id",verifyApiKey, async (req, res) => {
  const { id } = req.params;
  try {
    const vendas = await mostrarTodaVendaPorEntidade(id);
    if (vendas === undefined) {
      res.send({ message: "Usuario não encontrado" });
    }
    res.send(vendas);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
app.post("/api/v1/venda/", async (req, res) => {
  try {
    const { Entidade_ID, UTILIZADOR, Itens_Comprados, Valor_Total } = req.body;

    if (!Entidade_ID || !UTILIZADOR || !Itens_Comprados || !Valor_Total) {
      return res.status(400).json({ error: "Dados da venda incompletos" });
    }

    const venda = await adicionarVenda(Entidade_ID, UTILIZADOR, Itens_Comprados, Valor_Total);
    // res.send(venda)
    await gerarFaturaPDF(venda,res);

   
    // res.send(venda)
  } catch (error) {
    console.error("Erro ao registrar venda:", error);
    res.status(500).json({ error: "Erro ao registrar venda" });
  }
});

// Porta na qual o servidor será iniciado
const PORT =  3000;

// Início do servidor na porta especificada
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
