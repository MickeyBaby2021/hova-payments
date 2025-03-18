
import { toast } from "sonner";

// Live API keys for production use
const MONNIFY_API_KEY = "MK_PROD_YC67K7T2R3";
const MONNIFY_SECRET_KEY = "GCGJDSYTMW30ELELCPEUUZLLTYMT8QAZ";
const MONNIFY_CONTRACT_CODE = "4934121693";

const PAYSTACK_PUBLIC_KEY = "pk_live_fb6223108ec36214d45f11b2dc7e1fc483cb6014";
const PAYSTACK_SECRET_KEY = "sk_live_369866fc9f00f9df3b31f31bf9c7f8b518ac0779";

const VTPASS_PUBLIC_KEY = "PK_11668ef461c7ceb02a36b82b625db967c359a025d6c";
const VTPASS_SECRET_KEY = "SK_123e0d7e681a947ea1f9af3c5723ef55df3ec67d18e";

// VTPass API endpoints
const VTPASS_BASE_URL = "https://vtpass.com/api"; // Live API endpoint

// Customer Verification for services
export const verifyCustomer = async (serviceID: string, billersCode: string, type: string = "prepaid") => {
  try {
    console.log(`Verifying customer: ${billersCode} for service: ${serviceID}, type: ${type}`);
    
    // This would call the VTPass API in a real implementation
    // Using the live keys now
    // const response = await fetch(`${VTPASS_BASE_URL}/merchant-verify`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'api-key': VTPASS_PUBLIC_KEY,
    //     'secret-key': VTPASS_SECRET_KEY
    //   },
    //   body: JSON.stringify({
    //     serviceID,
    //     billersCode,
    //     type
    //   })
    // });
    // const data = await response.json();
    
    // Simulate API call to verify customer
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response
    const customer = {
      name: "John Doe",
      address: "123 Main Street, Lagos, Nigeria",
      accountNumber: billersCode
    };
    
    return {
      success: true,
      customer
    };
  } catch (error) {
    console.error("Error verifying customer:", error);
    throw error;
  }
};

export const fetchServiceVariations = async (serviceID: string) => {
  try {
    console.log(`Fetching variations for service: ${serviceID}`);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data
    const variations: any[] = [];
    
    switch (serviceID) {
      case "mtn-data":
        variations.push(
          { variation_code: "mtn-data-1", name: "500MB - 1 Day", amount: 100, validity: "1 Day" },
          { variation_code: "mtn-data-2", name: "1GB - 1 Day", amount: 300, validity: "1 Day" },
          { variation_code: "mtn-data-3", name: "1GB - 7 Days", amount: 500, validity: "7 Days" },
          { variation_code: "mtn-data-4", name: "2GB - 30 Days", amount: 1000, validity: "30 Days" },
          { variation_code: "mtn-data-5", name: "5GB - 30 Days", amount: 2000, validity: "30 Days" },
          { variation_code: "mtn-data-6", name: "10GB - 30 Days", amount: 3000, validity: "30 Days" }
        );
        break;
      case "airtel-data":
        variations.push(
          { variation_code: "airtel-data-1", name: "500MB - 1 Day", amount: 100, validity: "1 Day" },
          { variation_code: "airtel-data-2", name: "1.5GB - 7 Days", amount: 500, validity: "7 Days" },
          { variation_code: "airtel-data-3", name: "3GB - 30 Days", amount: 1000, validity: "30 Days" },
          { variation_code: "airtel-data-4", name: "8GB - 30 Days", amount: 2000, validity: "30 Days" },
          { variation_code: "airtel-data-5", name: "15GB - 30 Days", amount: 3000, validity: "30 Days" }
        );
        break;
      case "glo-data":
        variations.push(
          { variation_code: "glo-data-1", name: "1GB - 1 Day", amount: 100, validity: "1 Day" },
          { variation_code: "glo-data-2", name: "2GB - 7 Days", amount: 500, validity: "7 Days" },
          { variation_code: "glo-data-3", name: "4.5GB - 30 Days", amount: 1000, validity: "30 Days" },
          { variation_code: "glo-data-4", name: "10GB - 30 Days", amount: 2000, validity: "30 Days" },
          { variation_code: "glo-data-5", name: "20GB - 30 Days", amount: 3000, validity: "30 Days" }
        );
        break;
      case "9mobile-data":
        variations.push(
          { variation_code: "9mobile-data-1", name: "500MB - 1 Day", amount: 100, validity: "1 Day" },
          { variation_code: "9mobile-data-2", name: "1GB - 7 Days", amount: 500, validity: "7 Days" },
          { variation_code: "9mobile-data-3", name: "2.5GB - 30 Days", amount: 1000, validity: "30 Days" },
          { variation_code: "9mobile-data-4", name: "7GB - 30 Days", amount: 2000, validity: "30 Days" },
          { variation_code: "9mobile-data-5", name: "15GB - 30 Days", amount: 3000, validity: "30 Days" }
        );
        break;
    }
    
    return variations;
  } catch (error) {
    console.error("Error fetching service variations:", error);
    throw error;
  }
};

