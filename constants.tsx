
import { Medicine, Pharmacy, Order, VerificationRequest } from './types';

export const MOCK_MEDICINES: Medicine[] = [
  { id: '1', name: 'Dolo 650mg', manufacturer: 'Micro Labs Ltd', price: 30.50, oldPrice: 35, unit: 'Strip of 15 tablets', requiresPrescription: true, category: 'Tablets', stock: 100 },
  { id: '2', name: 'Calpol 500mg', manufacturer: 'GSK', price: 15.20, unit: 'Strip of 15 tablets', requiresPrescription: false, category: 'Tablets', stock: 50 },
  { id: '3', name: 'Azithromycin 500', manufacturer: 'Cipla', price: 72.00, oldPrice: 85, unit: 'Strip of 3 tablets', requiresPrescription: true, category: 'Antibiotics', stock: 20 },
  { id: '4', name: 'Pan 40', manufacturer: 'Alkem', price: 110.00, unit: 'Strip of 15 tablets', requiresPrescription: true, category: 'Gastro', stock: 15 },
  { id: '5', name: 'Cough-N-Cold Syrup', manufacturer: 'Vicks', price: 95.00, unit: 'Bottle of 100ml', requiresPrescription: false, category: 'Syrup', stock: 30 },
];

export const MOCK_PHARMACIES: Pharmacy[] = [
  { id: '1', name: 'Apollo Pharmacy', rating: 4.8, distance: '0.8 km', isOpen: true, isVerified: true },
  { id: '2', name: 'MedPlus Express', rating: 4.5, distance: '1.2 km', isOpen: true, isVerified: true },
  { id: '3', name: 'Wellness Forever', rating: 4.2, distance: '2.5 km', isOpen: true, isVerified: true },
];

export const MOCK_ORDERS: Order[] = [
  { id: 'ORD-2839', patientName: 'Anjali Sharma', timestamp: '2 mins ago', status: 'pending', type: 'prescription', items: ['Dolo 650', 'Azithromycin'], total: 102.50 },
  { id: 'ORD-2838', patientName: 'Vikram Singh', timestamp: '15 mins ago', status: 'packed', type: 'regular', items: ['Sanitizer', 'Masks'], total: 450.00 },
  { id: 'ORD-2837', patientName: 'John Doe', timestamp: '1 hour ago', status: 'delivered', type: 'regular', items: ['Calpol 500'], total: 15.20 },
];

export const MOCK_VERIFICATIONS: VerificationRequest[] = [
  { id: '1', name: 'Rajesh Kumar', licenseNo: 'DL-2023-8392', city: 'Mumbai', status: 'review' },
  { id: '2', name: 'Sneha Gupta', licenseNo: 'KA-2023-1122', city: 'Bangalore', status: 'review' },
  { id: '3', name: 'City Meds', licenseNo: 'TN-2023-5543', city: 'Chennai', status: 'rejected' },
];
