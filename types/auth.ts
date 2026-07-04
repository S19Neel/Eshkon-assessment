export interface QuickRole {
  label: string;
  email: string;
  color: string;
}

export interface LoginPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}
