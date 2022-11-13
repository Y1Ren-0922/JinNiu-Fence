<template>
    <MapContent />
    <div class="map" id="olMap" v-if="$route.path == '/bicycle-map/'"></div>
    <div id="popup" class="ol-popup">
        <a href="#" id="popup-closer" class="ol-popup-closer"></a>
        <div id="popup-content"></div>
    </div>
</template>


<script setup>
import "ol/ol.css";
import { Tile as TileLayer, Vector as LayerVec } from "ol/layer";
import XYZ from "ol/source/XYZ";
import Map from "ol/Map.js";
import View from "ol/View.js";
import { onMounted, reactive } from "vue";
import { Vector as SourceVec } from 'ol/source';
import { jinNiuFencePath } from '../scripts/constant'
import { Style, Fill, Stroke, Icon } from "ol/style"
import { Feature } from "ol";
import MapContent from "@/components/MapContent.vue";
import { Polygon } from "ol/geom";
import axios from "axios";
import { useStore } from 'vuex'
import { stringToSingleLocation } from "../scripts/utils"
import { Point } from "ol/geom";

let map = null;
const store = useStore();

const initBicyleMap = () => {
    let terMap = new Map({
        target: "olMap",
        view: new View({
            // center: [104.04396204, 30.71499549],
            center: [104.05632020955566, 30.753519881818795],
            zoom: 12.5,
            projection: "EPSG:4326",
        }),
    });
    map = terMap;
    //   添加地图
    let Tersource = new XYZ({
        url: "http://t4.tianditu.com/DataServer?T=vec_w&tk=b523e4ded27f524672a488e758227070&x={x}&y={y}&l={z}",
        crossOrigin: "anonymous",
    });
    let terLayer = new TileLayer({
        source: Tersource,
        zIndex: 1,

    });
    map.addLayer(terLayer);
    //添加注记
    let CTAsource = new XYZ({
        url: "http://t4.tianditu.com/DataServer?T=cva_w&tk=b523e4ded27f524672a488e758227070&x={x}&y={y}&l={z}",
        crossOrigin: "anonymous",
    });
    let CTAlayer = new TileLayer({
        source: CTAsource,
        zIndex: 1,

    });
    map.addLayer(CTAlayer);

    terLayer.on("prerender", function (evt) {

        const context = evt.context;
        context.filter = "grayscale(5%) invert(100%) opacity(50%)";
        context.fillStyle = "rgba(255, 250, 250, 0.0)";
    })

    CTAlayer.on("prerender", function (evt) {
        const context = evt.context;
        context.filter = "grayscale(50%) invert(100%) opacity(80%)";
        context.fillStyle = "rgba(255, 165, 0, 0.05)";
    })
    createPolygonLayer();
    createIconLayer();

    for (const path of jinNiuFencePath) {
        const tmp = new Polygon(path);
        let oltarget = new Feature(tmp);
        oltarget.set('name', 'jinNiu');
        oltarget.setStyle(

            new Style({
                fill: new Fill({ color: 'rgba(255,245,238, 0.5)' }),
                stroke: new Stroke({
                    lineDash: [10, 10, 10, 10],
                    color: "red",
                    width: 1,
                })
            })
        );
        polygonSource.addFeature(oltarget);
    }
}

let polygonSource;
let fenceStyle;
let fenceLayer;

const createPolygonLayer = () => {
    polygonSource = new SourceVec();
    fenceStyle = new Style({
        fill: new Fill({
            color: '#000080'
        }),
        stroke: new Stroke({
            color: '#ffcc33',
            width: 5
        }),

    });
    fenceLayer = new LayerVec({
        source: polygonSource,
        style: fenceStyle,
        zIndex: 10
    });
    map.addLayer(fenceLayer)
}

let iconSource;
let iconLayer;
const createIconLayer = () => {
    let bg = ['/images/meituan.png', '/images/haluo.png', '/images/qingju.png']
    iconSource = new SourceVec();
    iconLayer = new LayerVec({
        source: iconSource,
        style: function (feature) {
            let id = feature.get('company');

            let style = new Style({
                image: new Icon({
                    anchorOrigin: 'bottom-left',
                    anchorYUnits: "pixels",
                    opacity: 0.75,
                    src: bg[id],
                })


            })
            return [style]
        },
        zIndex: 10,
    });
    map.addLayer(iconLayer);
}

let bikePersonnelLocation = reactive({})
const getBikePersonnelLocation = () => {
    axios({
        url: '/api/bike-location',
        method: 'get',
        headers: {
            Authorization: store.state.user.tokenHeader + store.state.user.token,
        },
    }).then(function (response) {
        console.log(response)
        if (response.status == 200) {
            for (const item of response.data.data) {
                if (item.company != null && item.location != null && item.location != "") {
                    let point = stringToSingleLocation(item.location)
                    bikePersonnelLocation[item.bikeId] = {
                        company: item.company,
                        location: point,
                    }

                    let iconFeature = new Feature({
                        geometry: new Point(point, "XY"),
                    });

                    let company_id = 0
                    if (item.company == "哈啰") {
                        company_id = 1
                    } else if (item.company == "青桔") {
                        company_id = 2
                    }
                    iconFeature.set("company", company_id)

                    iconSource.addFeature(iconFeature);
                }
            }

        }
    })
}

getBikePersonnelLocation()
onMounted(() => {
    initBicyleMap();
})
</script>

<style scoped>
.map {
    width: 100vw;
    height: 100vh;
    background-color: rgba(43, 51, 73, 0.82);
    background-image: radial-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3), #000);
}
</style>