/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'

const MapContainer = dynamic(
  () => import('react-leaflet').then((module) => module.MapContainer),
  {
    ssr: false
  }
)
const Marker = dynamic(
  () => import('react-leaflet').then((module) => module.Marker),
  {
    ssr: false
  }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((module) => module.TileLayer),
  {
    ssr: false
  }
)

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

import 'leaflet/dist/leaflet.css'

type Props = {
  center?: number[]
}

const Map = ({ center }: Props) => {
  useEffect(() => {
    import('leaflet').then((L) => {
      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconUrl: markerIcon.src,
        iconRetinaUrl: markerIcon2x.src,
        shadowUrl: markerShadow.src
      })
    })
  }, [])

  const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

  return (
    <div>
      {typeof window !== 'undefined' && (
        <MapContainer
          center={(center as L.LatLngExpression) || [51, -0.09]}
          zoom={center ? 4 : 2}
          scrollWheelZoom={false}
          className='h-[35vh] rounded-lg'
        >
          <TileLayer url={url} attribution={attribution} />
          {center && <Marker position={center as L.LatLngExpression} />}
        </MapContainer>
      )}
    </div>
  )
}

export default Map