export const payBill = async (payload: any) => {
  try {
    console.log("Processing bill payment:", payload);
    
    // When connected to backend, this would call the VTPass API
    // Using the live keys now
    // const response = await fetch(`${VTPASS_BASE_URL}/pay`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'api-key': VTPASS_PUBLIC_KEY,
    //     'secret-key': VTPASS_SECRET_KEY
    //   },
    //   body: JSON.stringify({
    //     request_id: `REQ${Date.now()}`,
    //     ...payload
    //   })
    // });
    // const data = await response.json();
    // return data.code === "000";
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return true;
  } catch (error) {
    console.error("Error processing bill payment:", error);
    throw error;
  }
};

// Payment handling functions for wallet funding
export const initiatePaystackPayment = async (paymentDetails: {
  email: string;
  amount: number;
  name: string;
  phone: string;
}): Promise<number | null> => {
  try {
    console.log("Initiating Paystack payment:", paymentDetails);
    const result = await fundWalletWithPaystack(paymentDetails.amount, paymentDetails.email);
    
    if (result) {
      return paymentDetails.amount;
    }
    return null;
  } catch (error) {
    console.error("Error initiating Paystack payment:", error);
    throw error;
  }
};

export const initiateMonnifyPayment = async (paymentDetails: {
  email: string;
  amount: number;
  name: string;
  phone: string;
}): Promise<number | null> => {
  try {
    console.log("Initiating Monnify payment:", paymentDetails);
    const result = await fundWalletWithMonnify(paymentDetails.amount, paymentDetails.email);
    
    if (result) {
      return paymentDetails.amount;
    }
    return null;
  } catch (error) {
    console.error("Error initiating Monnify payment:", error);
    throw error;
  }
};

