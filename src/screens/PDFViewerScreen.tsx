// import React from 'react';
// import {StyleSheet, Dimensions} from 'react-native';
// import Pdf from 'react-native-pdf';

// interface PDFViewerScreenProps {
//   route: {
//     params: {
//       uri: string;
//       title: string;
//     };
//   };
// }

// const PDFViewerScreen = ({route}: PDFViewerScreenProps) => {
//   const {uri, title} = route.params;

//   return (
//     <Pdf
//       source={{uri: `file://${uri}`}}
//       style={styles.pdf}
//       enablePaging={true}
//       horizontal={false}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   pdf: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
// });

// export default PDFViewerScreen;
