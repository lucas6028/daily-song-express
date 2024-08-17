export interface DashboardProps {
  code: string;
}

export interface RequestAccessProps {
  urlCode: string | null;
  onTokenReceived: (expiresIn: number) => void;
}
