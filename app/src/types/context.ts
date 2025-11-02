
export type NavContextType =  {
  goTo: (path: string) => void;
  goHome: () => void;
  goBack: () => void;
  getQuery: (key: string) => any;
  setQuery: (body: object) => void;
};
