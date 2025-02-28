
import { toast } from "sonner";

// This would be replaced with actual API keys in production
const FLUTTERWAVE_PUBLIC_KEY = "FLUTTERWAVE_PUBLIC_KEY";
const MONNIFY_API_KEY = "MONNIFY_API_KEY";
const MONNIFY_CONTRACT_CODE = "MONNIFY_CONTRACT_CODE";
const VTPASS_API_KEY = "VTPASS_API_KEY";
const VTPASS_SECRET_KEY = "VTPASS_SECRET_KEY";

interface PaymentDetails {
  email: string;
  amount: number;
  name: string;
  phone?: string;
  redirect_url?: string;
  reference?: string;
}

interface BillPaymentDetails {
  serviceID: string;
  variation_code?: string;
  amount: number;
  phone: string;
  billersCode?: string;
  subscription_type?: string;
  quantity?: number;
}

// This type extends Window to include Flutterwave SDK
declare global {
  interface Window {
    FlutterwaveCheckout?: (config: any) => void;
    MonnifySDK?: {
      initialize: (config: any) => void;
      openIframe: () => void;
    };
  }
}

export const initiateFlutterwavePayment = async (details: PaymentDetails): Promise<number | null> => {
  try {
    // Documentation: https://developer.flutterwave.com/docs/collect-payments/standard/
    console.log("Initiating Flutterwave payment with details:", details);
    
    return new Promise((resolve) => {
      // For development, check if FlutterwaveCheckout is available
      if (typeof window.FlutterwaveCheckout !== 'undefined') {
        const paymentConfig = {
          public_key: FLUTTERWAVE_PUBLIC_KEY,
          tx_ref: `hova-${Date.now()}`,
          amount: details.amount,
          currency: "NGN",
          payment_options: "card,banktransfer,ussd",
          customer: {
            email: details.email,
            phone_number: details.phone || "",
            name: details.name,
          },
          customizations: {
            title: "HovaPay",
            description: "Fund your HovaPay wallet",
            logo: "https://example.com/logo.png",
          },
          callback: function(response: any) {
            console.log("Flutterwave payment response:", response);
            if (response.status === "successful") {
              // Verify the transaction with your backend
              toast.success("Payment successful!");
              resolve(details.amount);
            } else {
              toast.error("Payment failed. Please try again.");
              resolve(null);
            }
          },
          onclose: function() {
            toast.info("Payment window closed");
            resolve(null);
          }
        };
        
        // Launch Flutterwave checkout
        window.FlutterwaveCheckout(paymentConfig);
      } else {
        // Injecting the Flutterwave script dynamically
        const script = document.createElement('script');
        script.src = 'https://checkout.flutterwave.com/v3.js';
        document.body.appendChild(script);
        
        script.onload = () => {
          // Once script is loaded, initialize payment
          if (typeof window.FlutterwaveCheckout !== 'undefined') {
            const paymentConfig = {
              public_key: FLUTTERWAVE_PUBLIC_KEY,
              tx_ref: `hova-${Date.now()}`,
              amount: details.amount,
              currency: "NGN",
              payment_options: "card,banktransfer,ussd",
              customer: {
                email: details.email,
                phone_number: details.phone || "",
                name: details.name,
              },
              customizations: {
                title: "HovaPay",
                description: "Fund your HovaPay wallet",
                logo: "https://example.com/logo.png",
              },
              callback: function(response: any) {
                console.log("Flutterwave payment response:", response);
                if (response.status === "successful") {
                  // Verify the transaction with your backend
                  toast.success("Payment successful!");
                  resolve(details.amount);
                } else {
                  toast.error("Payment failed. Please try again.");
                  resolve(null);
                }
              },
              onclose: function() {
                toast.info("Payment window closed");
                resolve(null);
              }
            };
            
            // Launch Flutterwave checkout
            window.FlutterwaveCheckout(paymentConfig);
          } else {
            console.error("Failed to load Flutterwave checkout");
            toast.error("Payment service unavailable. Please try again later.");
            resolve(null);
          }
        };
        
        script.onerror = () => {
          console.error("Failed to load Flutterwave script");
          toast.error("Payment service unavailable. Please try again later.");
          resolve(null);
        };
      }
    });
  } catch (error) {
    console.error("Flutterwave payment error:", error);
    toast.error("Payment failed. Please try again.");
    return null;
  }
};

