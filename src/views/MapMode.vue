<template>
    <MapContent />
    <div class="map-container" style="background-image: url(/images/bg.png);">
        <div class="map" id="olMap" v-if="$route.path == '/map-mode/'"></div>
    </div>

    <div id="popup" class="ol-popup">
        <a href="#" id="popup-closer" class="ol-popup-closer"></a>
        <div id="popup-content"></div>
    </div>

    <div class="content-mid">
        <el-button type="primary" plain v-if="isSelectRegionMode == 'true'" @click="createMarker">开始选择</el-button>
        <el-button type="primary" plain v-if="isSelectRegionMode == 'true'" @click="selectDone">选择结束</el-button>
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

    <el-dialog v-model="confirmDerectiveDialogVisible" title="是否确认发布指令？" width="30%">
        <div>指令内容：</div>
        <el-input v-model="derectiveInfo" autosize type="textarea" placeholder="请输入指令" />
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="confirmPost">
                    确认发布
                </el-button>
                <el-button @click="confirmDerectiveDialogVisible = false">取消</el-button>

            </span>
        </template>
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
import { Overlay, Feature, Collection } from "ol";
import { DoubleClickZoom, Translate } from "ol/interaction";
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
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { unByKey } from "ol/Observable";
// import {createStringXY} from 'ol/coordinate'

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
const locale = zhCn;

// const mousePositionControl = new MousePosition({
//         coordinateFormat: createStringXY(2),
//         projection: 'EPSG: 4326',

//         }
//     })

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
        if (router.currentRoute.value.query.patrol) {
            getPatrolsLocation(router.currentRoute.value.query.patrol);
        } else {
            getPatrolsLocation("");
        }

    })
}
refresh_polygonInfo();
setInterval(refresh_polygonInfo, 60000);


