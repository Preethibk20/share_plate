export const queryKeys = {
  auth: ['auth'] as const,
  listings: ['listings'] as const,
  nearbyListings: (radius: number) => ['nearby-listings', radius] as const,
  notifications: ['notifications'] as const,
  pickups: ['pickups'] as const,
  profile: ['profile'] as const,
  users: ['users'] as const,
  reports: ['reports'] as const,
}
