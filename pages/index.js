import Head from 'next/head'
import { NavBar } from '@components/NavBar'
import { HomeLanding } from '@components/Landing/HomeLanding'
import { Box, Heading, SimpleGrid, Img, Icon, Button, Container, Text, chakra } from '@chakra-ui/react'
import { MedSep } from '@components/Separators/MedSep'
import { TextSep } from '@components/Separators/TextSep'
import { HeadingWithDesc } from '@components/Headings/HeadingWithDesc'
import { FaLeaf } from 'react-icons/fa'
import { BiTestTube } from 'react-icons/bi'
import { useEffect } from 'react'
import EnvSampleData from '../data/envSampleStats.json'
import SampleData from '../data/sampleStats.json'
import actStats from '../data/actStats.json'
export default function Home() {
  useEffect(() => {
    if (localStorage.getItem('uniheart_stats') == null) {
      // set sample data
      localStorage.setItem('uniheart_stats', JSON.stringify(SampleData))
    }

    if (localStorage.getItem('env_uniheart_stats') == null) {
      // set sample data
      localStorage.setItem('env_uniheart_stats', JSON.stringify(EnvSampleData))
    }

    if (localStorage.getItem('uniheart_act_stats') == null) {
      // set sample data
      localStorage.setItem('uniheart_act_stats', JSON.stringify(actStats))
    }
  }, []);

  return (
    <>
      <Head>
        <title>UniHeart</title>
      </Head>
      <NavBar active='home' />
      <HomeLanding />

      <TextSep />

      <Container maxW={'container.xl'} p={4}>
        <HeadingWithDesc>
          Who are we?
        </HeadingWithDesc>
        <Text fontSize='lg' color='gray.500'>UniHeart is a organization dedicated to preventing the 1 in 3 global deaths from Heart Disease. Using two machine learning models, UniHeart has an accuracy of 85% and 61% respectively. With UniHeart, people who were not previously able to receive advanced health care have a free and accessible alternative to determine their chances of having heart disease.</Text>

        <TextSep />

        <Heading as="h1" size="xl" color="black.light" mb="4" fontWeight="extrabold" textAlign='center'>Our  <chakra.span color='red.400'>Models</chakra.span></Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={24} mt={4} id='models'>
          <Box shadow='lg' p={4} rounded='md' bg='white.full' >
            <Box d='flex'>
              <Icon as={FaLeaf} fontSize='4xl' mr={4} color='green.300' />
              <Heading as="h2" size="lg" color="black.light" mb="4" fontWeight="extrabold">Environmental Model</Heading>
            </Box>

            <Text fontSize='lg' color='gray.500'>The environmental model is designed for everyday people to use. Users are able to input their age, sex, height, weight, whether they drink/smoke/are active, is able to get a result of whether or they have heart disease.</Text>

            <Text fontSize='xl' color='green.300' fontWeight='bold' mt={4}><chakra.span color='gray.700'>Accuracy:</chakra.span> 61%</Text>
          </Box>

          <Box shadow='lg' p={4} rounded='md' bg='white.full' >
            <Box d='flex'>
              <Icon as={BiTestTube} fontSize='4xl' mr={4} color='green.300' />
              <Heading as="h2" size="lg" color="black.light" mb="4" fontWeight="extrabold">Lab Model</Heading>
            </Box>

            <Text fontSize='lg' color='gray.500'>The lab model was created for doctors to input a patient&apos;s medical data and get a more accurate result of their patient&apos; chance of having heart disease.</Text>
            <Text fontSize='xl' color='green.300' fontWeight='bold' mt={4}><chakra.span color='gray.700'>Accuracy:</chakra.span> 85%</Text>

          </Box>
        </SimpleGrid>
      </Container>

    </>
  )
}
