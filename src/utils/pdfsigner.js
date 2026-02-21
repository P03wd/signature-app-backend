import fs from "fs";
import { PDFDocument } from "pdf-lib";

export const addSignatureToPDF = async (
  inputPath,
  outputPath,
  signatureBase64
) => {
  const pdfBytes = fs.readFileSync(inputPath);

  const pdfDoc = await PDFDocument.load(pdfBytes);

  const page = pdfDoc.getPages()[0];

  const pngImage = await pdfDoc.embedPng(
    signatureBase64.replace(/^data:image\/png;base64,/, "")
  );

  const { width, height } = page.getSize();

  page.drawImage(pngImage, {
    x: width - 200,
    y: 50,
    width: 150,
    height: 50,
  });

  const modifiedPdf = await pdfDoc.save();

  fs.writeFileSync(outputPath, modifiedPdf);
};
