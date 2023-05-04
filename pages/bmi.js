import Head from 'next/head'
import { Sidebar } from '@components/Sidebar'
import { Container } from '@chakra-ui/react'
import { Bmi } from '@components/Forms/Bmi'
import { useEffect } from 'react'


export default function BmiCalc() {
    useEffect(() => {
        if (localStorage.getItem('uniheart_login_state') === 'false') {
            window.location.href = '/login?msg=Please login to use this feature!'
        }
    }, []);
    return (
        <>
            <Head>
                <title>BMI Calculator - UniHeart</title>
            </Head>
            <Sidebar active='bmi calculator'>
                <Container maxW='container.lg' p={4}>
                    <Bmi />

                </Container>

            </Sidebar>
        </>
    )
}
