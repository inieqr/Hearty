import Head from 'next/head'
import { Sidebar } from '@components/Sidebar'
import { Model } from '@components/Forms/Model.jsx'
import { useEffect } from 'react'
import { TableComponent } from '@components/stats/TableComponent'
import { EnvTableComponent } from '@components/stats/EnvTableComponent'
import { useState } from 'react'
import { Charts } from '@components/stats/Charts'

export default function Statistics() {
    const [tableData, setTableData] = useState('');
    const [envTableData, setEnvTableData] = useState('');
    const [totalData, setTotalData] = useState('');
    useEffect(() => {

        if (localStorage.getItem('uniheart_login_state') === 'false' || localStorage.getItem('uniheart_login_state') === null) {
            window.location.href = '/login?msg=Please login to predict for heart disease!'
        }



        const tableData = JSON.parse(localStorage.getItem('uniheart_stats'));
        let other = tableData;
        const envTableData = JSON.parse(localStorage.getItem('env_uniheart_stats'));

        other.push(...envTableData);
        setTableData(tableData)
        setEnvTableData(envTableData)
        setTotalData(other)
    }, []);

    return (
        <>
            <Head>
                <title>Statistics - UniHeart</title>
            </Head>
            <Sidebar active='prediction history'>
                <Charts data={totalData} />
                <TableComponent data={tableData} />
                <EnvTableComponent data={envTableData} />


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
