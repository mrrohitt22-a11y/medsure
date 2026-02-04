import React from 'react';

export enum UserRole {
  PATIENT = 'patient',
  PHARMACIST = 'pharmacist',
  ADMIN = 'admin'
}

export interface Medicine {
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  oldPrice?: number;
  unit: string;
  requiresPrescription: boolean;
  category: string;
  stock: number;
}

export interface Pharmacy {
  id: string;
  name: string;
  rating: number;
  distance: string;
  isOpen: boolean;
  isVerified: boolean;
}

export interface Order {
  id: string;
  patientName: string;
  timestamp: string;
  status: 'pending' | 'accepted' | 'packed' | 'delivered' | 'rejected';
  type: 'prescription' | 'regular';
  items: string[];
  total: number;
}

export interface VerificationRequest {
  id: string;
  name: string;
  licenseNo: string;
  city: string;
  status: 'review' | 'verified' | 'rejected';
}

// Fix: Declare iconify-icon in the JSX.IntrinsicElements namespace to satisfy TypeScript's JSX check
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        icon?: string;
        class?: string;
        width?: string | number;
        height?: string | number;
      }, HTMLElement>;
    }
  }
}
