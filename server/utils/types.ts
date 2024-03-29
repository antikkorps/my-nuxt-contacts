export interface Contact {
  id: string;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mobile: string;
  linkedin: String;
  facebook: String;
  instagram: String;
  twitter: String;
  jobTitle: String;
  company: String;
  notes: String;
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
