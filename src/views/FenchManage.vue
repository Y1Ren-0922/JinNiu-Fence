<template>
    <div>
        <div class="buttonBox">
            <button v-if="!exitEditAble" type="button" class="btn btn-primary"
                @click="createMarker()">创建围栏/取消创建</button>
            <button v-else type="button" class="btn btn-primary">创建围栏/取消创建</button>

            <button v-if="!exitEditAble" type="button" class="btn btn-primary" data-bs-toggle="modal"
                data-bs-target="#edit-fench" style="margin-left:10px">编辑围栏/取消编辑</button>
            <button v-else type="button" class="btn btn-primary" @click="exitEdit()"
                style="margin-left:10px">编辑围栏/取消编辑</button>
            <!-- <button v-else type="button" class="btn btn-outline-secondary">退出编辑</button> -->

            <!-- <button v-if="confirmOperation" type="button" class="btn btn-primary" data-bs-toggle="modal"
                data-bs-target="#add-fench" style="margin-left:10px">确认创建/编辑</button> -->
            <button v-if="confirmOperation" type="button" class="btn btn-primary" @click="openAddDialog()"
                style="margin-left:10px">确认创建/编辑</button>
            <button v-else type="button" class="btn btn-primary" style="margin-left:10px">确认创建/编辑</button>

        </div>


        <div class="modal fade" id="edit-fench" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">修改围栏</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-striped table-hover" id="fenceList">
                            <thead>
                                <tr>

                                    <th>围栏名</th>
                                    <th>所属办事处</th>
                                    <th>操作者</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(value, key) in polygonInfo" :key="key">
                                    <td>{{ value.name }}</td>
                                    <td>{{ value.agency }}</td>
                                    <td>{{ value.operator }}</td>
                                    <td>
                                        <el-button v-if="!confirmOperation" class="editFench" link size="small"
                                            type="primary" plain text style="font-size:14px; "
                                            @click="inEditFence(value.id)">
                                            编辑围栏
                                        </el-button>
                                        <el-button v-else @click="inEditMessage()" class="editFenceNone" link
                                            size="small" type="primary" plain text style="font-size:14px; ">
                                            编辑围栏
                                        </el-button>
                                        <el-button link size="small" type="danger" plain text style="font-size:14px"
                                            @click="deleteFence(value.id)">删除
                                        </el-button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <!-- <button type="button" class="btn btn-primary" @click="inEditFence()">确定</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button> -->
                    </div>

                </div>
            </div>
        </div>

        <el-dialog v-model="addFenceVisiable" title="创建围栏">
            <template #default>
                <el-form label-width="120px" style="max-width: 500px">
                    <el-form-item label="围栏名称" width="100px">
                        <el-input v-model="fenceInfo.name" />
                    </el-form-item>
                    <el-form-item label="所属办事处">
                        <el-input v-model="fenceInfo.agency" />
                    </el-form-item>

                    <el-form-item label="创建者">
                        <el-input v-model="fenceInfo.operator" />
                    </el-form-item>



                </el-form>
            </template>
            <template #footer>
                <span class="dialog-footer">
                    <button type="button" class="btn btn-primary" @click="addFence()">确定</button>
                    <button type="button" class="btn btn-secondary" style="margin-left:10px;"
                        @click="addFenceVisiable = false;">取消</button>
                </span>
            </template>
        </el-dialog>


        <div class="map" id="olMap" v-if="$route.path == '/fench/'"></div>
        <div id="popup" class="ol-popup">
            <a href="#" id="popup-closer" class="ol-popup-closer"></a>
            <div id="popup-content"></div>
        </div>
    </div>
</template>
  
<script >
import "ol/ol.css";
import { Tile as TileLayer, Vector as LayerVec } from "ol/layer";
import { Vector as SourceVec } from 'ol/source';
import XYZ from "ol/source/XYZ";
import Map from "ol/Map.js";
import View from "ol/View.js";
import { onMounted } from "vue";
import { Style, Icon, Fill, Circle, Stroke } from "ol/style"
import { Modal } from 'bootstrap/dist/js/bootstrap';
import { ref, reactive } from "vue";
import { Collection, Feature, Overlay } from "ol";
import { Point } from "ol/geom";
import { DoubleClickZoom, Translate } from "ol/interaction";
import { unByKey } from "ol/Observable";
import { Polygon } from "ol/geom";
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';
import axios from 'axios'
import { stringToList, getStandardTime, getTTime } from '../scripts/utils'
import { banshichu } from '../scripts/constant'
import { useStore } from 'vuex';
import router from "@/router";

