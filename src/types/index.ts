export interface Upload {
  thumbnail: string;
  id: string;
}
export interface AuthInfo {
  displayName: string | null;
  photoURL: string | null;
  uid: string;
}
export interface UserDetail {
  history: Activity[];
  templates: { [key: string]: Template }
}
export interface Activity {
  type: string;
  notes: string;
  timestamp: number;
  image?: Upload;
}
export interface FormInput {
  type: string;
}
export interface Template {
  id: string;
  description?: string;
  previous?: string;
  title: string;
  inputs: FormInput[];
}