/* eslint-disable camelcase */
export type FunctionTab = { (data: Project | Association): boolean }[];

export type PiggyBank = {
  id: string
  amount: number
  userId: string
  updatedAt: Date
  createdAt: Date
};

export type Pot = {
  id: string
  amount: number
  name: string
  description: string
  projectId: string | null
  associationId: string | null
  updatedAt: Date
  createdAt: Date
};



export type Transaction = {
  id: string
  userId: string
  transactionId: string
  amount: number
  roundAmount: number
  initialAmount: number
  currency: string
  processed: boolean
  service: string
  updatedAt: Date
  createdAt: Date
  type?: string
};

export type Bank = {
  bic: string,
  countries: string[]
  id: string,
  logo: string,
  name: string
  transaction_total_days: number
};

export type LinkedBank = {
  accountId: string,
  createdAt: Date,
  iban: string,
  id: string,
  institution: string,
  requisitionId: string,
  status: string,
  updatedAt: Date,
  userId: string,
  name?: string,
};
