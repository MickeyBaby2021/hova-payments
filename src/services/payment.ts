import { toast } from "sonner";

// API keys - these would be replaced with real production keys
const FLUTTERWAVE_PUBLIC_KEY = "FLWPUBK_TEST-e3905beada5e69c0e68e36f86472e91c-X";
const MONNIFY_API_KEY = "MK_TEST_XQDDR7Y8RB";
const MONNIFY_CONTRACT_CODE = "4934121693";
const VTPASS_API_KEY = "81bd4314130d487a9acef9638b5c4ae9";
const VTPASS_SECRET_KEY = "SK_90b3d84f4b52e0b8ac93f3b654c62a97c06c8420786";
const VTPASS_PUBLIC_KEY = "PK_4acee3030889d4292d173bc642603bfe6c02b988be0";

// VTPass API endpoints
const VTPASS_BASE_URL = "https://sandbox.vtpass.com/api";

// Customer Verification for services
export const verifyCustomer = async (serviceID: string, billersCode: string, type: string = "prepaid") => {
  try {
    console.log(`Verifying customer: ${billersCode} for service: ${serviceID}, type: ${type}`);
    
    // When connected to backend, this would call the VTPass API
    // const response = await fetch(`${VTPASS_BASE_URL}/merchant-verify`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'api-key': VTPASS_API_KEY,
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
    // const response = await fetch(`${VTPASS_BASE_URL}/pay`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'api-key': VTPASS_API_KEY,
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
export const initiateFlutterwavePayment = async (paymentDetails: {
  email: string;
  amount: number;
  name: string;
  phone: string;
}): Promise<number | null> => {
  try {
    console.log("Initiating Flutterwave payment:", paymentDetails);
    const result = await fundWalletWithFlutterwave(paymentDetails.amount, paymentDetails.email);
    
    if (result) {
      return paymentDetails.amount;
    }
    return null;
  } catch (error) {
    console.error("Error initiating Flutterwave payment:", error);
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
        if (typeof window.MonnifySDK === 'undefined') {
          // Check if script is already being loaded
          const existingScript = document.getElementById('monnify-script');
          if (!existingScript) {
            const script = document.createElement('script');
            script.id = 'monnify-script';
            script.src = 'https://sdk.monnify.com/plugin/monnify.js';
            script.async = true;
            document.body.appendChild(script);
            
            script.onload = () => {
              // Additional delay to ensure SDK is fully loaded
              setTimeout(() => {
                try {
                  if (typeof window.MonnifySDK === 'undefined') {
                    toast.error("Payment SDK failed to load");
                    reject(new Error("SDK failed to load"));
                    return;
                  }
                  
                  const paymentReference = `HOVAPAY_${Date.now()}`;
                  
                  // Initialize and open payment modal
                  setTimeout(() => {
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
                        isTestMode: true,
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
                    } catch (error) {
                      console.error("Error during Monnify initialization:", error);
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
              toast.error("Failed to load payment provider");
              reject(new Error("Failed to load script"));
            };
          } else {
            // Script is already loading, wait for it
            const checkSDKInterval = setInterval(() => {
              if (typeof window.MonnifySDK !== 'undefined') {
                clearInterval(checkSDKInterval);
                fundWalletWithMonnify(amount, email)
                  .then(resolve)
                  .catch(reject);
              }
            }, 500);
            
            // Set a timeout to stop checking after 10 seconds
            setTimeout(() => {
              clearInterval(checkSDKInterval);
              if (typeof window.MonnifySDK === 'undefined') {
                toast.error("Payment system timed out");
                reject(new Error("SDK load timeout"));
              }
            }, 10000);
          }
        } else {
          // SDK already loaded, initialize payment directly
          const paymentReference = `HOVAPAY_${Date.now()}`;
          
          window.MonnifySDK.initialize({
            amount,
            currency: "NGN",
            reference: paymentReference,
            customerName: "HovaPay User",
            customerEmail: email,
            apiKey: MONNIFY_API_KEY,
            contractCode: MONNIFY_CONTRACT_CODE,
            paymentDescription: "Wallet Funding",
            isTestMode: true,
            onComplete: (response: any) => {
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

export const fundWalletWithFlutterwave = (amount: number, email: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined") {
      try {
        if (typeof window.FlutterwaveCheckout === 'undefined') {
          const script = document.createElement('script');
          script.src = 'https://checkout.flutterwave.com/v3.js';
          script.async = true;
          document.body.appendChild(script);
          
          script.onload = () => {
            setTimeout(() => {
              try {
                processFlutterwavePayment(amount, email, resolve, reject);
              } catch (error) {
                console.error("Error initializing Flutterwave:", error);
                toast.error("Failed to initialize payment");
                reject(error);
              }
            }, 1000);
          };
          
          script.onerror = () => {
            toast.error("Failed to load payment provider");
            reject(new Error("Failed to load script"));
          };
        } else {
          processFlutterwavePayment(amount, email, resolve, reject);
        }
      } catch (error) {
        console.error("Error in fundWalletWithFlutterwave:", error);
        toast.error("Payment initialization failed");
        reject(error);
      }
    } else {
      reject(new Error("Window is not defined"));
    }
  });
};

const processFlutterwavePayment = (
  amount: number,
  email: string,
  resolve: (value: boolean) => void,
  reject: (reason: any) => void
) => {
  try {
    const txRef = `HOVAPAY_FLW_${Date.now()}`;
    
    window.FlutterwaveCheckout({
      public_key: FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: txRef,
      amount,
      currency: "NGN",
      payment_options: "card, banktransfer, ussd",
      customer: {
        email,
        name: "HovaPay User",
      },
      customizations: {
        title: "HovaPay Wallet Funding",
        description: "Fund your HovaPay wallet",
        logo: "https://cdn.pixabay.com/photo/2021/09/06/01/13/wallet-6600696_1280.png",
      },
      callback: (response: any) => {
        if (response.status === "successful") {
          toast.success("Wallet funded successfully!");
          resolve(true);
        } else {
          toast.error("Payment was not successful");
          resolve(false);
        }
      },
      onclose: () => {
        toast.info("Payment cancelled");
        resolve(false);
      },
    });
  } catch (error) {
    console.error("Error processing Flutterwave payment:", error);
    toast.error("Payment initialization failed");
    reject(error);
  }
};
