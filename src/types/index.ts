export interface Upload {
  thumbnail: string;
  id: string;
}
export interface AuthInfo {
  displayName: string | null;
  photoURL: string | null;
  uid: string;
}
export interface User {
  auth: AuthInfo;
  history: Activity[];
}
export interface Activity {
  type: string;
  notes: string;
  timestamp: number;
  image?: Upload;
}