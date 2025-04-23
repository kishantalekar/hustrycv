import {useWindowDimensions} from 'react-native';

interface A4Dimensions {
  containerWidth: number;
  containerHeight: number;
  scale: number;
  previewWidth: number;
  previewHeight: number;
}

export const useA4Dimensions = (padding: number = 32): A4Dimensions => {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();

  // A4 constants (in points/pixels, assuming 72 DPI)
  const A4_WIDTH_PT = 595.276; // 210mm at 72 DPI
  const A4_HEIGHT_PT = 841.89; // 297mm at 72 DPI
  // const A4_ASPECT_RATIO = A4_HEIGHT_PT / A4_WIDTH_PT;

  // PDF dimensions (maintain exact A4 size for PDF export)
  const containerWidth = A4_WIDTH_PT;
  const containerHeight = A4_HEIGHT_PT;

  // Calculate preview dimensions
  const maxPreviewWidth = windowWidth - padding;
  const maxPreviewHeight = windowHeight * 0.8; // Use 80% of screen height

  // Calculate scale while maintaining aspect ratio
  const widthScale = maxPreviewWidth / A4_WIDTH_PT;
  const heightScale = maxPreviewHeight / A4_HEIGHT_PT;
  const previewScale = Math.min(widthScale, heightScale);

  const previewWidth = A4_WIDTH_PT * previewScale;
  const previewHeight = A4_HEIGHT_PT * previewScale;

  // Scale factor for fonts and spacing
  const scale = 1; // Base scale for PDF generation

  return {
    containerWidth,
    containerHeight,
    scale,
    previewWidth,
    previewHeight,
  };
};
