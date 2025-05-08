
export interface Lawyer {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  state: string;
  description: string | null;
  created_at?: string | null;
}

export interface Client {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  state: string;
  description: string | null;
  created_at?: string | null;
}

export interface Profile extends Lawyer, Client {
  // Common interface that can be used for both lawyer and client
}
