import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export const obtenerPDFfoleado = async (
  totalPages,
  pos,
  fontSize,
  orden,
  pageWidth,
  pageHeight
) => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  let numero = "";
  for (let i = 0; i < totalPages; i++) {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    let text;
    if (orden === "ascendente") {
      numero = `${i + 1}`;
    } else {
      numero = `${totalPages - i}`;
    }
    text = numero;
    const textWidth = font.widthOfTextAtSize(text, fontSize);

    let x = 0;
    let y = 0;

    switch (pos) {
      case "abajo-centro":
        x = (pageWidth - textWidth) / 2;
        y = 30;
        break;
      case "abajo-izquierda":
        x = 40;
        y = 30;
        break;
      case "abajo-derecha":
        x = pageWidth - textWidth - 40;
        y = 30;
        break;
      case "arriba-centro":
        x = (pageWidth - textWidth) / 2;
        y = pageHeight - 40;
        break;
      case "arriba-izquierda":
        x = 40;
        y = pageHeight - 40;
        break;
      case "arriba-derecha":
        x = pageWidth - textWidth - 40;
        y = pageHeight - 40;
        break;
      default:
        x = (pageWidth - textWidth) / 2;
        y = 30;
    }

    page.drawText(text, {
      x,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
