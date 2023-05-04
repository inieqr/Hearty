import Head from 'next/head'
import { Sidebar } from '@components/Sidebar'
import { Model } from '@components/Forms/Model.jsx'
import { useEffect } from 'react'

export default function Predict() {

    useEffect(() => {
        if (localStorage.getItem('uniheart_login_state') === 'false' || localStorage.getItem('uniheart_login_state') === null) {
            window.location.href = '/login?msg=Please login to predict for heart disease!'
        }
    }, []);

    return (
        <>
            <Head>
                <title>Predict - UniHeart</title>
            </Head>
            <Sidebar active='predict'>
                <Model />


            </Sidebar>
        </>
    )
}