export const initiateMonnifyPayment = async (details: PaymentDetails): Promise<number | null> => {
  try {
    // Documentation: https://developers.monnify.com/docs/collections/one-time-payment
    console.log("Initiating Monnify payment with details:", details);
    
    return new Promise((resolve) => {
      // For development, check if MonnifySDK is available
      if (typeof window.MonnifySDK !== 'undefined') {
        window.MonnifySDK.initialize({
          amount: details.amount,
          currency: "NGN",
          reference: details.reference || `hova-${Date.now()}`,
          customerName: details.name,
          customerEmail: details.email,
          customerPhoneNumber: details.phone || "",
          apiKey: MONNIFY_API_KEY,
          contractCode: MONNIFY_CONTRACT_CODE,
          paymentDescription: "Fund HovaPay wallet",
          isTestMode: true,
          onComplete: function(response: any) {
            console.log("Monnify payment response:", response);
            if (response.status === "SUCCESS") {
              // Verify the transaction with your backend
              toast.success("Payment successful!");
              resolve(details.amount);
            } else {
              toast.error("Payment failed. Please try again.");
              resolve(null);
            }
          },
          onClose: function() {
            toast.info("Payment window closed");
            resolve(null);
          }
        });
        
        // Open payment modal
        window.MonnifySDK.openIframe();
      } else {
        // Injecting the Monnify script dynamically
        const script = document.createElement('script');
        script.src = 'https://sdk.monnify.com/plugin/monnify.js';
        document.body.appendChild(script);
        
        script.onload = () => {
          // Once script is loaded, initialize payment
          if (typeof window.MonnifySDK !== 'undefined') {
            window.MonnifySDK.initialize({
              amount: details.amount,
              currency: "NGN",
              reference: details.reference || `hova-${Date.now()}`,
              customerName: details.name,
              customerEmail: details.email,
              customerPhoneNumber: details.phone || "",
              apiKey: MONNIFY_API_KEY,
              contractCode: MONNIFY_CONTRACT_CODE,
              paymentDescription: "Fund HovaPay wallet",
              isTestMode: true,
              onComplete: function(response: any) {
                console.log("Monnify payment response:", response);
                if (response.status === "SUCCESS") {
                  // Verify the transaction with your backend
                  toast.success("Payment successful!");
                  resolve(details.amount);
                } else {
                  toast.error("Payment failed. Please try again.");
                  resolve(null);
                }
              },
              onClose: function() {
                toast.info("Payment window closed");
                resolve(null);
              }
            });
            
            // Open payment modal
            window.MonnifySDK.openIframe();
          } else {
            console.error("Failed to load Monnify SDK");
            toast.error("Payment service unavailable. Please try again later.");
            resolve(null);
          }
        };
        
        script.onerror = () => {
          console.error("Failed to load Monnify script");
          toast.error("Payment service unavailable. Please try again later.");
          resolve(null);
        };
      }
    });
  } catch (error) {
    console.error("Monnify payment error:", error);
    toast.error("Payment failed. Please try again.");
    return null;
  }
};

export const payBill = async (details: BillPaymentDetails): Promise<boolean> => {
  try {
    // Documentation: https://www.vtpass.com/documentation/integrating-api/
    console.log("Processing bill payment with details:", details);
    
    // VTPass API call would go here
    // This needs to be implemented on the backend for security reasons
    
    // Simulate API call for now
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate successful payment (90% chance)
        const isSuccessful = Math.random() < 0.9;
        
        if (isSuccessful) {
          toast.success("Payment successful!");
          resolve(true);
        } else {
          toast.error("Payment failed. Please try again.");
          resolve(false);
        }
      }, 2000);
    });
  } catch (error) {
    console.error("VTPass payment error:", error);
    toast.error("Payment failed. Please try again.");
    return false;
  }
};

