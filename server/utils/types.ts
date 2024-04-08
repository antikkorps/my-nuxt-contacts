export interface Contact {
  [key: string]: string | boolean | string[];
  id: string;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mobile: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  twitter: string;
  github: string;
  jobTitle: string;
  company: string;
  notes: string;
  userId: string[];
  isFavorite: boolean;
}

export interface DeleteEvent {
  success: boolean;
  message: string;
  id: string;
}

export interface Button {
  id: string;
  isActive: boolean;
  svgPath: string;
  href: string;
}

export interface SocialFields {
  [key: string]: boolean;
  linkedin: boolean;
  facebook: boolean;
  instagram: boolean;
  twitter: boolean;
  github: boolean;
}

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: string;
}

export interface UserRegistration {
  email: string;
  password: string;
}