export const fundWalletWithMonnify = (amount: number, email: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined") {
      try {
        const loadMonnifySDK = () => {
          const script = document.createElement('script');
          script.id = 'monnify-script';
          script.src = 'https://sdk.monnify.com/plugin/monnify.js';
          script.async = true;
          document.body.appendChild(script);
          
          script.onload = () => {
            // Additional delay to ensure SDK is fully loaded
            setTimeout(() => initializeMonnifyPayment(amount, email, resolve, reject), 1000);
          };
          
          script.onerror = () => {
            toast.error("Failed to load payment provider");
            reject(new Error("Failed to load script"));
          };
        };
        
        const initializeMonnifyPayment = (amount: number, email: string, resolve: (value: boolean) => void, reject: (reason?: any) => void) => {
          if (!window.MonnifySDK) {
            toast.error("Payment SDK failed to load");
            reject(new Error("SDK not available"));
            return;
          }
          
          const paymentReference = `HOVAPAY_${Date.now()}`;
          
          try {
            window.MonnifySDK.initialize({
              amount,
              currency: "NGN",
              reference: paymentReference,
              customerName: "HovaPay User",
              customerEmail: email,
              apiKey: MONNIFY_API_KEY,
              contractCode: MONNIFY_CONTRACT_CODE,
              paymentDescription: "Wallet Funding",
              isTestMode: false, // Set to false for production
              onComplete: (response: any) => {
                // Handle successful payment
                if (response.status === "SUCCESS") {
                  toast.success("Wallet funded successfully!");
                  resolve(true);
                } else {
                  toast.error("Payment was not successful");
                  resolve(false);
                }
              },
              onClose: () => {
                toast.info("Payment cancelled");
                resolve(false);
              }
            });
            
            window.MonnifySDK.openIframe();
          } catch (error) {
            console.error("Error during Monnify initialization:", error);
            toast.error("Failed to initialize payment");
            reject(error);
          }
        };
        
        // Check if script already exists
        if (document.getElementById('monnify-script')) {
          if (window.MonnifySDK) {
            initializeMonnifyPayment(amount, email, resolve, reject);
          } else {
            // Wait for script to load
            const checkInterval = setInterval(() => {
              if (window.MonnifySDK) {
                clearInterval(checkInterval);
                initializeMonnifyPayment(amount, email, resolve, reject);
              }
            }, 500);
            
            // Set timeout to prevent infinite waiting
            setTimeout(() => {
              clearInterval(checkInterval);
              if (!window.MonnifySDK) {
                toast.error("Payment provider timed out");
                reject(new Error("SDK load timeout"));
              }
            }, 10000);
          }
        } else {
          // Load script
          loadMonnifySDK();
        }
      } catch (error) {
        console.error("Error in fundWalletWithMonnify:", error);
        toast.error("Payment initialization failed");
        reject(error);
      }
    } else {
      reject(new Error("Window is not defined"));
    }
  });
};

export const fundWalletWithPaystack = (amount: number, email: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined") {
      try {
        // Check if script already exists
        if (document.getElementById('paystack-script')) {
          if (window.PaystackPop) {
            initializePaystackPayment(amount, email, resolve, reject);
          } else {
            // Script exists but PaystackPop not loaded yet
            const checkInterval = setInterval(() => {
              if (window.PaystackPop) {
                clearInterval(checkInterval);
                initializePaystackPayment(amount, email, resolve, reject);
              }
            }, 500);
            
            // Set timeout to prevent infinite waiting
            setTimeout(() => {
              clearInterval(checkInterval);
              if (!window.PaystackPop) {
                toast.error("Payment provider timed out");
                reject(new Error("SDK load timeout"));
              }
            }, 10000);
          }
        } else {
          // Add the script dynamically
          const script = document.createElement('script');
          script.id = 'paystack-script';
          script.src = 'https://js.paystack.co/v1/inline.js';
          script.async = true;
          
          script.onload = () => {
            setTimeout(() => initializePaystackPayment(amount, email, resolve, reject), 500);
          };
          
          script.onerror = () => {
            toast.error('Failed to load payment provider');
            reject(new Error('Failed to load Paystack script'));
          };
          
          document.body.appendChild(script);
        }
      } catch (error) {
        console.error('Error in fundWalletWithPaystack:', error);
        toast.error('Payment initialization failed');
        reject(error);
      }
    } else {
      reject(new Error('Window is not defined'));
    }
  });
};

function initializePaystackPayment(amount: number, email: string, resolve: (value: boolean) => void, reject: (reason?: any) => void) {
  try {
    if (!window.PaystackPop) {
      toast.error("Payment provider failed to load");
      reject(new Error("PaystackPop not available"));
      return;
    }
    
    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: email,
      amount: amount * 100, // Paystack uses amount in kobo (multiply by 100)
      currency: 'NGN',
      ref: `HOVAPAY_PS_${Date.now()}`,
      callback: function(response: any) {
        console.log('Paystack response:', response);
        if (response.status === 'success') {
          toast.success('Payment successful!');
          resolve(true);
        } else {
          toast.error('Payment failed');
          resolve(false);
        }
      },
      onClose: function() {
        toast.info('Payment window closed');
        resolve(false);
      }
    });
    handler.openIframe();
  } catch (error) {
    console.error('Error initializing Paystack:', error);
    toast.error('Failed to initialize payment');
    reject(error);
  }
}
