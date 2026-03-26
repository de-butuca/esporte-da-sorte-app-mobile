import UIKit

class NativeSplashView: UIView {

  static var shared: NativeSplashView?
  static var animationStartTime: TimeInterval = 0

  private let BG = UIColor(red: 2/255, green: 54/255, blue: 151/255, alpha: 1)
  private let viewBoxW: CGFloat = 1209
  private let viewBoxH: CGFloat = 419

  private let containerLayer = CALayer()
  private let sportesMaskLayer = CALayer()
  private let daSorteMaskLayer = CALayer()

  private var svgW: CGFloat = 0
  private var svgH: CGFloat = 0
  private var sx: CGFloat = 0
  private var sy: CGFloat = 0

  private let PATH_E_CORPO = "M134 115.48C158.17 114.81 178.54 98.95 185.9 77.11H56.31V77.13C25.24 77.26 0 102.58 0 133.69C0 164.8 25.16 190.03 56.16 190.25L132.41 190.26H185.9C178.54 168.41 158.17 152.55 134 151.89H56.57C46.71 151.89 38.37 143.56 38.37 133.69C38.37 123.82 46.7 115.49 56.57 115.49L134 115.48Z"
  private let PATH_E_ACENTO = "M122.35 0.359985C98.1802 1.02999 77.8102 16.89 70.4502 38.73H179.01C203.18 38.06 223.55 22.2 230.91 0.359985H122.35Z"
  private let SPORTES_PATHS = ["M303.07 95.5501H246.61C241.66 95.5501 237.47 91.3701 237.47 86.4101C237.47 81.4501 241.66 77.27 246.61 77.27H301.18C324.81 77.16 344.71 60.94 350.44 39.05H246.61C220.5 39.05 199.26 60.3001 199.26 86.4101C199.26 112.52 220.5 133.77 246.62 133.77H303.08C308.03 133.77 312.22 137.96 312.22 142.91C312.22 147.86 308.04 152.05 303.08 152.05L245.03 152.19C222.94 153.79 204.7 169.46 199.26 190.26H303.08C329.19 190.26 350.43 169.02 350.43 142.9C350.43 116.78 329.19 95.5401 303.07 95.5401","M492.62 61.37C478.28 47.03 459.31 39.14 439.21 39.14H363.67V247.93C385.72 242.16 402.04 222.07 402.04 198.23V190.43H439.2C459.3 190.43 478.27 182.53 492.61 168.2C506.95 153.86 514.84 134.9 514.84 114.79C514.84 94.68 506.94 75.72 492.61 61.38M465.48 141.05C458.39 148.14 449.06 152.04 439.21 152.04H402.05V77.5H439.21C449.06 77.5 458.39 81.4 465.48 88.49C472.57 95.58 476.47 104.91 476.47 114.76C476.47 124.61 472.57 133.95 465.48 141.04","M603.93 192.13C593.49 192.13 583.349 190.08 573.789 186.04C564.569 182.14 556.29 176.56 549.19 169.46C542.09 162.36 536.509 154.08 532.609 144.86C528.569 135.3 526.52 125.16 526.52 114.72C526.52 104.28 528.569 94.1401 532.609 84.5801C536.509 75.3601 542.09 67.0801 549.19 59.9801C556.29 52.8801 564.569 47.3001 573.789 43.4001C583.349 39.3601 593.49 37.3101 603.93 37.3101C614.37 37.3101 624.51 39.3601 634.07 43.4001C643.29 47.3001 651.569 52.8801 658.669 59.9801C665.77 67.0801 671.35 75.3601 675.25 84.5801C679.29 94.1401 681.34 104.28 681.34 114.72C681.34 125.16 679.29 135.3 675.25 144.86C671.35 154.08 665.77 162.36 658.669 169.46C651.569 176.56 643.29 182.14 634.07 186.04C624.51 190.08 614.37 192.13 603.93 192.13ZM603.93 77.5101C583.41 77.5101 566.719 94.2001 566.719 114.72C566.719 135.24 583.41 151.93 603.93 151.93C624.45 151.93 641.14 135.24 641.14 114.72C641.14 94.2001 624.45 77.5101 603.93 77.5101Z","M768.35 38.73V38.83C748.24 38.83 729.28 46.73 714.94 61.06C700.74 75.26 692.87 94 692.72 113.89H692.7V190.24H731.07V114.47C731.07 104.62 734.97 95.28 742.06 88.19C749.15 81.1 758.48 77.2 768.34 77.2L786.12 77.1V38.73H768.34H768.35Z","M850.62 151.74C843.58 151.74 837.63 145.79 837.63 138.75V77.11H850.62V77.06C874.44 77.06 894.52 60.76 900.3 38.73H837.6V0C816.05 5.66 800 25 799.31 48.13H799.25V138.75C799.25 167.07 822.29 190.11 850.61 190.11C850.91 190.11 900.32 190.01 900.32 190.01C894.57 167.93 874.46 151.74 850.61 151.74","M992.63 151.98V151.93H966.72C956.87 151.93 947.54 148.03 940.44 140.94C938.27 138.77 936.4 136.39 934.85 133.85H994.89C1021.04 133.85 1042.31 112.58 1042.31 86.43C1042.31 60.28 1021.04 39.01 994.89 39.01V38.97H965.9V39.04C946.1 39.25 927.45 47.11 913.31 61.25C898.97 75.59 891.08 94.55 891.08 114.66C891.08 134.77 898.98 153.73 913.31 168.07C926.86 181.63 944.56 189.41 963.44 190.22V190.3H992.62H1042.3C1036.51 168.27 1016.43 151.97 992.62 151.97M940.45 88.39C947.54 81.3 956.87 77.4 966.73 77.4V77.35H994.9V77.39C999.8 77.39 1003.94 81.53 1003.94 86.44C1003.94 91.35 999.8 95.48 994.9 95.48H934.86C936.41 92.94 938.28 90.56 940.45 88.39Z","M1160.86 95.5501H1104.4C1099.45 95.5501 1095.26 91.3701 1095.26 86.4101C1095.26 81.4501 1099.45 77.27 1104.4 77.27H1158.97C1182.6 77.16 1202.5 60.94 1208.23 39.05H1104.41C1078.3 39.05 1057.06 60.3001 1057.06 86.4101C1057.06 112.52 1078.3 133.77 1104.42 133.77H1160.88C1165.83 133.77 1170.02 137.96 1170.02 142.91C1170.02 147.86 1165.84 152.05 1160.88 152.05L1102.83 152.19C1080.74 153.79 1062.5 169.46 1057.06 190.26H1160.88C1186.99 190.26 1208.23 169.02 1208.23 142.9C1208.23 116.78 1186.99 95.5401 1160.87 95.5401"]
  private let DA_SORTE_PATHS = ["M184.03 265.04H145.86C125.78 265.05 106.83 272.95 92.4995 287.27C78.1595 301.61 70.2695 320.57 70.2695 340.68C70.2695 360.79 78.1695 379.75 92.4995 394.09C106.83 408.42 125.77 416.31 145.86 416.32H221.2V226.42C202.67 231.27 188.19 246.23 184.04 265.03M145.91 377.95C136.06 377.95 126.73 374.05 119.63 366.96C112.54 359.87 108.63 350.54 108.63 340.68C108.63 330.82 112.53 321.49 119.63 314.4C126.72 307.31 136.05 303.41 145.91 303.41H182.82V377.95H145.91Z","M338.11 265.12H234.41C240.19 287.15 260.27 303.45 284.09 303.45V303.5H338.11C343.01 303.5 347.15 307.64 347.15 312.54C347.15 317.44 343.01 321.58 338.11 321.58H281.76C255.61 321.58 234.34 342.85 234.34 369C234.34 395.15 255.61 416.42 281.76 416.42V416.46L366.33 416.42H385.52V312.54C385.52 286.39 364.25 265.13 338.11 265.13M347.15 378.08H281.76V378.04C276.86 378.04 272.72 373.9 272.72 368.99C272.72 364.08 276.86 359.95 281.76 359.95H347.15V378.08Z","M555.35 302.16L482.06 302.14C472.07 302.14 463.63 293.7 463.63 283.71C463.63 273.72 472.07 265.28 482.06 265.28H565.24C588.86 265.28 608.66 248.61 613.51 226.42H482.07C450.48 226.42 424.78 252.12 424.78 283.71C424.78 315.3 450.48 341 482.07 341H555.01C565 341.01 573.44 349.45 573.44 359.44C573.44 369.43 565 377.87 555.01 377.87H473.03C449.41 377.87 429.61 394.54 424.76 416.73H555.01C586.6 416.73 612.3 391.03 612.3 359.44C612.3 327.85 586.79 302.35 555.37 302.16","M699.4 418.08C688.96 418.08 678.82 416.03 669.26 411.99C660.04 408.09 651.76 402.51 644.66 395.41C637.56 388.31 631.98 380.03 628.08 370.81C624.04 361.25 621.99 351.11 621.99 340.67C621.99 330.23 624.04 320.09 628.08 310.53C631.98 301.31 637.56 293.03 644.66 285.93C651.76 278.83 660.04 273.25 669.26 269.35C678.82 265.31 688.96 263.26 699.4 263.26C709.84 263.26 719.98 265.31 729.54 269.35C738.76 273.25 747.04 278.83 754.14 285.93C761.24 293.03 766.82 301.31 770.72 310.53C774.76 320.09 776.81 330.23 776.81 340.67C776.81 351.11 774.76 361.25 770.72 370.81C766.82 380.03 761.24 388.31 754.14 395.41C747.04 402.51 738.76 408.09 729.54 411.99C719.98 416.03 709.84 418.08 699.4 418.08ZM699.4 303.45C678.88 303.45 662.19 320.14 662.19 340.66C662.19 361.18 678.88 377.87 699.4 377.87C719.92 377.87 736.61 361.18 736.61 340.66C736.61 320.14 719.92 303.45 699.4 303.45Z","M863.81 265V265.1C843.7 265.1 824.74 273 810.4 287.33C796.2 301.53 788.33 320.27 788.18 340.16H788.17V416.51H826.54V340.74C826.54 330.89 830.44 321.55 837.53 314.46C844.62 307.37 853.95 303.47 863.81 303.47V303.37H881.59V265H863.81Z","M946.08 378.1C939.04 378.1 933.09 372.15 933.09 365.11V303.47H946.08V303.42C969.9 303.42 989.98 287.12 995.76 265.09H933.06V226.36C911.51 232.02 895.46 251.36 894.77 274.49H894.71V365.11C894.71 393.43 917.75 416.47 946.07 416.47C946.37 416.47 946.66 416.5 946.96 416.52L995.78 416.37C990.03 394.29 969.92 378.1 946.07 378.1","M1088.09 378.19V378.14H1062.18C1052.33 378.14 1042.99 374.23 1035.9 367.14C1033.73 364.97 1031.86 362.59 1030.31 360.05H1090.35C1116.5 360.05 1137.77 338.78 1137.77 312.63C1137.77 286.48 1116.5 265.21 1090.35 265.21V265.17H1061.36V265.24C1041.56 265.45 1022.91 273.31 1008.77 287.45C994.43 301.79 986.54 320.76 986.54 340.86C986.54 360.96 994.44 379.93 1008.77 394.27C1022.32 407.83 1040.02 415.61 1058.9 416.42V416.5H1088.08H1137.76C1131.97 394.47 1111.9 378.17 1088.08 378.17M1035.91 314.6C1043 307.51 1052.33 303.61 1062.19 303.61V303.56H1090.36V303.6C1095.26 303.6 1099.4 307.74 1099.4 312.64C1099.4 317.54 1095.26 321.68 1090.36 321.68H1030.32C1031.87 319.14 1033.74 316.76 1035.91 314.59"]

