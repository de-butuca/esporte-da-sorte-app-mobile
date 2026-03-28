import UIKit

struct SVGPathParser {
  static func parse(_ d: String) -> CGPath {
    let path = CGMutablePath()
    let scanner = Scanner(string: d)
    scanner.charactersToBeSkipped = CharacterSet.whitespaces.union(.init(charactersIn: ","))

    var currentPoint = CGPoint.zero
    var lastCommand: Character = "M"
    var lastControlPoint: CGPoint? = nil

    func scanNumber() -> CGFloat? {
      scanner.charactersToBeSkipped = CharacterSet.whitespaces.union(.init(charactersIn: ","))
      if let value = scanner.scanDouble() {
        return CGFloat(value)
      }
      return nil
    }

    func scanPoint() -> CGPoint? {
      guard let x = scanNumber(), let y = scanNumber() else { return nil }
      return CGPoint(x: x, y: y)
    }

    while !scanner.isAtEnd {
      var command: Character = lastCommand

      let savedIndex = scanner.currentIndex
      if let ch = scanner.scanCharacter() {
        if "MmLlCcSsQqTtAaHhVvZz".contains(ch) {
          command = ch
        } else {
          scanner.currentIndex = savedIndex
          command = lastCommand
          if command == "M" { command = "L" }
          if command == "m" { command = "l" }
        }
      }

      switch command {
      case "M":
        if let p = scanPoint() {
          path.move(to: p)
          currentPoint = p
        }
        lastCommand = "M"

      case "m":
        if let p = scanPoint() {
          let abs = CGPoint(x: currentPoint.x + p.x, y: currentPoint.y + p.y)
          path.move(to: abs)
          currentPoint = abs
        }
        lastCommand = "m"

      case "L":
        if let p = scanPoint() {
          path.addLine(to: p)
          currentPoint = p
        }
        lastCommand = "L"

      case "l":
        if let p = scanPoint() {
          let abs = CGPoint(x: currentPoint.x + p.x, y: currentPoint.y + p.y)
          path.addLine(to: abs)
          currentPoint = abs
        }
        lastCommand = "l"

      case "H":
        if let x = scanNumber() {
          let p = CGPoint(x: x, y: currentPoint.y)
          path.addLine(to: p)
          currentPoint = p
        }
        lastCommand = "H"

      case "h":
        if let dx = scanNumber() {
          let p = CGPoint(x: currentPoint.x + dx, y: currentPoint.y)
          path.addLine(to: p)
          currentPoint = p
        }
        lastCommand = "h"

      case "V":
        if let y = scanNumber() {
          let p = CGPoint(x: currentPoint.x, y: y)
          path.addLine(to: p)
          currentPoint = p
        }
        lastCommand = "V"

      case "v":
        if let dy = scanNumber() {
          let p = CGPoint(x: currentPoint.x, y: currentPoint.y + dy)
          path.addLine(to: p)
          currentPoint = p
        }
        lastCommand = "v"

      case "C":
        if let c1 = scanPoint(), let c2 = scanPoint(), let end = scanPoint() {
          path.addCurve(to: end, control1: c1, control2: c2)
          lastControlPoint = c2
          currentPoint = end
        }
        lastCommand = "C"

      case "c":
        if let c1 = scanPoint(), let c2 = scanPoint(), let end = scanPoint() {
          let absC1 = CGPoint(x: currentPoint.x + c1.x, y: currentPoint.y + c1.y)
          let absC2 = CGPoint(x: currentPoint.x + c2.x, y: currentPoint.y + c2.y)
          let absEnd = CGPoint(x: currentPoint.x + end.x, y: currentPoint.y + end.y)
          path.addCurve(to: absEnd, control1: absC1, control2: absC2)
          lastControlPoint = absC2
          currentPoint = absEnd
        }
        lastCommand = "c"

      case "S":
        if let c2 = scanPoint(), let end = scanPoint() {
          let c1: CGPoint
          if let lcp = lastControlPoint, "CcSs".contains(lastCommand) {
            c1 = CGPoint(x: 2 * currentPoint.x - lcp.x, y: 2 * currentPoint.y - lcp.y)
          } else {
            c1 = currentPoint
          }
          path.addCurve(to: end, control1: c1, control2: c2)
          lastControlPoint = c2
          currentPoint = end
        }
        lastCommand = "S"

      case "s":
        if let c2 = scanPoint(), let end = scanPoint() {
          let c1: CGPoint
          if let lcp = lastControlPoint, "CcSs".contains(lastCommand) {
            c1 = CGPoint(x: 2 * currentPoint.x - lcp.x, y: 2 * currentPoint.y - lcp.y)
          } else {
            c1 = currentPoint
          }
          let absC2 = CGPoint(x: currentPoint.x + c2.x, y: currentPoint.y + c2.y)
          let absEnd = CGPoint(x: currentPoint.x + end.x, y: currentPoint.y + end.y)
          path.addCurve(to: absEnd, control1: c1, control2: absC2)
          lastControlPoint = absC2
          currentPoint = absEnd
        }
        lastCommand = "s"

      case "Q":
        if let c = scanPoint(), let end = scanPoint() {
          path.addQuadCurve(to: end, control: c)
          lastControlPoint = c
          currentPoint = end
        }
        lastCommand = "Q"

      case "q":
        if let c = scanPoint(), let end = scanPoint() {
          let absC = CGPoint(x: currentPoint.x + c.x, y: currentPoint.y + c.y)
          let absEnd = CGPoint(x: currentPoint.x + end.x, y: currentPoint.y + end.y)
          path.addQuadCurve(to: absEnd, control: absC)
          lastControlPoint = absC
          currentPoint = absEnd
        }
        lastCommand = "q"

      case "T":
        if let end = scanPoint() {
          let c: CGPoint
          if let lcp = lastControlPoint, "QqTt".contains(lastCommand) {
            c = CGPoint(x: 2 * currentPoint.x - lcp.x, y: 2 * currentPoint.y - lcp.y)
          } else {
            c = currentPoint
          }
          path.addQuadCurve(to: end, control: c)
          lastControlPoint = c
          currentPoint = end
        }
        lastCommand = "T"

      case "t":
        if let end = scanPoint() {
          let c: CGPoint
          if let lcp = lastControlPoint, "QqTt".contains(lastCommand) {
            c = CGPoint(x: 2 * currentPoint.x - lcp.x, y: 2 * currentPoint.y - lcp.y)
          } else {
            c = currentPoint
          }
          let absEnd = CGPoint(x: currentPoint.x + end.x, y: currentPoint.y + end.y)
          path.addQuadCurve(to: absEnd, control: c)
          lastControlPoint = c
          currentPoint = absEnd
        }
        lastCommand = "t"

      case "Z", "z":
        path.closeSubpath()
        lastCommand = command

      default:
        break
      }
    }

    return path
  }
}
