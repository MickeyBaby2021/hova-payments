
interface MonnifyInstance {
  initialize: (config: MonnifyConfig) => void;
  openIframe: () => void;
}

interface MonnifyConfig {
  amount: number;
  currency: string;
  reference: string;
  customerName: string;
  customerEmail: string;
  apiKey: string;
  contractCode: string;
  paymentDescription: string;
  isTestMode: boolean;
  onComplete: (response: any) => void;
  onClose: () => void;
}

interface PaystackInstance {
  setup: (config: PaystackConfig) => {
    openIframe: () => void;
  };
}

interface PaystackConfig {
  key: string;
  email: string;
  amount: number;
  currency: string;
  ref: string;
  callback: (response: any) => void;
  onClose: () => void;
}

interface Window {
  PaystackPop?: PaystackInstance;
  MonnifySDK?: MonnifyInstance;
}
