import React, {Component} from 'react';
import './perception-qingpu.less';
import Nav from 'components/Nav/Nav';
import {connect} from 'react-redux';
import api from "../../api/maintenance-api";
import ModelDanwei from './model-danwei/model-danwei'

// import { Button ,ButtonGroup,ButtonToolbar,DropdownButton,MenuItem} from 'react-bootstrap';

class IndexList extends Component {
    constructor(props) {
        super(props);
        //this.handleChange = this.handleChange.bind(this);
        const personList=[
            {
                name:'张静',
                sex:'女',
                age:'18',
                card:'6228858293581925918241',
                address:'青浦区二连兴源603',
                flags:'精神病人'
            },
            {
                name:'张静',
                sex:'女',
                age:'18',
                card:'6228858293581925918241',
                address:'青浦区二连兴源603',
                flags:'精神病人'
            },
            {
                name:'张静',
                sex:'女',
                age:'18',
                card:'6228858293581925918241',
                address:'青浦区二连兴源603',
                flags:'精神病人'
            },
            {
                name:'张静',
                sex:'女',
                age:'18',
                card:'6228858293581925918241',
                address:'青浦区二连兴源603',
                flags:'精神病人'
            },
        ]
        this.state = {
            personList:personList,
        }
    }
    componentDidMount(){
        console.log($('body'))
        this._map()
    }

    handleChange(date) {
        this.setState({
           // startDate: date
        });
    }




