import React, { useRef, useEffect } from "react"
import "ol/ol.css"
import { Map, View, Overlay } from "ol"
import TileLayer from "ol/layer/Tile"
import OSM from "ol/source/OSM"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import { Fill, Stroke, Style, Icon } from "ol/style"
import GeoJSON from "ol/format/GeoJSON"
import { fromLonLat, toLonLat } from "ol/proj"
import Feature from "ol/Feature"
import Point from "ol/geom/Point"

const DeliveryZoneMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const popupRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!mapRef.current || !popupRef.current) return

    // 1) Зона доставки
    const geojsonObject = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [39.92448682189999, 43.41488743157646],
                [39.92468347719, 43.414222923178755],
                [39.92527002199748, 43.413785640722864],
                [39.92679812557685, 43.413269867614446],
                [39.93260211160981, 43.40914481652027],
                [39.93469655923292, 43.406032489746735],
                [39.93570916061523, 43.40533226292493],
                [39.93859441980055, 43.40563881690895],
                [39.9395865840267, 43.40682359204882],
                [39.94019100591143, 43.40671588617522],
                [39.941425240242694, 43.40615685201976],
                [39.942441769528585, 43.4055899128773],
                [39.9433658870627, 43.404955829918634],
                [39.944329485812915, 43.4039749936708],
                [39.94475258618294, 43.40366759904782],
                [39.94518850777476, 43.402922393488694],
                [39.9460728185303, 43.40176304645732],
                [39.94662817736199, 43.400718081298066],
                [39.94743985565373, 43.39995245182064],
                [39.94823729397524, 43.399435129129415],
                [39.94974673079889, 43.398990228081885],
                [39.95043024935964, 43.398731563180576],
                [39.95168336672231, 43.398348737099894],
                [39.95278984611079, 43.39826009813268],
                [39.95737857212893, 43.39922751154435],
                [39.95866246438328, 43.39922751154435],
                [39.96082606058786, 43.39845012698618],
                [39.96306098414075, 43.397534527937665],
                [39.964915495173926, 43.3974308743438],
                [39.96722405952542, 43.397027354670456],
                [39.96913298367852, 43.39652297294049],
                [39.970795698594145, 43.39583516090735],
                [39.98080995148706, 43.389559469215385],
                [39.98346688286068, 43.388571729165875],
                [39.98484587824305, 43.38819160890711],
                [39.98565425484804, 43.38784604296734],
                [39.98729478383939, 43.3870339552536],
                [39.988578676092146, 43.38660198927127],
                [39.99213973051903, 43.38501028322119],
                [39.99502032476897, 43.38480351896217],
                [39.998452269903254, 43.38584629913814],
                [40.00112827000879, 43.38645204353284],
                [40.002532073343815, 43.386388281249765],
                [40.003935876678725, 43.386420162399475],
                [40.005471286575016, 43.38613323144787],
                [40.00722604074372, 43.38667521099413],
                [40.007041744679015, 43.388202811746964],
                [40.00675844517929, 43.388791032650914],
                [40.00663703110757, 43.38965864806494],
                [40.00608903335814, 43.38992561102381],
                [40.0065442472673, 43.391063366362715],
                [40.007286929203104, 43.39171621893357],
                [40.007666156878486, 43.39395359846168],
                [40.00302849680742, 43.39475777039678],
                [39.99303511401166, 43.40280019435724],
                [39.98629164483009, 43.407030320093355],
                [39.98070007509631, 43.40995504896091],
                [39.97692975950349, 43.41153341538984],
                [39.974442859543075, 43.4126915651853],
                [39.96669969100378, 43.41675569810303],
                [39.9646059471701, 43.41751093942207],
                [39.95599966072348, 43.419579410912405],
                [39.955213856033765, 43.4191922860206],
                [39.952810150396715, 43.41781607594433],
                [39.94939497595371, 43.41697740232138],
                [39.94830984031472, 43.41693315416961],
                [39.94365280315125, 43.41800722601516],
                [39.942807129264054, 43.41843133987723],
                [39.940317708593625, 43.42063258643128],
                [39.939194763399655, 43.42139907314245],
                [39.93788240576271, 43.421929712104486],
                [39.93002164920517, 43.424438069682736],
                [39.92448682189999, 43.41488743157646],
              ],
            ],
          },
        },
      ],
    }

    const zoneSource = new VectorSource({
      features: new GeoJSON().readFeatures(geojsonObject, {
        featureProjection: "EPSG:3857",
      }),
    })
    const zoneLayer = new VectorLayer({
      source: zoneSource,
      style: new Style({
        fill: new Fill({ color: "rgba(255,200,0,0.4)" }),
        stroke: new Stroke({
          color: "#ff6600",
          width: 3,
          lineDash: [10, 10],
        }),
      }),
    })
    zoneLayer.setZIndex(0)

    // 2) Слой для меток
    const markerSource = new VectorSource()
    const markerLayer = new VectorLayer({
      source: markerSource,
      style: new Style({
        image: new Icon({
          src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
          anchor: [0.5, 1],
          scale: 0.05,
        }),
      }),
    })
    markerLayer.setZIndex(1)

    // 3) Popup-overlay
    const overlay = new Overlay({
      element: popupRef.current,
      positioning: "bottom-center",
      offset: [0, -10],
      stopEvent: false,
    })

    // 4) Инициализация карты
    const map = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() }), zoneLayer, markerLayer],
      overlays: [overlay],
      view: new View({
        center: fromLonLat([39.9547, 43.4061]),
        zoom: 12,
      }),
    })

    // 5) Обработчик клика с Nominatim
    map.on("singleclick", async (evt) => {
      const coord = evt.coordinate
      const [lon, lat] = toLonLat(coord)

      markerSource.clear()
      const marker = new Feature({ geometry: new Point(coord) })
      markerSource.addFeature(marker)

      try {
        const params = new URLSearchParams({
          format: "json",
          lat: String(lat),
          lon: String(lon),
          zoom: "18",
          addressdetails: "1",
          "accept-language": "ru",
        })
        const resp = await fetch(
          `https://nominatim.openstreetmap.org/reverse?${params.toString()}`,
          {
            headers: {
              "User-Agent": "DeliveryMapApp/1.0 (youremail@example.com)",
            },
          }
        )
        const data = await resp.json()
        const addr = data.address || {}

        // Собираем только улицу и дом
        const street = addr.road ? `ул. ${addr.road}` : ""
        const house = addr.house_number ? `д. ${addr.house_number}` : ""
        const address =
          [street, house].filter(Boolean).join(", ") || "Адрес не найден"

        popupRef.current!.innerHTML = `
          <div style="
            background: white;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            max-width: 200px;
            font-size: 14px;
          ">
            <strong>Адрес:</strong><br>${address}
          </div>`
        overlay.setPosition(coord)
      } catch (err) {
        console.error("Nominatim error:", err)
      }
    })

    return () => map.setTarget(undefined)
  }, [])

  return (
    <>
      <div ref={mapRef} style={{ width: "100%", height: "100vh" }} />
      <div
        ref={popupRef}
        style={{
          position: "absolute",
          pointerEvents: "none",
        }}
      />
    </>
  )
}

export default DeliveryZoneMap
