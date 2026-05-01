export type UserRole = 'donor' | 'receiver' | 'transporter' | 'admin'
export type ListingStatus = 'Available' | 'Reserved' | 'Expired' | 'Delivered'
export type NotificationType = 'nearby_listing' | 'reservation_confirmed' | 'delivery_update' | 'verification'
export type DeliveryStatus = 'Assigned' | 'Picked Up' | 'Delivered'

export interface SessionUser {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  rating?: number
}

export interface UserProfile extends SessionUser {
  phone?: string
  organization?: string
  address?: string
  ratingCount?: number
  donationHistory?: DonationHistoryItem[]
}

export interface Listing {
  id: string
  foodType: string
  quantity: number
  unit: string
  distanceKm: number
  expiryAt: string
  createdAt: string
  status: ListingStatus
  image: string
  pickupAddress: string
  expiryNote?: string
  donor: {
    name: string
    role: 'Donor'
    location: string
    rating: number
  }
  coordinates: {
    lat: number
    lng: number
  }
  reservedBy?: string
}

export interface Reservation {
  id: string
  listingId: string
  receiverName: string
  donorName: string
  scheduledFor: string
  status: 'Pending' | 'Confirmed' | 'Completed'
}

export interface PickupAssignment {
  id: string
  listingId: string
  routeInfo: string
  status: DeliveryStatus
  pickupAddress: string
  donorName: string
  receiverName: string
  scheduledFor: string
}

export interface NotificationItem {
  id: string
  type: NotificationType
  title: string
  message: string
  createdAt: string
  read: boolean
}

export interface ReportItem {
  id: string
  subject: string
  category: 'User' | 'Listing' | 'Pickup'
  reason: string
  createdAt: string
  status: 'Open' | 'Resolved'
}

export interface DonationHistoryItem {
  id: string
  title: string
  date: string
  quantity: number
  status: 'Completed' | 'Reserved' | 'Cancelled'
}
