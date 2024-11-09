import ejs from "ejs";
import pdf from "html-pdf";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { fileURLToPath } from "url";
import QRCode from "qrcode";

export async function gerarFaturaPDF(venda, res) {
  const data = new Date();
  const hora = `${data.getDate()}/${
    data.getMonth() + 1
  }/${data.getFullYear()},${data.toLocaleTimeString()}`;
  const invoiceData = {
    id: venda.Venda_ID,
    nomeCliente: venda.nomeCliente ?? "Cliente Teste",
    data: hora,
    valorTotal: parseFloat(venda.Valor_Total) || 0,
    itens: [],
  };

  venda.Itens_Comprados.forEach((item) => {
    invoiceData.itens.push({
      preco: parseFloat(item.PrecoDoProduto) || 0,
      quantidade: parseFloat(item.quantidade) || 0,
      total: parseFloat(item.total) || 0,
    });
  });
  const qrcodeData = await QRCode.toDataURL(
    "https://webhook.site/#!/view/1548898b-d3c6-4a49-83a7-99549dc5476d/4fc2a2c7-91c4-48ce-bda7-8ebdc7902f90/1"
  );

  try {
    const html = await ejs.renderFile(
      path.join("src", "views", "invoice-template.ejs"),
      { invoice: invoiceData,qrcodeData }
    );

    const options = {
      format: "A4",
      border: {
        top: "2mm",
        right: "2mm",
        bottom: "2mm",
        left: "1mm",
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
