
interface Window {
  FlutterwaveCheckout?: (config: any) => void;
  MonnifySDK?: {
    initialize: (config: any) => void;
    openIframe: () => void;
  };
}
