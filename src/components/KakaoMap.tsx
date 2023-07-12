import React, { useEffect } from 'react'

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
  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map')
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
      }
      const map = new window.kakao.maps.Map(container, options)
      const markerPosition = new window.kakao.maps.LatLng(latitude, longitude)
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      })
      marker.setMap(map)
    })
  }, [latitude, longitude])

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>
}

export default KakaoMap
