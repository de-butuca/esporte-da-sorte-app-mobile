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
  func getAnimationStartTime() -> NSNumber {
    return NSNumber(value: NativeSplashView.animationStartTime)
  }

  @objc
  static func requiresMainQueueSetup() -> Bool { return false }
}
