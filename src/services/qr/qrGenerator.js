// Ejemplo de utilidad reutilizable (aunque en este caso es simple)
import QRCode from 'qrcode';

export const generateQRDataUrl = async (text, options = {}) => {
  return await QRCode.toDataURL(text, {
    width: 300,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#ffffff'
    },
    ...options
  });
};