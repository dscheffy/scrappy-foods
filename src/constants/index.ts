import { AuthInfo, UserDetail } from "../types";

export const ANONYMOUS: AuthInfo = {
  uid: "anonymous", displayName: "Anonymous", photoURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABuElEQVRoge2Wva4BQRTHvcC2KrXCE3gHUfIAm+hVOpVQSEQj0QiloKIQWgpRKBAUPjaUvgsfybL+t9jc5I51I2JnZyeZSU6y2cyc8/vtnNmMw+EA+A7mAEKANYAQYA0gBFgDCAHWAELA3ITpNDAaAdstcDgAx6P+PJkAmYyNBeJx4HTC23E+A8mkzQRqtffgz6PVsolANPoacLkESiWgWATm89dz8nnGApIE7HYklKYBsZhxbiQC3G7kXFUFvF6GApEICfR46Gfhv/myDNzvZu/CF4urVRJmtXq/ptMh15TLDAWGw89hUikbCcgyUCgAjQbQ7wPB4Ps1lYqNBD4NlwvY70mBbJYTAUkCFgsS/noFPB4OBJxOQFFgGLmcGfktaJvNxgjf7ZpVgzL8c88DwHhsZh2KArOZEb7dNrsOJfhEwgjfbNKoZdHX7/Vo7TSFpE4n2fuaBvj9HAlIEimwXuvvuBEIBMhb53RKC55iCw0GOriiAPU6ZwLWBqXEsgyEw3qEQpwJ+Hz6n+d3qKoZlzaLBf4e4tMJcLs5FrhcOBfgbgesDeYAQoA1gBBgDSAEWAMIAdYA38UP3T0/bOMPPioAAAAASUVORK5CYII="
}
export const EMPTY_USER_DETAIL: UserDetail = {
  history: [],
  templates: {}
}