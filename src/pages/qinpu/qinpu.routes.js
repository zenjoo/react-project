//import PerceptionQingpuModel from 'bundle-loader?page/perception-qingpu/perception-qingpu';
import PerceptionQingpuModel from 'bundle-loader?lazy!./perception-qingpu/perception-qingpu';
import page1Route from './perception-qingpu/page1/page1.routes';


let PerceptionQingpuRoutes = [
    {
        path: '/perception-qingpu',
        component: PerceptionQingpuModel,
        routes:[

        ]
    }
]
PerceptionQingpuRoutes=PerceptionQingpuRoutes.concat(
    page1Route
);
console.log(PerceptionQingpuRoutes)

export default PerceptionQingpuRoutes;