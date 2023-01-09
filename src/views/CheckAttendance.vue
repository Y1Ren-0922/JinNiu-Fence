<template>

    <div class="container">
        <div class="row center-block">
            <div class="col-12">
                <div class="card" style="margin-top: 8vh;">
                    <div class="card-body">
                        <el-table :data="tableData" style="width: 100%; font-size: 18px;"
                            @cell-dblclick="mainTableDblclick" class="table">
                            <el-table-column prop="id" label="序号" width="150" header-align="center" align="center" />
                            <el-table-column prop="street" label="街道" width="180" header-align="center"
                                align="center" />
                            <el-table-column prop="zaibian" label="在编" width="180" header-align="center"
                                align="center" />
                            <el-table-column prop="choudiao" label="抽调" width="180" header-align="center"
                                align="center" />
                            <el-table-column prop="buxiu" label="轮休" width="180" header-align="center" align="center" />
                            <el-table-column prop="qingjia" label="请假" width="180" header-align="center"
                                align="center" />
                            <el-table-column prop="onWork" label="在岗在位" width="180" header-align="center"
                                align="center" />
                        </el-table>

                        <el-dialog v-model="dialogTableVisible" :title="dialogTitle" :center="ifCenter" width="40%">
                            <el-table :data="peopleData">
                                <el-table-column property="id" label="序号" width="200" header-align="center"
                                    align="center" />
                                <el-table-column property="name" label="姓名" width="200" header-align="center"
                                    align="center" />
                                <el-table-column property="telephone" label="电话" header-align="center" align="center" />
                            </el-table>
                        </el-dialog>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { reactive, ref } from 'vue';

export default {
    setup() {
        const dialogTableVisible = ref(false);
        const dialogTitle = ref("");
        const ifCenter = ref(false);

        const tableData = [
            {
                id: '1',
                street: '街道1',
                zaibian: '10',
                choudiao: '5',
                buxiu: '3',
                qingjia: '1',
                onWork: '50',
            },
            {
                id: '2',
                street: '街道2',
                zaibian: '10',
                choudiao: '5',
                buxiu: '3',
                qingjia: '1',
                onWork: '50',
            },
            {
                id: '3',
                street: '街道3',
                zaibian: '10',
                choudiao: '5',
                buxiu: '3',
                qingjia: '1',
                onWork: '50',
            },
            {
                id: '4',
                street: '街道4',
                zaibian: '10',
                choudiao: '5',
                buxiu: '3',
                qingjia: '1',
                onWork: '50',
            },
        ]

        const peopleData = reactive([
            { id: '1', name: '张三', telephone: '12345678912' },
            { id: '2', name: '李四', telephone: '12345678912' }
        ]);

        const mainTableDblclick = (row, column) => {
            if (column.label != "序号" && column.label != "街道") {
                dialogTitle.value = row.street + "街道" + column.label + "人员明细表";
                ifCenter.value = true;
                dialogTableVisible.value = true;
            }


        }



        return {
            tableData,
            dialogTitle,
            dialogTableVisible,
            peopleData,
            ifCenter,
            mainTableDblclick,

        }
    }
}


</script>

<style scoped>
.table {
    cursor: pointer;
    user-select: none;
}
</style>