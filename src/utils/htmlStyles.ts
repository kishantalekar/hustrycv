export const getCommonStyles = (scale: number) => `
  .section {
    margin: 16px 0;
  }
  .section-title {
    font-family: 'FiraSans-Bold';
    font-size: ${18 * scale}px;
    margin-bottom: 8px;
  }
  .text-regular {
    font-family: 'FiraSans-Regular';
    font-size: ${12 * scale}px;
  }
  .text-bold {
    font-family: 'FiraSans-Bold';
    font-size: ${14 * scale}px;
  }
  .text-muted {
    color: #666;
  }
`;