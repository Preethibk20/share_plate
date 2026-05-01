'use client'

import { useMemo } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import L from 'leaflet'

function createPinIcon() {
  return L.divIcon({
    className: 'listing-pin',
    html: '<div style="width:18px;height:18px;border-radius:999px;background:#f59e0b;border:3px solid white;box-shadow:0 10px 20px rgba(245,158,11,.3)"></div>',
    iconSize: [18, 18],
    iconAnchor: [9, 18],
  })
}

function ClickListener({ onChange }: { onChange: (value: [number, number]) => void }) {
  useMapEvents({
    click(event) {
      onChange([event.latlng.lat, event.latlng.lng])
    },
  })

  return null
}

export function LocationPicker({
  value,
  onChange,
}: {
  value: [number, number]
  onChange: (value: [number, number]) => void
}) {
  const icon = useMemo(() => createPinIcon(), [])

  return (
    <div className="h-[360px] overflow-hidden rounded-3xl border border-slate-200">
      <MapContainer center={value} zoom={12} className="h-full w-full">
        <ClickListener onChange={onChange} />
        <TileLayer url={process.env.NEXT_PUBLIC_MAP_TILE_URL ?? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'} />
        <Marker position={value} icon={icon} />
      </MapContainer>
    </div>
  )
}
