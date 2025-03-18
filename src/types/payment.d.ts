
interface Window {
  FlutterwaveCheckout?: (config: any) => void;
  MonnifySDK?: {
    initialize: (config: any) => void;
    openIframe: () => void;
  };
  PaystackPop?: {
    setup: (config: any) => {
      openIframe: () => void;
    };
  };
}

interface VTPassService {
  id: string;
  serviceID: string;
  name: string;
  icon: React.ElementType;
  colorClass: string;
  variations?: any[];
  description?: string;
}

interface ServiceVariation {
  variation_code: string;
  name: string;
  amount: number;
  validity?: string;
  description?: string;
}