// For fetching available VTPass service variations (like data plans)
export const fetchServiceVariations = async (serviceID: string): Promise<any[] | null> => {
  try {
    console.log(`Fetching variations for service: ${serviceID}`);
    
    // In a real implementation, this would be a backend API call
    
    // Mock data for development
    const mockVariations: Record<string, any[]> = {
      'mtn-data': [
        { variation_code: 'mtn-10mb-100', name: '100 Naira - 10MB - Daily', amount: 100, validity: '1 day' },
        { variation_code: 'mtn-1gb-500', name: '500 Naira - 1GB - Daily', amount: 500, validity: '1 day' },
        { variation_code: 'mtn-2gb-1000', name: '1000 Naira - 2GB - Weekly', amount: 1000, validity: '7 days' },
        { variation_code: 'mtn-5gb-2000', name: '2000 Naira - 5GB - Monthly', amount: 2000, validity: '30 days' },
      ],
      'airtel-data': [
        { variation_code: 'airtel-100mb-100', name: '100 Naira - 100MB - Daily', amount: 100, validity: '1 day' },
        { variation_code: 'airtel-1gb-500', name: '500 Naira - 1GB - Daily', amount: 500, validity: '1 day' },
        { variation_code: 'airtel-2gb-1000', name: '1000 Naira - 2GB - Weekly', amount: 1000, validity: '7 days' },
        { variation_code: 'airtel-5gb-2000', name: '2000 Naira - 5GB - Monthly', amount: 2000, validity: '30 days' },
      ],
      'glo-data': [
        { variation_code: 'glo-100mb-100', name: '100 Naira - 100MB - Daily', amount: 100, validity: '1 day' },
        { variation_code: 'glo-1gb-500', name: '500 Naira - 1GB - Daily', amount: 500, validity: '1 day' },
        { variation_code: 'glo-2gb-1000', name: '1000 Naira - 2GB - Weekly', amount: 1000, validity: '7 days' },
        { variation_code: 'glo-5gb-2000', name: '2000 Naira - 5GB - Monthly', amount: 2000, validity: '30 days' },
      ],
      '9mobile-data': [
        { variation_code: '9mobile-100mb-100', name: '100 Naira - 100MB - Daily', amount: 100, validity: '1 day' },
        { variation_code: '9mobile-1gb-500', name: '500 Naira - 1GB - Daily', amount: 500, validity: '1 day' },
        { variation_code: '9mobile-2gb-1000', name: '1000 Naira - 2GB - Weekly', amount: 1000, validity: '7 days' },
        { variation_code: '9mobile-5gb-2000', name: '2000 Naira - 5GB - Monthly', amount: 2000, validity: '30 days' },
      ],
      'dstv': [
        { variation_code: 'dstv-padi', name: 'DStv Padi', amount: 2500, validity: '30 days' },
        { variation_code: 'dstv-yanga', name: 'DStv Yanga', amount: 3500, validity: '30 days' },
        { variation_code: 'dstv-confam', name: 'DStv Confam', amount: 6200, validity: '30 days' },
        { variation_code: 'dstv-compact', name: 'DStv Compact', amount: 10500, validity: '30 days' },
        { variation_code: 'dstv-premium', name: 'DStv Premium', amount: 24500, validity: '30 days' },
      ],
      'gotv': [
        { variation_code: 'gotv-lite', name: 'GOtv Lite', amount: 1100, validity: '30 days' },
        { variation_code: 'gotv-jinja', name: 'GOtv Jinja', amount: 2250, validity: '30 days' },
        { variation_code: 'gotv-jolli', name: 'GOtv Jolli', amount: 3300, validity: '30 days' },
        { variation_code: 'gotv-max', name: 'GOtv Max', amount: 4850, validity: '30 days' },
      ],
      'startimes': [
        { variation_code: 'startimes-nova', name: 'StarTimes Nova', amount: 1200, validity: '30 days' },
        { variation_code: 'startimes-basic', name: 'StarTimes Basic', amount: 1850, validity: '30 days' },
        { variation_code: 'startimes-smart', name: 'StarTimes Smart', amount: 2600, validity: '30 days' },
        { variation_code: 'startimes-classic', name: 'StarTimes Classic', amount: 3100, validity: '30 days' },
        { variation_code: 'startimes-super', name: 'StarTimes Super', amount: 5300, validity: '30 days' },
      ],
      'ikeja-electric': [
        { variation_code: 'prepaid', name: 'Prepaid', amount: 0 },
        { variation_code: 'postpaid', name: 'Postpaid', amount: 0 },
      ],
      'eko-electric': [
        { variation_code: 'prepaid', name: 'Prepaid', amount: 0 },
        { variation_code: 'postpaid', name: 'Postpaid', amount: 0 },
      ]
    };
    
    // Return the mock variations for the specified service
    return mockVariations[serviceID] || [];
    
  } catch (error) {
    console.error("Error fetching service variations:", error);
    toast.error("Failed to load service options.");
    return null;
  }
};

// Function to verify customer details (like electricity meter)
export const verifyCustomer = async (
  serviceID: string, 
  billersCode: string, 
  type: string = ""
): Promise<any | null> => {
  try {
    console.log(`Verifying customer: ${serviceID}, ${billersCode}, ${type}`);
    
    // In a real implementation, this would be a backend API call
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock customer data
        const mockCustomers: Record<string, any> = {
          // Electricity customers
          '1234567890': { name: 'John Doe', address: '123 Main St', status: 'active' },
          '0987654321': { name: 'Jane Smith', address: '456 Elm St', status: 'active' },
          
          // Cable TV customers
          '12345678': { name: 'Robert Johnson', status: 'active', bouquet: 'Basic' },
          '87654321': { name: 'Mary Williams', status: 'active', bouquet: 'Premium' },
        };
        
        if (mockCustomers[billersCode]) {
          resolve({
            success: true,
            customer: mockCustomers[billersCode]
          });
        } else {
          resolve({
            success: false,
            message: 'Customer not found'
          });
        }
      }, 1500);
    });
    
  } catch (error) {
    console.error("Error verifying customer:", error);
    toast.error("Failed to verify customer details.");
    return null;
  }
};
