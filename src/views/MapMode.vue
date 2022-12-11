<template>
    <MapContent />
    <div class="map-container" style="background-image: url(/images/bg.png);">
        <div class="map" id="olMap" v-if="$route.path == '/map-mode/'"></div>
    </div>

    <div id="popup" class="ol-popup">
        <a href="#" id="popup-closer" class="ol-popup-closer"></a>
        <div id="popup-content"></div>
    </div>

    <el-dialog v-model="ifShowWorkStatistics" width="45%">
        <div>
            <div class="dialog-title">个人信息</div>
            <el-table :data="patrolWorkStatistics">
                <el-table-column property="name" label="姓名" header-align="center" align="center" />
                <el-table-column property="department" label="部门" header-align="center" align="center" />
                <el-table-column property="identity" label="人员类别" header-align="center" align="center" />
                <el-table-column property="telephone" label="联系电话" header-align="center" align="center" />
                <el-table-column property="isInOwnRing" label="是否在本人辖区" header-align="center" align="center" />
                <el-table-column fixed="right" label="">
                    <template #default>
                        <el-button link type="primary" size="default" @click="personDetailInfo">详细信息</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>


        <div style="margin-top: 5vh;">
            <div class="dialog-title">在岗统计</div>
            <el-config-provider :locale="locale">
                <el-date-picker v-model="value1" type="date" placeholder="选择日期" :disabled-date="disabledDate"
                    @change="dateChange" />
            </el-config-provider>
            <el-table :data="workStat">
                <el-table-column property="name" label="姓名" width="120" header-align="center" align="center" />
                <el-table-column property="status" label="状态" width="120" header-align="center" align="center" />
                <el-table-column property="onWorkTime" label="上班时间" header-align="center" align="center" />
                <el-table-column property="offWorkTime" label="下班时间" header-align="center" align="center" />
            </el-table>
        </div>

        <div style="margin-top: 5vh;">
            <div class="dialog-title">指令发布</div>

            <div>

                <el-input v-model="derectiveInfo" autosize type="textarea" placeholder="请输入指令" />
                <div style="margin-top: 5vh; margin-bottom: 5vh;">
                    <button type="button" class="btn btn-outline-primary float-end" @click="sendDerective">发布</button>
                </div>
                <div style="width: 100%; height: 5vh;"></div>
            </div>

        </div>

    </el-dialog>
</template>

<script setup>

import "ol/ol.css";
import { Tile as TileLayer, Vector as LayerVec } from "ol/layer";
import { Vector as SourceVec } from 'ol/source';
import XYZ from "ol/source/XYZ";
import Map from "ol/Map.js";
import View from "ol/View.js";
import { reactive, onMounted, ref } from "vue";
import { Style, Fill, Circle, Stroke, Icon } from "ol/style"
import { Overlay, Feature } from "ol";
import { DoubleClickZoom } from "ol/interaction";
import { Polygon } from "ol/geom";
// import ImageLayer from "ol/layer/Image";
import MapContent from "@/components/MapContent.vue";
import { banshichu } from '../scripts/constant'
import axios from "axios";
import { stringToList, getStandardTime } from '../scripts/utils'
import AMapLoader from "@amap/amap-jsapi-loader"
import { Point } from "ol/geom";
import { useStore } from 'vuex';
import { defaults as defaultControls } from 'ol/control'
import { ElMessage } from 'element-plus';
import router from "@/router";

let Amap;
const value1 = ref('');
AMapLoader.load({
    key: "61ad75101d54a5371d872c69fdce0d3f"
}).then((AMap) => {
    Amap = AMap;
    getPatrolsLocation();
})

let map = null;
let content;
let popup;
let closer;
const store = useStore();
let ifShowWorkStatistics = ref(false);

