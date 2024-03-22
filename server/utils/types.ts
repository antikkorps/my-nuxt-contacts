export interface Contact {
  id: string;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedin: String;
  facebook: String;
  instagram: String;
  twitter: String;
  jobTitle: String;
  company: String;
  notes: String;
  userId: string[];
}

export interface DeleteEvent {
  success: boolean;
  message: string;
}
