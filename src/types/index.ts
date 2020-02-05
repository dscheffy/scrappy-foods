export interface Upload {
  id: string;
}
export interface AuthInfo {
  displayName: string | null;
  photoURL: string | null;
  uid: string;
}
export interface User {
  auth: AuthInfo;
  uploads: Upload[];
}