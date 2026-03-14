import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface WaitlistContextType {
  isOpen: boolean;
  preselectedTier: string | null;
  openWaitlist: (tier?: string) => void;
  closeWaitlist: () => void;
}

const WaitlistContext = createContext<WaitlistContextType>({
  isOpen: false,
  preselectedTier: null,
  openWaitlist: () => {},
  closeWaitlist: () => {},
});

export const WaitlistProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedTier, setPreselectedTier] = useState<string | null>(null);

  const openWaitlist = useCallback((tier?: string) => {
    setPreselectedTier(tier || null);
    setIsOpen(true);
  }, []);

  const closeWaitlist = useCallback(() => {
    setIsOpen(false);
    setPreselectedTier(null);
  }, []);

  return (
    <WaitlistContext.Provider value={{ isOpen, preselectedTier, openWaitlist, closeWaitlist }}>
      {children}
    </WaitlistContext.Provider>
  );
};

export const useWaitlist = () => useContext(WaitlistContext);
