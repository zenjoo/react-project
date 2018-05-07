import React, {Component} from 'react';
import './equipment-section.less';
import Nav from 'components/Nav/Nav';

export default class RankSection extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        var self=this;
        self._equipment()
    }
    _equipment(){

        var opation=
        {
            chart: {
                type: 'area'
            },
            title: {
                text: '美苏核武器库存量'
            },
            subtitle: {
                text: '数据来源: <a href="https://thebulletin.metapress.com/content/c4120650912x74k7/fulltext.pdf">' +
                'thebulletin.metapress.com</a>'
            },
            xAxis: {
                allowDecimals: false,
                    labels: {
                    formatter: function () {
                        return this.value; // clean, unformatted number for year
                    }
                }
            },
            yAxis: {
                title: {
                    text: '核武库国家'
                },
                labels: {
                    formatter: function () {
                        return this.value / 1000 + 'k';
                    }
                }
            },
            tooltip: {
                pointFormat: '{series.name} 制造 <b>{point.y:,.0f}</b>枚弹头'
            },
            plotOptions: {
                area: {
                    pointStart: 1940,
                        marker: {
                        enabled: false,
                            symbol: 'circle',
                            radius: 2,
                            states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [{
                name: '美国',
                data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
            }, {
                name: '苏联/俄罗斯',
                data: [null, null, null, null, null, null, null, null, null, null,
                    5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
                    4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
                    15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
                    33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
                    35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
                    21000, 20000, 19000, 18000, 18000, 17000, 16000]
            }]
        }


        Highcharts.chart('equipment-chart',opation);


    }
    render(){
        return(
            <div className="equipment-section shandow">
                <div className='jiao'>
                    <div className='top'></div>
                    <div className='right'></div>
                    <div className='bottom'></div>
                    <div className='left'></div>
                </div>
                <p className="rank-title">》预警热力图</p>
                <div className="sel-section flex">
                    <div className="change-tab flex">
                        <div>公安实战</div>
                        <div>社会共治</div>
                    </div>
                </div>
                <div id="equipment-chart" className="equipment-chart">
                </div>
                <div className="lagend-r flex">
                    <div><i></i><span>在线</span></div>
                    <div><i></i><span>离线</span></div>
                    <div><i></i><span>故障</span></div>
                    <div><i></i><span>维修</span></div>
                </div>
            </div>
        )
    }
}