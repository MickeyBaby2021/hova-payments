
import { toast } from "sonner";

// Live API keys
const FLUTTERWAVE_PUBLIC_KEY = "FLWPUBK-74be39c311f3587fe01840dcddccf343-X";
const FLUTTERWAVE_SECRET_KEY = "FLWSECK-ab617884f87288b06c9412c9c237aff0-195066ecf9avt-X";
const FLUTTERWAVE_ENCRYPTION_KEY = "ab617884f8720b8e974a80dd";

const MONNIFY_API_KEY = "MK_TEST_SAF7HR5F3F"; // Using test key until production ready
const MONNIFY_CONTRACT_CODE = "4934121693";

const VTPASS_API_KEY = "PK_11668ef461c7ceb02a36b82b625db967c359a025d6c";
const VTPASS_SECRET_KEY = "SK_123e0d7e681a947ea1f9af3c5723ef55df3ec67d18e";

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
    console.log("Initiating Flutterwave payment with details:", details);
    
    return new Promise((resolve, reject) => {
      const loadFlutterwaveScript = () => {
        // Remove any existing scripts to prevent conflicts
        const existingScripts = document.querySelectorAll('script[src*="flutterwave"]');
        existingScripts.forEach(script => script.remove());
        
        const script = document.createElement('script');
        script.src = 'https://checkout.flutterwave.com/v3.js';
        script.async = true;
        document.body.appendChild(script);
        
        script.onload = () => {
          if (typeof window.FlutterwaveCheckout !== 'undefined') {
            const paymentConfig = {
              public_key: FLUTTERWAVE_PUBLIC_KEY,
              tx_ref: `hova-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
              amount: details.amount,
              currency: "NGN",
              payment_options: "card,banktransfer,ussd",
              customer: {
                email: details.email || "customer@example.com",
                phone_number: details.phone || "",
                name: details.name || "Customer",
              },
              customizations: {
                title: "HovaPay",
                description: "Fund your HovaPay wallet",
                logo: "https://example.com/logo.png",
              },
              callback: function(response: any) {
                console.log("Flutterwave payment response:", response);
                if (response.status === "successful") {
                  // Verify the transaction with your backend in production
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
            reject(new Error("Failed to load Flutterwave checkout"));
          }
        };
        
        script.onerror = () => {
          console.error("Failed to load Flutterwave script");
          toast.error("Payment service unavailable. Please try again later.");
          reject(new Error("Failed to load Flutterwave script"));
        };
      };
      
      // Always reload the script to avoid initialization issues
      loadFlutterwaveScript();
    });
  } catch (error) {
    console.error("Flutterwave payment error:", error);
    toast.error("Payment failed. Please try again.");
    return null;
  }
};

export const initiateMonnifyPayment = async (details: PaymentDetails): Promise<number | null> => {
  try {
    console.log("Initiating Monnify payment with details:", details);
    
    return new Promise((resolve, reject) => {
      const loadMonnifyScript = () => {
        // Remove any existing Monnify scripts to prevent conflicts
        const existingScripts = document.querySelectorAll('script[src*="monnify.js"]');
        existingScripts.forEach(script => script.remove());
        
        const script = document.createElement('script');
        script.src = 'https://sdk.monnify.com/plugin/monnify.js';
        script.async = true;
        document.body.appendChild(script);
        
        script.onload = () => {
          // Additional delay to ensure SDK is fully loaded
          setTimeout(() => {
            try {
              if (typeof window.MonnifySDK === 'undefined') {
                throw new Error("Monnify SDK not loaded");
              }
              
              const reference = `hova-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
              
              window.MonnifySDK.initialize({
                amount: details.amount,
                currency: "NGN",
                reference: details.reference || reference,
                customerName: details.name || "Customer",
                customerEmail: details.email || "customer@example.com",
                customerPhoneNumber: details.phone || "",
                apiKey: MONNIFY_API_KEY,
                contractCode: MONNIFY_CONTRACT_CODE,
                paymentDescription: "Fund HovaPay wallet",
                isTestMode: true, // Change to false for production
                paymentMethods: ["CARD", "ACCOUNT_TRANSFER"],
                onComplete: function(response: any) {
                  console.log("Monnify payment response:", response);
                  if (response.status === "SUCCESS") {
                    toast.success("Payment successful!");
                    resolve(details.amount);
                  } else {
                    toast.error("Payment failed. Please try again.");
                    resolve(null);
                  }
                },
                onClose: function(data: any) {
                  console.log("Monnify payment closed:", data);
                  toast.info("Payment window closed");
                  resolve(null);
                }
              });
              
              // Give a brief delay to ensure SDK is ready
              setTimeout(() => {
                try {
                  window.MonnifySDK.openIframe();
                } catch (error) {
                  console.error("Error opening Monnify iframe:", error);
                  toast.error("Failed to open payment page. Please try again.");
                  reject(error);
                }
              }, 1000);
            } catch (error) {
              console.error("Error initializing Monnify:", error);
              toast.error("Failed to initialize payment. Please try again.");
              reject(error);
            }
          }, 1500); // Increased delay for SDK initialization
        };
        
        script.onerror = () => {
          console.error("Failed to load Monnify script");
          toast.error("Payment service unavailable. Please try again later.");
          reject(new Error("Failed to load Monnify script"));
        };
      };
      
      // Always reload the script for Monnify to avoid initialization issues
      loadMonnifyScript();
    });
  } catch (error) {
    console.error("Monnify payment error:", error);
    toast.error("Payment failed. Please try again.");
    return null;
  }
};

// VTPass API integration for bill payments
export const payBill = async (details: BillPaymentDetails): Promise<boolean> => {
  try {
    console.log("Processing bill payment with details:", details);
    
    // Create VTPass request body
    const requestBody = {
      serviceID: details.serviceID,
      amount: details.amount,
      phone: details.phone,
      request_id: `${Date.now()}${Math.floor(Math.random() * 10000)}`,
      billersCode: details.billersCode || "",
      variation_code: details.variation_code || "",
      subscription_type: details.subscription_type || "",
      quantity: details.quantity || 1
    };
    
    console.log("VTPass request:", requestBody);
    
    // In real implementation with backend integration, we would make an actual HTTP request
    // to the VTPass API using the provided keys
    // For now, we'll simulate a response - this would be replaced with actual API calls
    
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate payment success (90% success rate)
        const isSuccessful = Math.random() < 0.9;
        
        if (isSuccessful) {
          toast.success(`Payment for ${details.serviceID} successful!`);
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
    
    // In a real implementation with backend integration, this would be a proper API call
    // to the VTPass API using the provided keys
    
    // Mock data for development - would be replaced with actual API responses
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
      ],
      'waec': [
        { variation_code: 'waec-registration', name: 'WAEC Registration', amount: 15000 },
        { variation_code: 'waec-result-checker', name: 'WAEC Result Checker', amount: 1500 },
      ],
      'jamb': [
        { variation_code: 'jamb-registration', name: 'JAMB Registration', amount: 4500 },
        { variation_code: 'jamb-result-checker', name: 'JAMB Result Checker', amount: 1000 },
      ],
      'neco': [
        { variation_code: 'neco-registration', name: 'NECO Registration', amount: 12500 },
        { variation_code: 'neco-result-checker', name: 'NECO Result Checker', amount: 1000 },
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
    
    // In a real implementation with backend integration, this would be a proper API call
    // to the VTPass API using the provided keys
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // This is mock data - would be replaced with actual API responses
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