  override init(frame: CGRect) {
    super.init(frame: frame)
    backgroundColor = BG
    setupLayers()
  }
  required init?(coder: NSCoder) { fatalError() }

  private func setupLayers() {
    let screenW = UIScreen.main.bounds.width
    let screenH = UIScreen.main.bounds.height
    svgW = screenW * 0.85
    svgH = svgW * (viewBoxH / viewBoxW)
    sx = svgW / viewBoxW
    sy = svgH / viewBoxH
    let offsetX = (screenW - svgW) / 2
    let offsetY = (screenH - svgH) / 2

    containerLayer.frame = CGRect(x: offsetX, y: offsetY, width: svgW, height: svgH)
    containerLayer.opacity = 0
    layer.addSublayer(containerLayer)

    var t = CGAffineTransform(scaleX: sx, y: sy)

    let eCorpo = CAShapeLayer()
    eCorpo.path = SVGPathParser.parse(PATH_E_CORPO).copy(using: &t)
    eCorpo.fillColor = UIColor.white.cgColor
    containerLayer.addSublayer(eCorpo)

    let eAcento = CAShapeLayer()
    eAcento.path = SVGPathParser.parse(PATH_E_ACENTO).copy(using: &t)
    eAcento.fillColor = UIColor.white.cgColor
    containerLayer.addSublayer(eAcento)

    let sportesGroup = CALayer()
    sportesGroup.frame = CGRect(x: 0, y: 0, width: svgW, height: svgH)
    for p in SPORTES_PATHS {
      let s = CAShapeLayer()
      s.path = SVGPathParser.parse(p).copy(using: &t)
      s.fillColor = UIColor.white.cgColor
      sportesGroup.addSublayer(s)
    }
    // anchorPoint (0,0) so width shrinks from the RIGHT (like HTML clipRect)
    sportesMaskLayer.anchorPoint = CGPoint(x: 0, y: 0)
    sportesMaskLayer.position = CGPoint(x: 0, y: 0)
    sportesMaskLayer.bounds = CGRect(x: 0, y: 0, width: svgW, height: 248 * sy)
    sportesMaskLayer.backgroundColor = UIColor.white.cgColor
    sportesGroup.mask = sportesMaskLayer
    containerLayer.addSublayer(sportesGroup)

    let daSorteGroup = CALayer()
    daSorteGroup.frame = CGRect(x: 0, y: 0, width: svgW, height: svgH)
    for p in DA_SORTE_PATHS {
      let s = CAShapeLayer()
      s.path = SVGPathParser.parse(p).copy(using: &t)
      s.fillColor = UIColor.white.cgColor
      daSorteGroup.addSublayer(s)
    }
    // anchorPoint (0,0) so width shrinks from the RIGHT
    daSorteMaskLayer.anchorPoint = CGPoint(x: 0, y: 0)
    daSorteMaskLayer.position = CGPoint(x: 0, y: 226 * sy)
    daSorteMaskLayer.bounds = CGRect(x: 0, y: 0, width: svgW, height: 193 * sy)
    daSorteMaskLayer.backgroundColor = UIColor.white.cgColor
    daSorteGroup.mask = daSorteMaskLayer
    containerLayer.addSublayer(daSorteGroup)
  }

