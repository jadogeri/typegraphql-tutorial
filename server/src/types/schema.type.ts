export type PaymentMethod = 
    'Credit Card' | 'PayPal' | 'Bank Transfer' | 'Cryptocurrency' | 
    'Mobile Payment' | 'Gift Card' | 'Cash on Delivery' | 'Digital Wallet'|'Direct Debit';
export type PaymentStatus = 
    'Pending' | 'Paid' | 'Failed' | 'Refunded' | 'Chargeback' | 
    'Partially Refunded' | 'Authorized' | 'Voided';