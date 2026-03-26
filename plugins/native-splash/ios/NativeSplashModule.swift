import Foundation
import React

@objc(NativeSplashModule)
class NativeSplashModule: NSObject {

  @objc
  func hide() {
    DispatchQueue.main.async {
      NativeSplashView.shared?.hide(animated: true)
    }
  }

  @objc
  static func requiresMainQueueSetup() -> Bool { return false }
}