  func startAnimation() {
    let p1: TimeInterval = 0.288
    let p2: TimeInterval = 0.576
    let p3: TimeInterval = 0.672
    let p4: TimeInterval = 0.864
    let p5: TimeInterval = 0.576
    let easeOut = CAMediaTimingFunction(controlPoints: 0.16, 1, 0.3, 1)
    let easeIO = CAMediaTimingFunction(controlPoints: 0.65, 0, 0.35, 1)

    CATransaction.begin()
    CATransaction.setDisableActions(true)
    containerLayer.opacity = 1
    CATransaction.commit()

    let enter = CABasicAnimation(keyPath: "transform.translation.x")
    enter.fromValue = 250; enter.toValue = 0
    enter.duration = p1; enter.timingFunction = easeOut
    enter.fillMode = .forwards; enter.isRemovedOnCompletion = false
    containerLayer.add(enter, forKey: "enter")

    let fade = CABasicAnimation(keyPath: "opacity")
    fade.fromValue = 0; fade.toValue = 1
    fade.duration = p1; fade.timingFunction = easeOut
    fade.fillMode = .forwards; fade.isRemovedOnCompletion = false
    containerLayer.add(fade, forKey: "fade")

    DispatchQueue.main.asyncAfter(deadline: .now() + p1 + p2) { [weak self] in
      guard let self = self else { return }
      let a = CABasicAnimation(keyPath: "bounds.size.width")
      a.fromValue = self.svgW; a.toValue = 0
      a.duration = p3; a.timingFunction = easeIO
      a.fillMode = .forwards; a.isRemovedOnCompletion = false
      self.daSorteMaskLayer.add(a, forKey: "clip")
    }

    DispatchQueue.main.asyncAfter(deadline: .now() + p1 + p2 + p3) { [weak self] in
      guard let self = self else { return }
      let a = CABasicAnimation(keyPath: "bounds.size.width")
      a.fromValue = self.svgW; a.toValue = 0
      a.duration = p4; a.timingFunction = easeIO
      a.fillMode = .forwards; a.isRemovedOnCompletion = false
      self.sportesMaskLayer.add(a, forKey: "clip")
    }

    DispatchQueue.main.asyncAfter(deadline: .now() + p1 + p2 + p3 + p4) { [weak self] in
      guard let self = self else { return }
      // HTML: translateX(137px) translateY(32px) on a 340px-wide SVG
      // Scale from HTML display size to our display size
      let displayScale = self.svgW / 340
      let a = CABasicAnimation(keyPath: "transform")
      a.toValue = NSValue(caTransform3D: CATransform3DMakeTranslation(137 * displayScale, 32 * displayScale, 0))
      a.duration = p5; a.timingFunction = easeIO
      a.fillMode = .forwards; a.isRemovedOnCompletion = false
      self.containerLayer.add(a, forKey: "move")
    }

    // Auto-hide after animation completes (fallback if JS can't call hide)
    let total = p1 + p2 + p3 + p4 + p5 + 0.3
    DispatchQueue.main.asyncAfter(deadline: .now() + total) { [weak self] in
      self?.hide(animated: true)
    }
  }

  func hide(animated: Bool = true) {
    if animated {
      UIView.animate(withDuration: 0.15, animations: { self.alpha = 0 }) { _ in
        self.removeFromSuperview()
        NativeSplashView.shared = nil
      }
    } else {
      removeFromSuperview()
      NativeSplashView.shared = nil
    }
  }

  static func show(in window: UIWindow) {
    let v = NativeSplashView(frame: window.bounds)
    v.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    window.addSubview(v)
    shared = v
    animationStartTime = Date().timeIntervalSince1970 * 1000
    v.startAnimation()
  }
}
