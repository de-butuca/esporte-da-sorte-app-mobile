package com.brcneto.edscript

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.UiThreadUtil

class NativeSplashModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName() = "NativeSplashModule"

  @ReactMethod
  fun hide() {
    UiThreadUtil.runOnUiThread {
      NativeSplashView.instance?.hide()
    }
  }
}
