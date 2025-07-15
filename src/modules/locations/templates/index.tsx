"use client"

import React, { useEffect, useRef } from "react"
import Map from "ol/Map"
import View from "ol/View"
import TileLayer from "ol/layer/Tile"
import OSM from "ol/source/OSM"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import Feature from "ol/Feature"
import Point from "ol/geom/Point"
import Style from "ol/style/Style"
import Icon from "ol/style/Icon"
import { fromLonLat } from "ol/proj"
import "ol/ol.css"

interface Location {
  id: number
  name: string
  address: string
  latitude: number
  longitude: number
}

const locations: Location[] = [
  {
    id: 1,
    name: "Первое и пока что единственное место находится здесь",
    address: "Сириус, Перелётная 32А",
    latitude: 43.410784,
    longitude: 39.960666,
  },
]

const LocationsTemplate: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<Map | null>(null)

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      const { latitude, longitude } = locations[0]

      mapInstance.current = new Map({
        target: mapRef.current,
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({
          center: fromLonLat([longitude, latitude]),
          zoom: 16,
        }),
      })

      const marker = new Feature({
        geometry: new Point(fromLonLat([longitude, latitude])),
      })
      marker.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: "/MunchesMap.webp",
            scale: 0.07,
          }),
        })
      )

      const vectorLayer = new VectorLayer({
        source: new VectorSource({ features: [marker] }),
      })
      mapInstance.current.addLayer(vectorLayer)
    }
    return () => {
      if (mapInstance.current) mapInstance.current.setTarget(undefined)
    }
  }, [])

  return (
    <section className="bg-rose-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-rose-600 mb-8 text-center">
          Где найти наши заведения
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ul className="space-y-6">
            {locations.map((loc) => (
              <li
                key={loc.id}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
              >
                <h2 className="text-2xl font-semibold text-rose-700 mb-2">
                  {loc.name}
                </h2>
                <p className="text-gray-600">{loc.address}</p>
              </li>
            ))}
          </ul>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div ref={mapRef} className="w-full h-80" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default LocationsTemplate
