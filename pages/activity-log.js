import Head from 'next/head'
import { Sidebar } from '@components/Sidebar'
import { Model } from '@components/Forms/Model.jsx'
import { useEffect } from 'react'
import { TableComponent } from '@components/stats/TableComponent'
import { EnvTableComponent } from '@components/stats/EnvTableComponent'
import { useState } from 'react'
import { ActivityCharts } from '@components/stats/ActivityCharts'
import { ActivityTable } from '@components/stats/ActivityTable'
import { ActivityInfo } from '@components/stats/ActivityInfo'
export default function ActivityLog() {
    const [totalData, setTotalData] = useState('');
    useEffect(() => {

        if (localStorage.getItem('uniheart_login_state') === 'false' || localStorage.getItem('uniheart_login_state') === null) {
            window.location.href = '/login?msg=Please login to predict for heart disease!'
        }



        const tableData = JSON.parse(localStorage.getItem('uniheart_act_stats'));
        console.log(tableData);
        setTotalData(tableData)
    }, []);

    return (
        <>
            <Head>
                <title>Activity Log - UniHeart</title>
            </Head>
            <Sidebar active='activity log'>


                <ActivityInfo data={totalData} />

                <ActivityCharts data={totalData} />

                <ActivityTable data={totalData} />

            </Sidebar>
        </>
    )
}


/*
Structure of the previous prediction data (stored in localstorage)
[
    {
        "date": "2020-04-01",
        "type": "lab",

    }
]
*/
