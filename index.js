const downloadPDF = async () => {
  const response = await fetch('https://i.ibb.co/tB4RLDs/Final-Resume.png');
  const imageBytes = await response.arrayBuffer();

  const pdfDoc = await PDFLib.PDFDocument.create();
  const pngImage = await pdfDoc.embedPng(imageBytes);

  const page = pdfDoc.addPage();
  const { width, height } = pngImage.scale(1);

  const pdfWidth = page.getWidth();
  const pdfHeight = page.getHeight();

  const scaleX = pdfWidth / width;
  const scaleY = pdfHeight / height;
  const scale = Math.min(scaleX, scaleY);

  const scaledWidth = width * scale;
  const scaledHeight = height * scale;

  page.drawImage(pngImage, {
    x: (pdfWidth - scaledWidth) / 2,
    y: (pdfHeight - scaledHeight) / 2,
    width: scaledWidth,
    height: scaledHeight,
  });

  const pdfBytes = await pdfDoc.save();
  const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(pdfBlob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'Sive_Mdluli_Resume.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const downloadButton = document.getElementById('downloadButton');
downloadButton.addEventListener('click', downloadPDF);
