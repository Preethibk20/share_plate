'use client'

import { useEffect, useMemo, useState } from 'react'
import { Circle, MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Button } from '@/components/ui/button'
import type { Listing } from '@/types'

const defaultCenter: [number, number] = [19.076, 72.8777]

function RecenterMap({ center }: { center: [number, number] }) {
  const map = useMap()

  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true })
  }, [center, map])

  return null
}

function createListingIcon() {
  return L.divIcon({
    className: 'listing-pin',
    html: '<div style="width:18px;height:18px;border-radius:999px;background:#16a34a;border:3px solid white;box-shadow:0 10px 20px rgba(22,163,74,.35)"></div>',
    iconSize: [18, 18],
    iconAnchor: [9, 18],
  })
}

export function MapView({
  listings,
  radiusKm,
  onReserve,
  className,
}: {
  listings: Listing[]
  radiusKm?: number
  onReserve?: (listing: Listing) => void
  className?: string
}) {
  const [userLocation, setUserLocation] = useState<[number, number]>(defaultCenter)

  useEffect(() => {
    if (!navigator.geolocation) {
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude])
      },
      () => {
        setUserLocation(defaultCenter)
      },
      { enableHighAccuracy: true, timeout: 5000 },
    )
  }, [])

  const markerIcon = useMemo(() => createListingIcon(), [])

  return (
    <div className={className ?? 'h-[520px] w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft'}>
      <MapContainer center={userLocation} zoom={12} scrollWheelZoom className="h-full w-full">
        <RecenterMap center={userLocation} />
        <TileLayer url={process.env.NEXT_PUBLIC_MAP_TILE_URL ?? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'} />
        <Circle center={userLocation} radius={(radiusKm ?? 20) * 1000} pathOptions={{ color: '#16a34a', fillColor: '#16a34a', fillOpacity: 0.08 }} />
        <Marker position={userLocation}>
          <Popup>You are here</Popup>
        </Marker>
        {listings.map((listing) => (
          <Marker key={listing.id} position={[listing.coordinates.lat, listing.coordinates.lng]} icon={markerIcon}>
            <Popup>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-slate-900">{listing.foodType}</p>
                  <p className="text-slate-500">
                    {listing.quantity} {listing.unit} • {listing.distanceKm.toFixed(1)} km away
                  </p>
                </div>
                <p className="text-slate-600">{listing.pickupAddress}</p>
                <Button size="sm" className="w-full" onClick={() => onReserve?.(listing)}>
                  Reserve
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