export default {

    setup() {
        const store = useStore();
        let map = null;
        const addFenceVisiable = ref(false);

        const fenceInfo = ref({
            name: '',
            id: ' ',
            operator: "",
            editTime: '',
            pointList: '',
            agency: '',
        });

        const isDisabled = ref(true);

        let editFenceName = ref("");
        const createMarkerSignal = ref(false);
        let overlayClick;
        let content;
        let popup;

        const initMap = () => {
            let terMap = new Map({
                target: "olMap",
                view: new View({
                    center: [104.05396204, 30.74499549],
                    zoom: 12.8,
                    projection: "EPSG:4326",
                }),
            });
            map = terMap;
            //   添加地图
            let Tersource = new XYZ({
                url: "http://t4.tianditu.com/DataServer?T=vec_w&tk=b523e4ded27f524672a488e758227070&x={x}&y={y}&l={z}",
            });
            let terLayer = new TileLayer({
                className: "tileLayer",
                source: Tersource,
                zIndex: 1,
            });
            map.addLayer(terLayer);
            // 添加注记
            let CTAsource = new XYZ({
                url: "http://t4.tianditu.com/DataServer?T=cva_w&tk=b523e4ded27f524672a488e758227070&x={x}&y={y}&l={z}",
            });
            let CTAlayer = new TileLayer({
                source: CTAsource,

                zIndex: 1,
            });
            map.addLayer(CTAlayer);

            let container = document.getElementById('popup');
            content = document.getElementById('popup-content');
            let closer = document.getElementById('popup-closer');

            popup = new Overlay({
                element: container,
                autoPan: true,
                positioning: 'bottom-center',
                stopEvent: false,

            });
            map.addOverlay(popup);

            closer.onclick = function () {
                popup.setPosition(undefined);
                closer.blur();
                return false;
            };

            map.on('pointermove', function (e) {
                let pixel = map.getEventPixel(e.originalEvent);
                let hit = map.hasFeatureAtPixel(pixel);
                map.getTargetElement().style.cursor = hit ? 'pointer' : '';
            });

            // 去除双击地图缩放
            const dblClickInteraction = map
                .getInteractions()
                .getArray()
                .find(interaction => {
                    return interaction instanceof DoubleClickZoom
                });
            map.removeInteraction(dblClickInteraction);

            createIconLayer();
            createPolygonLayer();

            // for (const path of jinNiuFencePath) {
            //     const tmp = new Polygon(path);
            //     let oltarget = new Feature(tmp);
            //     oltarget.set('name', 'jinNiu');
            //     oltarget.setStyle(

            //         new Style({
            //             fill: new Fill({ color: 'rgba(255, 236, 139, 0.5)' }),
            //             stroke: new Stroke({
            //                 lineDash: [10, 10, 10, 10],
            //                 color: "red",
            //                 width: 1,
            //             })
            //         })
            //     );
            //     polygonSource.addFeature(oltarget);
            // }

            for (const item of banshichu) {
                const tmp = new Polygon(item.path);
                let oltarget = new Feature(tmp);
                oltarget.set('name', 'banshichu');
                oltarget.set("banshichuName", item.name);
                oltarget.setStyle(
                    new Style({
                        fill: new Fill({ color: 'rgba(255, 236, 139, 0.5)' }),
                        stroke: new Stroke({
                            color: item.strokeColor,
                            lineDash: [10, 10, 10, 10],
                            width: 1
                        })
                    })
                );
                polygonSource.addFeature(oltarget);
            }

            // refresh_polygonInfo();
            createOverlayClick();
        }

        let markerInfo = reactive({});     // 存放每次创建或编辑中的点信息
        let polygonInfo = reactive({});   // 存放围栏点集以及feature
        let confirmOperation = ref(false);
        let exitEditAble = ref(false);
        let dblClickEvent;
        let clickEvent;
        let vectorLayer;
        let iconSource;
        let markId;

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
                },
            }).then(function (resp) {
                num = 0;
                for (const item of resp.data.data) {
                    let pointList = stringToList(item.pointList);
                    if (pointList.length < 3) continue;

                    let polygonFeature = createPolygonFeature(pointList);
                    polygonFeature.set('name', item.id);
                    polygonSource.addFeature(polygonFeature);

                    polygonInfo[item.id] = {
                        id: item.id,
                        name: item.name,
                        agency: item.agency,
                        operator: item.creator,
                        editTime: getStandardTime(item.createTime),
                        markList: pointList,
                        feature: polygonFeature
                    }
                }
            })
        }

        const getSingleRegion = id => {
            axios({
                url: '/api/region/' + id,
                method: 'get',
                headers: {
                    Authorization: store.state.user.tokenHeader + store.state.user.token,
                },
                params: {
                    id: id
                }
            }).then(function (resp) {
                if (resp.status == 200) {
                    Object.keys(polygonInfo).map(key => {
                        polygonSource.removeFeature(polygonInfo[key].feature);
                        delete polygonInfo[key]
                    });
                    const item = resp.data.data;
                    let pointList = stringToList(item.pointList);
                    if (pointList.length >= 3) {
                        let polygonFeature = createPolygonFeature(pointList);
                        polygonFeature.set('name', item.id);
                        polygonSource.addFeature(polygonFeature);

                        polygonInfo[item.id] = {
                            id: item.id,
                            name: item.name,
                            agency: item.agency,
                            operator: item.creator,
                            editTime: getStandardTime(item.createTime),
                            markList: pointList,
                            feature: polygonFeature
                        }
                    }


                }
            })
        }

        const getRegion = () => {
            if (router.currentRoute.value.query.region_id) {
                getSingleRegion(router.currentRoute.value.query.region_id);
            } else {
                refresh_polygonInfo();
            }
        }
        getRegion();

        const createIconLayer = () => {
            iconSource = new SourceVec();
            let iconStyle = new Style({
                image: new Icon({
                    anchorOrigin: 'bottom-left',
                    anchorYUnits: "pixels",
                    opacity: 0.75,
                    src: '/images/location2.png'
                })
            });
            vectorLayer = new LayerVec({
                source: iconSource,
                style: iconStyle,
                zIndex: 15,
            });
            map.addLayer(vectorLayer);
        }

        let polygonSource;
        let fenceStyle;
        let fenceLayer;

        const createPolygonLayer = () => {
            polygonSource = new SourceVec();
            fenceStyle = new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new Stroke({
                    color: '#ffcc33',
                    width: 5
                }),
                image: new Circle({
                    radius: 7,
                    fill: new Fill({
                        color: '#ffcc33'
                    })
                })
            });
            fenceLayer = new LayerVec({
                source: polygonSource,
                style: fenceStyle,
                zIndex: 10
            });
            map.addLayer(fenceLayer)
        }

        const createOverlayClick = () => {
            overlayClick = map.on('dblclick', function (e) {
                let coordinate = e.coordinate;
                let feature = map.forEachFeatureAtPixel(e.pixel, function (feature) {
                    return feature;
                });

                if (feature) {
                    content.innerHTML = '';

                    let featureId = feature.get('name');
                    if (featureId != "jinNiu" && featureId != "banshichu") {
                        let name = document.createElement('p');
                        name.innerText = '围栏名: ' + polygonInfo[featureId].name;
                        content.appendChild(name);

                        let agency = document.createElement('p');
                        agency.innerText = '所属办事处: ' + polygonInfo[featureId].agency;
                        content.appendChild(agency);

                        let operator = document.createElement('p');
                        operator.innerText = '操作人: ' + polygonInfo[featureId].operator;
                        content.appendChild(operator);



                        popup.setPosition(coordinate);
                    } else if (featureId == "banshichu") {
                        content.innerHTML = "";
                        let name = document.createElement("p");
                        name.innerText = "办事处名: " + feature.get('banshichuName');
                        content.appendChild(name);
                        popup.setPosition(coordinate);
                    }


                }
            });
        }

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

        const createMarker = () => {
            if (createMarkerSignal.value === false) {
                markId = 0;
                unByKey(overlayClick);
                createDblClick();
                fenceInfo.value.name = "";
                fenceInfo.value.operator = "";
                fenceInfo.value.agency = "";
                fenceInfo.value.editTime = getTTime(new Date().toISOString());

                confirmOperation.value = true;
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
                unByKey(clickEvent);

                markerInfo = reactive({});
                confirmOperation.value = false;
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

        let num = 0;
        const createPolygonFeature = (markerList) => {
            const color = ['rgba(0, 255, 0, 0.5)', 'rgba(0, 0, 255, 0.5)', 'rgba(255, 0, 0, 0.5)', 'rgba(255, 255, 0, 0.5)', 'rgba(255,0,255, 0.5)', 'rgba(0,255,255, 0.5)'];
            let oltarget;

            if (markerList.length < 3) {
                return null;
            }
            // sortMarker(markerList);
            // console.log(sortPoint(markerList));
            //markerList = sortPoint(markerList);
            markerList.push(markerList[0])

            const tmp = new Polygon([markerList]);
            oltarget = new Feature(tmp);
            oltarget.setStyle(
                new Style({
                    fill: new Fill({ color: color[num % 6] }),
                    stroke: new Stroke({
                        lineDash: [10, 10, 10, 10],
                        color: "#4e98f444",
                        width: 3
                    })
                })
            );
            num++;
            return oltarget;
        }


        let isEdit = false;
        const addFence = () => {
            if (!isExitEdit) {
                addFenceVisiable.value = false;
            }

            if (markerInfo.length < 3) {
                console.log("点数不足");
                for (let point in markerInfo) {
                    iconSource.removeFeature(markerInfo[point].feature);
                }
            } else {
                let markerList = [];
                for (let point in markerInfo) {
                    markerList.push(markerInfo[point].point);
                    iconSource.removeFeature(markerInfo[point].feature);
                }
                markerInfo = reactive({});
                let oltarget;
                if (isExitEdit) {
                    oltarget = polygonInfo[beforeFeatureId].feature;
                    polygonSource.addFeature(oltarget);
                } else {

                    let newPolygon;
                    if (isEdit) {
                        newPolygon = {
                            id: beforeFeatureId,
                            name: fenceInfo.value.name,
                            agency: fenceInfo.value.agency,
                            creator: fenceInfo.value.operator,
                            createTime: getTTime(new Date().toISOString()),
                            pointList: JSON.stringify(markerList),
                        }
                    } else {
                        newPolygon = {
                            name: fenceInfo.value.name,
                            creator: fenceInfo.value.operator,
                            agency: fenceInfo.value.agency,
                            createTime: getTTime(new Date().toISOString()),
                            pointList: JSON.stringify(markerList),
                        }
                    }

                    axios({
                        url: "/api/region",
                        method: "post",
                        headers: {
                            Authorization: store.state.user.tokenHeader + store.state.user.token,
                        },
                        data: newPolygon,
                    }).then(function (resp) {
                        if (resp.status == 200) {
                            refresh_polygonInfo();
                        }
                    })

                }

                if (beforePreview != null) {
                    polygonSource.removeFeature(beforePreview);
                    beforePreview = null;
                }
                unByKey(dblClickEvent);
                unByKey(clickEvent);
                createMarkerSignal.value = false;
                isExitEdit = false;
                isEdit = false;
                exitEditAble.value = false;
                confirmOperation.value = false;
                createOverlayClick();

            }

        }

        const openAddDialog = () => {
            fenceInfo.value.editTime = getStandardTime(new Date().toISOString());
            addFenceVisiable.value = true;
        }

        let beforeFeatureId = "";
        let isExitEdit = false;
        const inEditFence = (editFence) => {
            Modal.getInstance("#edit-fench").hide();
            if (createMarkerSignal.value == false && isEdit == false) {
                unByKey(overlayClick);

                isEdit = true;
                exitEditAble.value = true;
                confirmOperation.value = true;

                let feature = polygonInfo[editFence].feature;
                fenceInfo.value.name = polygonInfo[editFence].name;
                fenceInfo.value.operator = polygonInfo[editFence].operator;
                fenceInfo.value.agency = polygonInfo[editFence].agency;
                fenceInfo.value.editTime = getStandardTime(new Date().toISOString());

                beforeFeatureId = editFence;
                polygonSource.removeFeature(feature);

                createDblClick();
                markId = 0;
                markerInfo = {};
                let marklist = polygonInfo[editFence].markList

                for (let idx in marklist) {
                    if (idx == marklist.length - 1) {
                        break;
                    }
                    let point = marklist[idx];
                    let iconFeature = new Feature({
                        geometry: new Point(point, "XY"),
                    });
                    iconSource.addFeature(iconFeature);
                    let iconTranslate = new Translate({
                        features: new Collection([iconFeature])
                    });
                    iconFeature.set('name', 'icon');
                    iconFeature.set('iconName', markId);
                    markId++;
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
            }
            editFenceName.value = "";

        };

        const exitEdit = () => {
            isExitEdit = true;
            addFence();
        }


        // const sortMarker = (markerList) => {
        //     let geometryPoints = [];
        //     let maxXPointIdx = 0;
        //     for (let i = 0; i < markerList.length; i++) {
        //         let gp = {
        //             X: markerList[i][0],
        //             Y: markerList[i][1],
        //             slope: null,
        //         };

        //         geometryPoints.push(gp);
        //         if (geometryPoints[maxXPointIdx].X < gp.X) {
        //             maxXPointIdx = i;
        //         } else if (geometryPoints[maxXPointIdx].X == gp.X && geometryPoints[maxXPointIdx].Y > gp.Y) {
        //             maxXPointIdx = i;
        //         }
        //     }

        //     for (let i = 0; i < markerList.length; i++) {
        //         if (i == maxXPointIdx) {
        //             geometryPoints[i].slope = 1e9;
        //         } else {
        //             geometryPoints[i].slope = (geometryPoints[i].Y - geometryPoints[maxXPointIdx].Y) / (geometryPoints[i].X - geometryPoints[maxXPointIdx].X);
        //         }
        //     }

        //     geometryPoints.sort(function (a, b) {
        //         if (a.slope < b.slope) {
        //             return 1;
        //         } else {
        //             return -1;
        //         }
        //     })

        //     for (let i in geometryPoints) {
        //         markerList[i] = [geometryPoints[i].X, geometryPoints[i].Y];
        //     }

        // }

        const deleteFence = (deleteFence) => {
            Modal.getInstance("#edit-fench").hide();

            axios({
                url: '/api/region/' + deleteFence + '/',
                method: 'delete',
                params: {
                    id: deleteFence,
                },
                headers: {
                    Authorization: store.state.user.tokenHeader + store.state.user.token,
                },
            }).then(function (resp) {
                console.log(resp);
            })

            refresh_polygonInfo();
        }

        // const deleteMoreViewPort = () => {
        //     let dom = document.getElementsByClassName("ol-viewport");
        //     if (dom.length > 1) {
        //         dom[0].remove();
        //     }
        // }

        // const switchColor = () => {
        //     const canvas = document.getElementsByTagName('canvas');
        //     console.log(canvas);
        //     const vectorContext = toContext(canvas[1].getContext('2d'))
        //     const fill = new Fill({ color: "rgba(255, 250, 250, 0.0)" });
        //     const style = new Style({
        //         fill: fill,
        //     });
        //     vectorContext.setStyle(style);
        // }

        onMounted(() => {
            initMap();
        });

        let beforePreview = null;
        const preview = () => {
            let len = Object.keys(markerInfo).length;
            if (len >= 3) {
                if (beforePreview != null) {
                    polygonSource.removeFeature(beforePreview);
                }
                let markerList = [];

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

        const inEditMessage = () => {
            ElMessage({
                message: '处于编辑状态中！',
                type: 'warning',
                duration: 2000,
            })
        }


        return {
            createMarker,
            addFence,
            inEditFence,
            exitEdit,
            deleteFence,
            inEditMessage,
            openAddDialog,
            editFenceName,
            fenceInfo,
            polygonInfo,
            confirmOperation,
            exitEditAble,
            isDisabled,
            addFenceVisiable,
        }


    },



};
</script>
  
<style scoped>
.tileLayer {
    background-color: rgba(255, 165, 0, 0.05);
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    opacity: 50%;
}

.map {
    width: 100vw;
    height: 100vh;
    /* background-color: rgba(255, 165, 0, 0.05);
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    opacity: 50%; */
    /*深色样式div背景色*/

    /* background-color: rgba(43, 51, 73, 0.82);
    background-image: radial-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3), #000); */

}

canvas {
    background-color: rgba(255, 165, 0, 0.05);
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    opacity: 50%;
}

.buttonBox {
    position: absolute;
    left: 35%;
    top: 70px;
    z-index: 5;
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

.editFenceNone:hover {
    color: #A0D8FF;
}

.editFenceNone,
.editFenceNone:focus:not(.editFenceNone:hover) {
    color: #409EFF;
}
</style>

