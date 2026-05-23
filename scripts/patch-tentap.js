/* scripts/patch-tentap.js */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(
  __dirname,
  '../node_modules/@10play/tentap-editor/src/TenTapViewNativeComponent.ts',
);

if (fs.existsSync(filePath)) {
  const content = `import type { ViewProps } from 'react-native';
import type { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

interface NativeProps extends ViewProps {
  keyboardHeight: Int32;
  keyboardID?: string;
  inputTag?: Int32;
  rootBackground?: Int32;
}

export default codegenNativeComponent<NativeProps>('TenTapView');
`;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ @10play/tentap-editor TS spec patched successfully!');
} else {
  console.log('⚠️ @10play/tentap-editor TS spec path not found.');
}

const ktFilePath = path.resolve(
  __dirname,
  '../node_modules/@10play/tentap-editor/android/src/main/java/com/tentap/TenTapViewManager.kt',
);

if (fs.existsSync(ktFilePath)) {
  let content = fs.readFileSync(ktFilePath, 'utf8');
  
  const target = `  private fun dispatchUIUpdate(runnable: Runnable){
    UiThreadUtil.runOnUiThread(Runnable {
        runnable.run()
        var uiManagerModule = reactContext.getNativeModule(UIManagerModule::class.java)
        if(uiManagerModule != null) {
          reactContext.runOnNativeModulesQueueThread(Runnable {
            uiManagerModule.onBatchComplete()
          })
        }
    })
  }`;

  const replacement = `  private fun dispatchUIUpdate(runnable: Runnable){
    UiThreadUtil.runOnUiThread(Runnable {
        runnable.run()
        try {
          var uiManagerModule = reactContext.getNativeModule(UIManagerModule::class.java)
          if(uiManagerModule != null) {
            reactContext.runOnNativeModulesQueueThread(Runnable {
              try {
                val method = uiManagerModule.javaClass.getMethod("onBatchComplete")
                method.invoke(uiManagerModule)
              } catch (e: Exception) {
                // Ignore if method does not exist (as in RN 0.85+)
              }
            })
          }
        } catch (e: Exception) {
          // Safe fallback
        }
    })
  }`;

  if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(ktFilePath, content, 'utf8');
    console.log('✅ @10play/tentap-editor Kotlin ViewManager patched successfully!');
  } else {
    console.log('ℹ️ @10play/tentap-editor Kotlin ViewManager already patched.');
  }
} else {
  console.log('⚠️ @10play/tentap-editor Kotlin ViewManager path not found.');
}