const initMap = () => {

    let terMap = new Map({
        target: "olMap",
        view: new View({
            // center: [104.04396204, 30.71499549],
            center: [104.05632020955566, 30.753519881818795],
            zoom: 12.5,
            projection: "EPSG:4326",
        }),
        controls: defaultControls({
            zoom: false,
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

    let container = document.getElementById("popup");
    content = document.getElementById("popup-content");
    closer = document.getElementById("popup-closer");
    popup = new Overlay({
        element: container,
        autoPan: true,
        positioning: "bottom-center",
        stopEvent: true,
    });
    map.addOverlay(popup);
    closer.onclick = function () {
        popup.setPosition(undefined);
        closer.blur();
        return false;
    };
    createOverlayClick();

    map.on("pointermove", function (e) {
        let pixel = map.getEventPixel(e.originalEvent);
        let hit = map.hasFeatureAtPixel(pixel);
        map.getTargetElement().style.cursor = hit ? "pointer" : "";
    });

    terLayer.on("prerender", function (evt) {

        const context = evt.context;
        // context.filter = "grayscale(5%) invert(100%) opacity(50%)";
        // context.fillStyle = "rgba(255, 250, 250, 0.0)";
        context.filter = "grayscale(1) invert(100%) opacity(10%)";
        context.fillStyle = "rgba(255, 255, 255, 0.0)";
    })

    CTAlayer.on("prerender", function (evt) {
        const context = evt.context;
        // context.filter = "grayscale(50%) invert(100%) opacity(80%)";
        context.fillStyle = "rgba(255, 250, 250, 0.0)";
        context.filter = "grayscale(1) invert(100%) opacity(30%)";
    })

    const dblClickInteraction = map
        .getInteractions()
        .getArray()
        .find(interaction => {
            return interaction instanceof DoubleClickZoom;
        });
    map.removeInteraction(dblClickInteraction);
    createPolygonLayer();
    createIconLayer();

    for (const item of banshichu) {
        const tmp = new Polygon(item.path);
        let oltarget = new Feature(tmp);
        oltarget.set('name', 'banshichu');
        oltarget.set('banshichuName', item.name);
        oltarget.setStyle(
            new Style({
                fill: new Fill({ color: item.color }),
                stroke: new Stroke({
                    color: item.strokeColor,
                    lineDash: [10, 10, 10, 10],
                    width: 1
                })
            })
        );
        polygonSource.addFeature(oltarget);
    }
}


let polygonInfo = reactive({});
const refresh_polygonInfo = () => {
    Object.keys(polygonInfo).map(key => {
        polygonSource.removeFeature(polygonInfo[key].feature);
        delete polygonInfo[key]
    });
    axios({
        url: "/api/region",
        method: "get",
        headers: {
            Authorization: store.state.user.tokenHeader + store.state.user.token,
        }
    }).then(function (resp) {
        num = 0;
        for (const item of resp.data.data) {

            let pointList = stringToList(item.pointList);
            if (pointList.length < 3) continue;

            // pointList = sortPoint(pointList);
            let polygonFeature = createPolygonFeature(pointList);
            polygonFeature.set('name', item.id);
            polygonSource.addFeature(polygonFeature);

            polygonInfo[item.id] = {
                id: item.id,
                name: item.name,
                operator: item.creator,
                agency: item.agency,
                editTime: getStandardTime(item.createTime),
                markList: pointList,
                feature: polygonFeature
            }
        }
        getPatrolsLocation();
    })
}
refresh_polygonInfo();
setInterval(refresh_polygonInfo, 60000);


let patrolLocation = reactive({});
let iconFeatureList = reactive([]);
const getPatrolsLocation = () => {
    axios({
        url: '/api/patrol-whole-info',
        method: 'get',
        headers: {
            Authorization: store.state.user.tokenHeader + store.state.user.token,
        },
    }).then(function (resp) {
        if (resp.status == 200) {

            for (const feature of iconFeatureList) {
                iconSource.removeFeature(feature);
            }
            iconFeatureList.splice(0, iconFeatureList.length);

            for (const item of resp.data.data) {

                if (item.location != null && item.patrol_id != null && item.relatedRegion != null) {

                    patrolLocation[item.patrol_id] = {
                        patrolId: item.patrol_id,
                        location: stringToSingleLocation(item.location),
                    }

                    let point = stringToSingleLocation(item.location);
                    let iconFeature = new Feature({
                        geometry: new Point(point, "XY"),

                    });

                    iconFeature.set('name', 'icon');
                    iconFeature.set('polygonId', item.relatedRegion);
                    iconFeature.set('patrolId', item.patrol_id);
                    iconFeature.set('patrolName', item.name);
                    iconFeature.set('department', item.department);
                    iconFeature.set('telephone', item.telephone);
                    iconFeature.set('identity', item.identity);

                    let relateRegion = polygonInfo[item.relatedRegion].markList;
                    if (item.identity == "执法人员") {
                        let isInRing = Amap.GeometryUtil.isPointInRing(point, relateRegion);
                        if (isInRing) {
                            iconFeature.set('bgId', 0);

                        } else {
                            iconFeature.set('bgId', 1);
                        }
                        iconFeature.set('isInOwnRing', isInRing);

                    } else if (item.identity == "协管人员") {
                        let isInRing = Amap.GeometryUtil.isPointInRing(point, relateRegion);
                        if (isInRing) {
                            iconFeature.set('bgId', 2);
                        } else {
                            iconFeature.set('bgId', 3);
                        }
                        iconFeature.set('isInOwnRing', isInRing);
                    }
                    iconSource.addFeature(iconFeature);
                    iconFeatureList.push(iconFeature);

                }
            }
        }
    })
}

const stringToSingleLocation = path => {
    let pathLng = path.replace("[", "").replace("]", "").split(",")[0] * 1;
    let pathLat = path.replace("[", "").replace("]", "").split(",")[1] * 1;
    return [pathLng, pathLat];
}

let polygonSource;
let fenceStyle;
let fenceLayer;

const createPolygonLayer = () => {
    polygonSource = new SourceVec();
    fenceStyle = new Style({
        // fill: new Fill({
        //     color: "rgba(255, 255, 255, 0.2)"
        // }),
        stroke: new Stroke({
            color: "#ffcc33",
            width: 5
        }),
        image: new Circle({
            radius: 7,
            fill: new Fill({
                color: "#ffcc33"
            })
        })
    });
    fenceLayer = new LayerVec({
        source: polygonSource,
        style: fenceStyle,
        zIndex: 5,
    });
    map.addLayer(fenceLayer);
};


let iconSource;
let iconLayer;
const createIconLayer = () => {
    let bg = ['/images/staff.png', '/images/staff2.png', '/images/staff3.png', '/images/staff4.png']
    iconSource = new SourceVec();
    iconLayer = new LayerVec({
        source: iconSource,
        style: function (feature) {
            let id = feature.get('bgId');

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

const createOverlayClick = () => {
    map.on("singleclick", function (e) {
        let coordinate = e.coordinate;
        let feature = map.forEachFeatureAtPixel(e.pixel, function (feature) {
            return feature;
        });
        if (feature) {

            let featureId = feature.get('name');
            if (featureId != "jinNiu" && featureId != 'icon' && featureId != 'banshichu') {

                content.innerHTML = "";

                let name = document.createElement("p");
                name.innerText = "围栏名: " + polygonInfo[featureId].name;
                content.appendChild(name);
                let agency = document.createElement("p");
                agency.innerText = "所处办事处: " + polygonInfo[featureId].agency;
                content.appendChild(agency);
                let operator = document.createElement("p");
                operator.innerText = "操作人: " + polygonInfo[featureId].operator;
                content.appendChild(operator);

                popup.setPosition(coordinate);
            } else if (featureId == 'icon') {
                checkWorkStatistics(feature);
            } else if (featureId == 'banshichu') {
                content.innerHTML = "";
                let name = document.createElement("p");
                name.innerText = "办事处名: " + feature.get('banshichuName');
                content.appendChild(name);
                popup.setPosition(coordinate);
            }
        }
    });
};

let patrolWorkStatistics = reactive([]);
let workStat = reactive([]);
let selectPatrolId = ref('');
const checkWorkStatistics = (feature) => {
    ifShowWorkStatistics.value = true;
    const date = new Date();
    const currentDay = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    value1.value = currentDay;

    selectPatrolId.value = feature.get('patrolId');

    patrolWorkStatistics.splice(0, patrolWorkStatistics.length);
    workStat.splice(0, workStat.length);

    patrolWorkStatistics.push({
        name: feature.get('patrolName'),
        department: feature.get('department'),
        identity: feature.get('identity'),
        telephone: feature.get('telephone'),
        id: feature.get('patrolId'),
        isInOwnRing: feature.get('isInOwnRing') == true ? '是' : '否'
    })

    workStat.push({
        name: feature.get('patrolName'),
        status: "在岗",
        onWorkTime: "2022-10-14 8:13:5",
        offWorkTime: "2022-10-14 17:40:00",
    })
    //ifShowWorkStatistics.value = true;
}

const dateChange = () => {
    const date2 = new Date(value1.value);
    const currentDate = date2.toLocaleDateString().replaceAll('/', '-');
    console.log(currentDate);
    console.log(selectPatrolId.value);
}

let num = 0;
const createPolygonFeature = (markerList) => {
    const color = ['rgba(0, 255, 0, 0.5)', 'rgba(0, 0, 255, 0.5)', 'rgba(255, 0, 0, 0.5)', 'rgba(255, 255, 0, 0.5)', 'rgba(255,0,255, 0.5)', 'rgba(0,255,255, 0.5)'];
    let oltarget;

    if (markerList.length < 3) {
        return null;
    }

    // markerList = sortPoint(markerList);
    markerList.push(markerList[0])

    const tmp = new Polygon([markerList]);
    oltarget = new Feature(tmp);
    oltarget.setStyle(
        new Style({
            fill: new Fill({ color: color[num % 6] }),
            stroke: new Stroke({
                lineDash: [10, 10, 10, 10],
                // color: "#4e98f444",
                color: '#2b8cbe',
                width: 1,
            })
        })
    );
    num++;
    return oltarget;
}

let derectiveInfo = ref("");
const sendDerective = () => {
    // let sendObject = patrolWorkStatistics[0].telephone
    const socket = store.state.user.socket;
    if (derectiveInfo.value != "") {
        socket.send(JSON.stringify({
            // patrolTelephone: sendObject,
            type: 1,
            patrolTelephone: "13708028101",
            message: derectiveInfo.value,
        }))
        ElMessage({
            message: '指令已发布！',
            type: 'success',
        })
        derectiveInfo.value = "";
    } else if (derectiveInfo.value == "") {
        ElMessage({
            message: "指令为空",
            type: 'warning'
        })
    }
}

const personDetailInfo = () => {
    router.push({ name: 'person_detail_index', query: { "patrol": patrolWorkStatistics[0].id } })
}

onMounted(() => {
    initMap();
})
</script>

<style scoped>
.map-container {
    width: 100vw;
    height: 100vh;
}

.dialog-title {
    font-size: 1rem;
    font-weight: 1000;
    color: "#303133";
    margin-bottom: 1vh;
    margin-left: 20vw;
}

.map-header {
    width: 100vw;
    height: 8vh;
    margin: auto;
    background-image: url("@/assets/img/map-header2.png");
    background-size: 100% 100%;
    margin-bottom: 14vh;
}

.map-header-title {
    color: #FFFFFF;
    font-family: Alibaba PuHuiTi;
    font-size: 2.1rem;
    margin: auto;
    text-align: center;
}

.map {
    width: 100vw;
    /* height: 78vh; */
    height: 100vh;
    margin: auto;
    background-color: rgba(43, 51, 73, 0.82);
    background-image: radial-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3), #000);
}
</style>