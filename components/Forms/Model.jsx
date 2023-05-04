import { Tabs, TabList, TabPanels, Tab, TabPanel, Container, Radio, RadioGroup } from '@chakra-ui/react'
import { EnviroForm } from '@components/Forms/EnviroForm'
import { DoctorForm } from '@components/Forms/DoctorForm'

export const Model = () => {
    return (
        <Container maxW='container.lg'>
            <Tabs isFitted variant='enclosed'>
                <TabList mb='1em' >
                    <Tab _focus={{}}>Environmental Prediction</Tab>
                    <Tab _focus={{}}>Lab Prediction</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <EnviroForm />

                    </TabPanel>
                    <TabPanel>
                        <DoctorForm />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    )
}