    // 地图
    _map(){
        var self=this
        var district;

        var map = new AMap.Map('map',{
            //zoom: 10,
            mapStyle: 'amap://styles/dark',//样式URL
            resizeEnable: true,
            //center: [121.113021, 31.151209],//地图中心点
        });
        AMap.plugin(['AMap.ToolBar','AMap.Scale'],
            function(){
                map.addControl(new AMap.ToolBar());

                map.addControl(new AMap.Scale());

               // map.addControl(new AMap.OverView({isOpen:true}));
            });

        // AMap.plugin('AMap.DistrictSearch',function(){//回调函数
        //     var opts = {
        //         subdistrict: 1,   //返回下一级行政区
        //         extensions: 'all',  //返回行政区边界坐标组等具体信息
        //         level: 'district  '  //查询行政级别为 市
        //     };
        //     //实例化DistrictSearch
        //     district = new AMap.DistrictSearch(opts);
        //     district.setLevel('district');
        //     //行政区查询
        //     var opts = {
        //         subdistrict: 1,   //返回下一级行政区
        //         extensions: 'all',  //返回行政区边界坐标组等具体信息
        //         level: 'biz_area',  //查询行政级别为 市
        //         showbiz:false
        //     };
        //     //实例化DistrictSearch
        //     district.search('青浦区', function(status, result) {
        //         console.log(result.districtList)
        //         var bounds = result.districtList[0].boundaries;
        //         var polygons = [];
        //         if (bounds) {
        //             for (var i = 0, l = bounds.length; i < l; i++) {
        //                 //生成行政区划polygon
        //                 var polygon = new AMap.Polygon({
        //                     map: map,
        //                     strokeWeight: 3,
        //                     path: bounds[i],
        //                     fillOpacity: 0,
        //                     fillColor: '#fff',
        //                     strokeColor: '#CC66CC'
        //                 });
        //                 polygons.push(polygon);
        //             }
        //             // map.clearMap();
        //            // map.setFitView();//地图自适应
        //         }
        //     });
        //
        // })
        function initPage(DistrictCluster,PointSimplifier) {
            var colors = [
                '#0cc2f2',
                '#4fd2b1',
                '#90e36f',
                '#ffe700',
                '#ff9e00',
                '#ff6700',
                '#ff1800'
            ];
            var pointSimplifierIns = new PointSimplifier({
                map: map, //所属的地图实例
                zIndex: 110,
                autoSetFitView: false, //禁止自动更新地图视野
                getPosition: function(item) {

                    return item.position;
                },
                getHoverTitle: function(dataItem, idx) {
                    console.log(dataItem.dataItem)
                    return idx + ': ' + dataItem.dataItem.title;
                },
                //使用GroupStyleRender
                renderConstructor: PointSimplifier.Render.Canvas.GroupStyleRender,
                renderOptions: {
                    //点的样式
                    // pointStyle: {
                    //     width: 6,
                    //     height: 6,
                    //     fillStyle: 'rgba(153, 0, 153, 0.38)'
                    // },
                    //点的样式
                    pointStyle: {
                        fillStyle: 'red',
                        width: 5,
                        height: 5
                    },
                    // pointStyle: {
                    //     //绘制点占据的矩形区域
                    //     content: PointSimplifier.Render.Canvas.getImageContent(
                    //         'http://webapi.amap.com/theme/v1.3/markers/n/mark_b1.png',
                    //         function onload() {
                    //             pointSimplifierIns.renderLater();
                    //         },
                    //         function onerror(e) {
                    //             alert('图片加载失败！');
                    //         }),
                    //     //宽度
                    //     width: 150,
                    //     //高度
                    //     height: 150,
                    //     //定位点为底部中心
                    //     offset: ['-50%', '-100%'],
                    //     fillStyle: null,
                    //     strokeStyle: null
                    // },

                    getGroupId: function(item, idx) {

                        var parts = item.dataItem.position.split(',');

                        //按纬度区间分组
                        console.log(Math.abs(Math.round(parseFloat(parts[1]) / 5)))
                        if(idx>0 && idx<50){
                            return 1
                        }
                        if(idx>50 && idx<100){
                            return 2
                        }
                        if(idx>100 && idx<150){
                            return 3
                        }
                        return Math.abs(Math.round(parseFloat(parts[1]) / 5));
                    },
                    groupStyleOptions: function(gid) {

                        var size = 6;
                        return {
                            pointStyle: {
                                //content: gid % 2 ? 'circle' : 'rect',
                                fillStyle: colors[gid % colors.length],
                                width: size,
                                height: size
                            },
                            pointHardcoreStyle: {
                                width: size - 2,
                                height: size - 2
                            }
                        };
                    },
                    //鼠标hover时的title信息
                    hoverTitleStyle: {
                        position: 'top'
                    }
                }
            });
            var distCluster = new DistrictCluster({
                zIndex: 1000,
                map: map, //所属的地图实例
                topAdcodes: [310000],
                autoSetFitView: true,
                renderOptions: {
                    //基础样式
                    featureStyle: {
                        fillStyle: 'rgba(102,170,0,0.5)', //填充色
                        lineWidth: 2, //描边线宽
                        strokeStyle: 'rgba(31, 119, 180,0)', //描边色
                        //鼠标Hover后的样式
                        hoverOptions: {
                            fillStyle: 'rgba(255,255,255,0)'
                        }
                    },
                    //特定区划级别的默认样式
                    featureStyleByLevel: {
                        //全国
                        country: {
                            fillStyle: 'rgba(49, 163, 84, 0.8)'
                        },
                        //省
                        province: {
                            fillStyle: 'rgba(116, 196, 118, 0)'
                        },
                        //市
                        city: {
                            fillStyle: 'rgba(161, 217, 155, 0)'
                        },
                        //区县
                        district: {
                            fillStyle: 'rgba(255, 255, 255, 0)'
                        }
                    },
                    //直接定义某写区划面的样式
                    getFeatureStyle: function(feature, dataItems) {
                        // if (dataItems.length > 3000) {
                        //
                        //     return {
                        //         fillStyle: 'red'
                        //     };
                        //
                        // } else if (dataItems.length > 1000) {
                        //     return {
                        //         fillStyle: 'orange'
                        //     };
                        // }
                        if(feature.properties.adcode==310118){
                            return{
                                fillStyle: 'rgba(102,170,0,0)', //填充色
                                lineWidth: 2, //描边线宽
                                strokeStyle: '#CC66CC', //描边色
                            }
                        }

                        return {};
                    },
                    getClusterMarker: function(feature, dataItems, recycledMarker) {
                        return null;
                    }
                },

                getPosition: function(item) {

                    if (!item) {
                        return null;
                    }

                    var parts = item.position.split(',');

                    //返回经纬度
                    return [parseFloat(parts[0]), parseFloat(parts[1])];
                }
            });
            self.setState({
                map: map,
                distCluster:distCluster,
                pointSimplifierIns:pointSimplifierIns,
            });
            var currentAdcode = null;
            //监听区划面的点击
            distCluster.on('featureClick', function(e, feature) {
                debugger
                // distCluster.zoomToShowSubFeatures(feature.properties.adcode)


                currentAdcode = feature.properties.adcode;

                //获取该节点的聚合信息
                distCluster.getClusterRecord(currentAdcode, function(error, result) {

                    //currentAdcode已经更新，有新的点击
                    if (result.adcode !== currentAdcode) {
                        return;
                    }

                    //设置数据
                    pointSimplifierIns.setData(result.dataItems);
                })


            });

            // distCluster.on('renderFinish', function(e, result) {
            //
            //     var features = result.features, //当前绘制的features
            //         currentAdcodeExists = false;
            //
            //     for (var i = 0, len = features.length; i < len; i++) {
            //         if (currentAdcode === features[i].properties.adcode) {
            //
            //             currentAdcodeExists = true;
            //             break;
            //         }
            //     }
            //
            //     if (!currentAdcodeExists) {
            //         //如果当前adcode没有绘制，清除？
            //         //pointSimplifierIns.setData(null);
            //     }
            // });
            window.distCluster = distCluster;

            function refresh() {

                var zoom = map.getZoom();

                //获取 pointStyle
                var pointStyle = pointSimplifierIns.getRenderOptions().pointStyle;

                //根据当前zoom调整点的尺寸
                pointStyle.width = pointStyle.height = 2 * Math.pow(1.2, map.getZoom() - 3);

                // var zoom = map.getZoom();

                // if (zoom < 10) {

                //     pointSimplifierIns.hide();

                // } else {

                //     pointSimplifierIns.show();
                // }
            }

            map.on('zoomend', function() {
                refresh();
            });

            refresh();

            // var distCluster = new DistrictCluster({
            //     map: map, //所属的地图实例
            //     //返回数据项中的经纬度位置
            //     getPosition: function(item) {
            //         return item.position;
            //     }
            // });
            api.dataTest().then((csv)=>{
                var data = csv.split('\n');
                var arr=[]
                data.forEach(e=>{
                    arr.push({
                        title:'标题',
                        position:e
                    })
                })


                //设置数据
                distCluster.setData(arr);
                map.setZoomAndCenter(11, [121.113021, 31.151209]);

                //map.setFitView();//地图自适应
                // pointSimplifierIns.setData(data);
            })

            //随机创建一批点，仅作示意
            var data = createPoints(map.getCenter(), 100000);

        }
        AMapUI.loadUI(['geo/DistrictCluster','misc/PointSimplifier'], function(DistrictCluster,PointSimplifier) {

            //启动页面
            initPage(DistrictCluster,PointSimplifier);
        });

//随机生产点
        function createPoints(center, num) {
            var data = [];
            for (var i = 0, len = num; i < len; i++) {
                data.push({
                    position: [
                        center.getLng() + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 30,
                        center.getLat() + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 20
                    ]
                });
            }
            return data;
        }
    }

    render() {
        return (
           <div className='index-list'>
               <div className='map'>
                   <div id='map'>

                   </div>
               </div>
               <Nav index='1'></Nav>
               <div className='main'>
                   <div className='current-tab-info'>
                       <ModelDanwei></ModelDanwei>
                   </div>
               </div>
           </div>
        )
    }
}




export default IndexList;