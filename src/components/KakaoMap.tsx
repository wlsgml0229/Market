import React, { useEffect } from 'react'
import { MapMarker, Map } from 'react-kakao-maps-sdk'
import setCustomValue from 'react-hook-form'

// import { Map, MapMarker } from 'react-kakao-maps-sdk'
interface kakaoMapProps {
  latitude: number
  longitude: number
  setCustomValue?: (id: string, value: number) => void
  detailPage?: boolean
}
declare global {
  interface Window {
    kakao: any
  }
}

const KakaoMap = ({
  latitude,
  longitude,
  setCustomValue,
  detailPage = false,
}: kakaoMapProps) => {
  const handleClick = (mouseEvent) => {
    if (detailPage) return
    setCustomValue!('latitude', mouseEvent.latLng.getLat())
    setCustomValue!('longitude', mouseEvent.latLng.getLng())
  }
  return (
    <Map
      center={{ lat: 33.5563, lng: 126.79581 }}
      style={{ width: '100%', height: '360px' }}
      onClick={(_, mouseEvent) => handleClick(mouseEvent)}
    >
      <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}></MapMarker>
    </Map>
  )
}

export default KakaoMap