let patrolLocation = reactive({});
let iconFeatureList = reactive([]);
const getPatrolsLocation = id => {

    let patrol = {
        id: id,
        name: "",
        agency: '',
        department: '',
        identity: '',
        region: '',
        date: '',
        status: '',
        pageNum: 1,
        pageSize: 5000,
    }
    axios({
        url: '/api/patrol-whole-info/select/conditions',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': store.state.user.tokenHeader + store.state.user.token,
        },
        data: JSON.stringify(patrol)
    }).then(function (resp) {
        if (resp.status == 200) {

            for (const feature of iconFeatureList) {
                iconSource.removeFeature(feature);
            }
            iconFeatureList.splice(0, iconFeatureList.length);

            for (const item of resp.data.data.records) {

                if (item.location != null && item.location != "" && item.patrolId != null) {

                    patrolLocation[item.patrolId] = {
                        patrolId: item.patrolId,
                        location: stringToSingleLocation(item.location),
                    }

                    let point = stringToSingleLocation(item.location);
                    let iconFeature = new Feature({
                        geometry: new Point(point, "XY"),

                    });

                    iconFeature.set('name', 'icon');
                    iconFeature.set('polygonId', item.relatedRegion);
                    iconFeature.set('patrolId', item.patrolId);
                    iconFeature.set('patrolName', item.name);
                    iconFeature.set('department', item.department);
                    iconFeature.set('telephone', item.telephone);
                    iconFeature.set('identity', item.identity);

                    if (item.relatedRegion != null && polygonInfo[item.relatedRegion]) {

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
                    } else {
                        iconFeature.set('bgId', 1);
                        iconFeature.set('isInOwnRing', false);
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
    let bg = ['/images/staff.png', '/images/staff2.png', '/images/staff3.png', '/images/staff4.png', '/images/location2.png']
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

let dblClickEvent;
const createDblClick = () => {
    dblClickEvent = map.on('dblclick', function (e) {
        let feature = map.forEachFeatureAtPixel(e.pixel, function (feature) {
            return feature;
        });

        if (feature) {
            if (feature.get('name') == 'icon') {

                delete markerInfo[feature.get('iconName')];
                iconSource.removeFeature(feature);
                preview();
            } else {
                clickHandler(e);
            }

        } else {
            clickHandler(e);
        }

    });
}

let markerInfo = reactive({});
const createMarkerSignal = ref(false);
const createMarker = () => {
    if (createMarkerSignal.value === false) {
        markId = 0;
        // unByKey(overlayClick);
        createDblClick();
        // fenceInfo.value.name = "";
        // fenceInfo.value.operator = "";
        // fenceInfo.value.agency = "";
        // fenceInfo.value.editTime = getTTime(new Date().toISOString());

        createMarkerSignal.value = true;
    } else {
        for (let point in markerInfo) {
            iconSource.removeFeature(markerInfo[point].feature);
        }
        if (beforePreview != null) {
            polygonSource.removeFeature(beforePreview);
            beforePreview = null;
        }
        unByKey(dblClickEvent);
        // unByKey(clickEvent);

        markerInfo = reactive({});
        createMarkerSignal.value = false;
    }
}

const clickHandler = (e) => {

    let point = e.coordinate;
    let iconFeature = new Feature({
        geometry: new Point(point, "XY")
    });

    iconFeature.set('name', 'icon');
    iconFeature.set('iconName', markId);
    iconFeature.set('bgId', 4);
    markId++;

    iconSource.addFeature(iconFeature);

    let iconTranslate = new Translate({
        features: new Collection([iconFeature])
    });
    map.addInteraction(iconTranslate);

    iconTranslate.on('translateend', () => {
        let clickPoint = iconFeature.getGeometry().flatCoordinates;
        markerInfo[iconFeature.get('iconName')].point = clickPoint;
        preview();
    })

    markerInfo[iconFeature.get('iconName')] = {
        point: point,
        feature: iconFeature
    };
    preview();

}

let markId;
let beforePreview = null;
let markerList;
const preview = () => {
    let len = Object.keys(markerInfo).length;
    if (len >= 3) {
        if (beforePreview != null) {
            polygonSource.removeFeature(beforePreview);
        }
        markerList = [];

        for (let point in markerInfo) {
            markerList.push(markerInfo[point].point);
        }

        let nowFeature = createPolygonFeature(markerList);
        nowFeature.setStyle(
            new Style({
                stroke: new Stroke({
                    lineDash: [10, 10, 10, 10],
                    color: "#4e98f444",
                    width: 3
                })
            })
        );
        beforePreview = nowFeature;
        polygonSource.addFeature(nowFeature);
    } else {
        if (beforePreview != null) {
            polygonSource.removeFeature(beforePreview);
        }
    }
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
        status: "",
        onWorkTime: "",
        offWorkTime: "",
    })
    //ifShowWorkStatistics.value = true;
    getOnWorkStatus(value1.value);
}

const switchDate = date => {
    const date2 = new Date(date);
    const currentDate = date2.toLocaleDateString().replaceAll('/', '-');
    return currentDate;
}

const dateChange = () => {
    const currentDate = switchDate(value1.value);
    getOnWorkStatus(currentDate);
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

const switchTime = time => {
    return time.replace('T', ' ')
}

const getOnWorkStatus = (time) => {
    axios({
        url: '/api/patrol-status/status/' + patrolWorkStatistics[0].id + '/' + value1.value,
        method: 'get',
        headers: {
            'Authorization': store.state.user.tokenHeader + store.state.user.token,
        },
        params: {
            date: time,
            patrol_id: patrolWorkStatistics[0].id
        }
    }).then(function (resp) {

        if (resp.data.code == 2000) {
            workStat[0].status = resp.data.data.status;
            if (resp.data.data.onWork) {
                workStat[0].onWorkTime = switchTime(resp.data.data.onWork);
            } else {
                workStat[0].onWorkTime = "暂无"
            }

            if (resp.data.data.offWork) {
                workStat[0].offWorkTime = switchTime(resp.data.data.offWork);
            } else {
                workStat[0].offWorkTime = "暂无"
            }

        }
    })
}

const disabledDate = (time) => {
    return time.getTime() > Date.now()
}

const isSelectRegionMode = ref("false");
const judgeMode = () => {
    if (router.currentRoute.value.query.param) {
        isSelectRegionMode.value = "true";
        derectiveInfo.value = store.state.derective.msg;
    }
}
judgeMode();

const confirmDerectiveDialogVisible = ref(false);

const selectDone = () => {

    if (Object.keys(markerInfo).length < 3) {

        ElMessage({
            message: '区域未选择或不合法',
            type: 'error',
        })
    } else {
        confirmDerectiveDialogVisible.value = true;
        // ElMessage({
        //     message: '发送成功',
        //     type: 'success',
        // })
        // router.push({ name: 'map_index' });
    }
}


const confirmPost = () => {
    ElMessage({
        message: '发送成功',
        type: 'success',
    })
    router.push({ name: 'map_index' });
}
// const getLocation = () => {
//     if (router.currentRoute.value.query.patrol) {
//         getSingleBikePersonnel(1233432578);
//     } else {
//         getBikePersonnelLocation();
//     }
// }

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

.ol-popup {
    position: absolute;
    background-color: white;
    -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
    filter: drop-shadow(0 1px 4px #FFC125);
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    min-width: 200px;
}

.ol-popup:after,
.ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
}

.ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
}

.ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
}

.ol-popup-closer {
    text-decoration: none;
    position: absolute;
    top: 2px;
    right: 8px;
}

.ol-popup-closer:after {
    content: "×";
}

.content-mid {
    left: 20vw;
    width: 56vw;
    height: 30vh;
    padding: 1vh;
    padding-left: 5vw;
    /* background-color: rgba(0, 11, 61, 0.2); */
    position: absolute;
    top: 8vh;
    z-index: 20;
    display: flex;
    flex-flow: wrap;
    user-select: none;
}
</style>