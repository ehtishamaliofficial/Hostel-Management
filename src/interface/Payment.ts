interface Payment {
  id: number;
  kharchaId: number;
  kharchaTitle: string;
  kharchaDescription: string;
  kharchaDate: string;
  amount: number;
  payerId: number;
  payerName: string;
  payerEmail: string;
  payerPhoneNumber: string;
  quantity: number;
  status: string;
  paidAt: string;
  createdAt: string;
  updatedAt: string;
  createdById: number;
  createdByName: string;
  createdByPhoneNumber: string;
  updatedById: number;
  updatedByName: string;
  updatedByPhoneNumber: string;
}

interface PendingPayment {
  id: number;
  firstName: string;
  lastName: string;
  totalAmount: number;
  karchas: Payment[];
}
