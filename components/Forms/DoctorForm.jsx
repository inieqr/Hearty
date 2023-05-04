import {
    FormControl,
    Text,
    FormHelperText,
    Input,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Container,
    VStack,
    Button,
    Link,
    StackDivider,
    Stack, Textarea,
    Tooltip,
    FormLabel,
    InputLeftAddon,
    Collapse,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    Select,
    NumberDecrementStepper, Radio, RadioGroup
} from '@chakra-ui/react'

import { Formik, Form } from 'formik';
import { modelPredict, transformLabData } from 'lib/HeartModel';
import { useState } from 'react';

export const DoctorForm = () => {
    const [chestType, setChestType] = useState('TA');
    const [exerciseAngina, setExerciseAngina] = useState('N');
    const [restingECG, setRestingECG] = useState('Normal');
    const [slope, setSlope] = useState('Flat');
    const [res, setRes] = useState('');
    const [submitted, setIsSubmitted] = useState(false);
    const [status, setStatus] = useState('success');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const age = document.getElementById('age').value;
        const sex = document.getElementById('sex').value;
        // const chestPainType = document.getElementById('chestPainType').value;
        const restingBP = document.getElementById('restingBP').value;
        const cholesterol = document.getElementById('cholesterol').value;
        const fastingBS = parseInt(document.getElementById('fastingBS').value);
        // const restingECG = document.getElementById('restingECG').value;
        const maxHR = document.getElementById('maxHR').value;
        // const exerciseAngina = document.getElementById('exerciseAngina').value;
        const oldpeak = document.getElementById('oldpeak').value;
        // const sl_slope = document.getElementById('sl_slope').value;

        const data = {
            "Age": age,
            "Sex": sex,
            "ChestPainType": chestType,
            "RestingBP": restingBP,
            "Cholesterol": cholesterol,
            "FastingBS": fastingBS,
            "RestingECG": restingECG,
            "MaxHR": maxHR,
            "ExerciseAngina": exerciseAngina,
            "Oldpeak": oldpeak,
            "ST_Slope": slope,
        }

        const res = modelPredict("model_lab", transformLabData(data));
        const res_str = res === "1" ? "At risk" : "Not at risk";
        const bg = res === "1" ? "error" : "success";
        setStatus(bg);
        setRes(res_str);
        setIsSubmitted(true);

        let stats = localStorage.getItem('uniheart_stats');

        stats = JSON.parse(stats);
        let newObj = {
            "name": "John Doe",
            "date": new Date().toLocaleDateString(),
            "type": "lab",
            "enteredData": data,
            "prediction": res_str
        }

        stats.push(newObj);
        localStorage.setItem('uniheart_stats', JSON.stringify(stats));
    }

    return (
        <Container maxW='container.lg'>
            <Text fontWeight='bold' mb='4' color='red.400'>
                The lab prediction is more technical and relies on data from blood tests.
            </Text>

            <Formik
                initialValues={{ name: 'Sasuke' }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2))
                        actions.setSubmitting(false)
                    }, 1000)
                }}
            >
                <Form>
                    {!submitted && <VStack
                        divider={<StackDivider borderColor='gray.200' />}
                        spacing={4}
                        align='stretch'
                    >
                        <FormControl isRequired borderRadius="20" color="gray.900">
                            <FormLabel>Age</FormLabel>
                            <FormHelperText mb='2'>
                                Your age in years
                            </FormHelperText>
                            <NumberInput step={5} defaultValue={15} min={2} max={120} id='age'>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <FormControl isRequired borderRadius="20" color="gray.900">
                            <FormLabel>Sex</FormLabel>
                            <FormHelperText mb='2'>
                                Your biological sex (M/F)
                            </FormHelperText>
                            <Select id='sex'>
                                <option value='M'>Male</option>
                                <option value='F'>Female</option>
                            </Select>
                        </FormControl>

                        <FormControl isRequired borderRadius="20" color="gray.900">
                            <FormLabel>Chest Pain Type</FormLabel>
                            <FormHelperText mb='2'>
                                For more information on types of chest pain, head to the <Link href='https://www.heart.org/en/health-topics/heart-attack/angina-chest-pain' color='blue.300' isExternal>American Heart Association</Link>
                            </FormHelperText>
                            <RadioGroup onChange={e => setChestType(e)} value={chestType}>
                                <Stack spacing={5} direction='row'>
                                    <Radio colorScheme='red' value='TA'>
                                        Typical Angina
                                    </Radio>
                                    <Radio colorScheme='green' value='ATA'>
                                        ATypical Angina
                                    </Radio>
                                    <Radio colorScheme='blue' value='NAP'>
                                        Non-Anginal Pain
                                    </Radio>

                                    <Radio colorScheme='orange' value='ASY'>
                                        Asymptomatic
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        <FormControl isRequired borderRadius="20" color="gray.900">
                            <FormLabel>Resting Blood Pressure</FormLabel>
                            <FormHelperText mb='2'>
                                Your resting blood pressure in millimeters of mercury (mmHg)
                            </FormHelperText>
                            <NumberInput id='restingBP' defaultValue={80}>
                                <NumberInputField />
                                <NumberInputStepper >
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>

                        </FormControl>

                        <FormControl isRequired borderRadius="20" color="gray.900">
                            <FormLabel>Cholesterol (mm/dl)</FormLabel>
                            <FormHelperText mb='2'>
                                Your Cholesterol level in millimoles per deciliter (mm/dl)
                            </FormHelperText>
                            <NumberInput id='cholesterol' defaultValue={100}>
                                <NumberInputField />
                                <NumberInputStepper >
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <FormControl isRequired borderRadius="20" color="gray.900">
                            <FormLabel>High Fasting Blood Sugar </FormLabel>
                            <FormHelperText mb='2'>
                                Is the fasting blood sugar above 120 mg/dl?
                            </FormHelperText>
                            <Select id='fastingBS'>
                                <option value='1'>Yes</option>
                                <option value='0'>No</option>
                            </Select>
                        </FormControl>

                        <FormControl isRequired borderRadius="20" color="gray.900">
                            <FormLabel>Resting ECG</FormLabel>
                            <FormHelperText mb='2'>
                                Your resting ECG in milligrams per deciliter (mg/dl)
                            </FormHelperText>
                            <RadioGroup defaultValue='2' id='restingECG' onChange={e => setRestingECG(e)} value={restingECG}>
                                <Stack spacing={5} direction='row'>
                                    <Radio colorScheme='red' value='Normal'>
                                        Normal
                                    </Radio>
                                    <Tooltip hasArrow label='having ST-T wave abnormality (T wave inversions and/or ST elevation or depression of > 0.05 mV)'>
                                        <Radio colorScheme='green' value='ST'>
                                            ST
                                        </Radio>
                                    </Tooltip>
                                    <Tooltip hasArrow label="showing probable or definite left ventricular hypertrophy by Estes' criteria">
                                        <Radio colorScheme='blue' value='LVH'>
                                            LVH
                                        </Radio>
                                    </Tooltip>
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        <FormControl isRequired borderRadius="20" color="gray.900">
                            <FormLabel>Max Heart Rate</FormLabel>
                            <FormHelperText mb='2'>
                                Your maximum heart rate in beats per minute (BPM)
                            </FormHelperText>
                            <NumberInput id='maxHR' defaultValue={100}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <FormControl isRequired borderRadius="20" color="gray.900">
                            <FormLabel>Exercise Induced Angina</FormLabel>
                            <FormHelperText mb='2'>
                                Is exercise-induced angina present?
                            </FormHelperText>
                            <RadioGroup id='exerciseAngina' onChange={e => setExerciseAngina(e)} value={exerciseAngina}>
                                <Stack spacing={5} direction='row'>
                                    <Radio colorScheme='red' value='Y'>
                                        Yes
                                    </Radio>
                                    <Radio colorScheme='red' value='N'>
                                        No
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        <FormControl isRequired borderRadius="20" color="gray.900">
                            <FormLabel>Oldpeak</FormLabel>

                            <FormHelperText mb='2'>
                                Your oldpeak in units of depression (integer value)
                            </FormHelperText>
                            <NumberInput id='oldpeak' defaultValue={1}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>



                        <FormControl isRequired borderRadius="20" color="gray.900">
                            <FormLabel>Shape of ST Slope</FormLabel>
                            <FormHelperText mb='2'>
                                Your ST slope (the slope of the peak exercise ST segment)
                            </FormHelperText>
                            <RadioGroup defaultValue='2' id='sl_slope' onChange={e => setSlope(e)} value={slope}>
                                <Stack spacing={5} direction='row'>
                                    <Radio colorScheme='red' value='Up'>
                                        Up
                                    </Radio>
                                    <Radio colorScheme='red' value='Down'>
                                        Down
                                    </Radio>
                                    <Radio colorScheme='red' value='Flat'>
                                        Flat
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        <Button color="white" bg="red.400" _hover={{ bg: "red.500" }} type="submit" onClick={handleSubmit}>Submit</Button>
                    </VStack>}
                    {submitted && <Alert
                        status={status}
                        variant='subtle'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                        textAlign='center'
                        height='200px'
                    >
                        <AlertIcon boxSize='40px' mr={0} />
                        <AlertTitle mt={4} mb={1} fontSize='lg'>
                            Prediction: {res}!
                        </AlertTitle>
                        <AlertDescription maxWidth='sm' fontStyle='italic'>
                            Note: UniHeart is not a medical device and does not diagnose or treat conditions.
                        </AlertDescription>
                    </Alert>}
                </Form>
            </Formik>
        </Container >
    )
}

/*
Model Parameters (Pass to transform data in a json object):
        Age: age of the patient [years]
        Sex: sex of the patient [M: Male, F: Female]
        ChestPainType: chest pain type [TA: Typical Angina, ATA: Atypical Angina, NAP: Non-Anginal Pain, ASY: Asymptomatic]
        RestingBP: resting blood pressure [mm Hg]
        Cholesterol: serum cholesterol [mm/dl]
        FastingBS: fasting blood sugar [1: if FastingBS > 120 mg/dl, 0: otherwise]
        RestingECG: resting electrocardiogram results [Normal: Normal, ST: having ST-T wave abnormality (T wave inversions and/or ST elevation or depression of > 0.05 mV), LVH: showing probable or definite left ventricular hypertrophy by Estes' criteria]
        MaxHR: maximum heart rate achieved [Numeric value between 60 and 202]
        ExerciseAngina: exercise-induced angina [Y: Yes, N: No]
        Oldpeak: oldpeak = ST [Numeric value measured in depression]
        ST_Slope: the slope of the peak exercise ST segment [Up: upsloping, Flat: flat, Down: downsloping]
        HeartDisease: output class [1: heart disease, 0: Normal]
*/