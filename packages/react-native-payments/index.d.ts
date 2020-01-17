declare module '@brandingbrand/react-native-payments' {
  export interface PaymentMethodData {
    supportedMethods: string[];
    data: {
      merchantIdentifier: string;
      supportedNetworks: string[];
      countryCode: string;
      currencyCode: string;
    }
  }


  export interface PaymentCurrencyAmount {
    currency: string;
    currencySystem?: string;
    value: string;
  }

  export interface PaymentItem {
    amount: PaymentCurrencyAmount;
    label: string;
    pending?: boolean;
  }

  export interface PaymentShippingOption {
    id: string;
    label: string;
    amount: PaymentCurrencyAmount;
    detail: string;
  }


  export interface PaymentDetailsInit {
    id: string;
    shippingOptions?: PaymentShippingOption[];
    displayItems: PaymentItem[];
    total: PaymentItem;
  }

  export interface PaymentAddress {
    readonly addressLine: string[];
    readonly city: string;
    readonly country: string;
    readonly dependentLocality: string;
    readonly languageCode: string;
    readonly organization: string;
    readonly phone: string;
    readonly postalCode: string;
    readonly recipient: string;
    readonly region: string;
    readonly sortingCode: string;
    toJSON<T = any>(): T;
  }

  export type PaymentShippingType = "shipping" | "delivery" | "pickup";

  export interface PaymentRequestEventMap {
    "shippingaddresschange": PaymentRequestEvent;
    "shippingoptionchange": PaymentRequestEvent;
  }

  export interface PaymentRequestEvent {
    updateWith: (details: PaymentDetailsInit) => void;
  }


  export interface PaymentRequest {
    readonly id: string;
    onshippingaddresschange: ((this: PaymentRequest, ev: PaymentRequestEvent) => any) | null;
    onshippingoptionchange: ((this: PaymentRequest, ev: PaymentRequestEvent) => any) | null;
    readonly shippingAddress: PaymentAddress | null;
    readonly shippingOption: string | null;
    readonly shippingType: PaymentShippingType | null;
    abort(): Promise<void>;
    canMakePayment(): Promise<boolean>;
    show(): Promise<PaymentResponse>;
    addEventListener<K extends keyof PaymentRequestEventMap>(type: K, listener: (this: PaymentRequest, ev: PaymentRequestEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof PaymentRequestEventMap>(type: K, listener: (this: PaymentRequest, ev: PaymentRequestEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
  }

  export declare var PaymentRequest: {
    prototype: PaymentRequest;
    new(methodData: PaymentMethodData[], details: PaymentDetailsInit, options?: PaymentOptions): PaymentRequest;
  };

  export declare var ApplePayButton: {
    new(props: any);
  }
}
