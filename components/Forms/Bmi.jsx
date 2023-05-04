import {
    FormControl,
    Text,
    SimpleGrid,
    Input,
    Button,
    Box,
    Stack,
    InputGroup,
    InputLeftAddon,
    Collapse
} from '@chakra-ui/react'
import { HeadingWithDesc } from '@components/Headings/HeadingWithDesc';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';


export const Bmi = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [bmiVal, setBmiVal] = useState(0);
    const [bmiText, setBmiText] = useState('');
    const [color, setColor] = useState('#ffffff');


    const handleSubmit = async (event) => {
        event.preventDefault();

        const height = document.getElementById('height').value;
        const weight = document.getElementById('weight').value;
        const bmi = (weight / height ** 2).toFixed(2);
        const bg = document.getElementById('bg');

        if (bmi > 34.9) {
            setColor('red.500')
            setBmiText('Extremely Obese');
        }
        else if (bmi > 30) {
            setColor('red.300')
            setBmiText('Obese');
        }
        else if (bmi > 25) {
            setColor('yellow.300');
            setBmiText('Overweight');
        }
        else if (bmi > 18.5) {
            setColor('green.300');
            setBmiText('Normal');
        }
        else {
            setColor('blue.300');
            setBmiText('Underweight');
        }
        setBmiVal(bmi);
        setIsOpen(true);
    }



    return (
        <>
            <HeadingWithDesc>
                BMI Calculator
            </HeadingWithDesc>

            <SimpleGrid columns={{ base: '1', md: '2' }} spacing="40px" >
                <Stack spacing={4} maxW='600px'>
                    <InputGroup>
                        <InputLeftAddon fontWeight='semibold'>
                            Height (m)
                        </InputLeftAddon>
                        <Input type='number' placeholder='e.g. 1.58' id='height' />
                    </InputGroup>

                    <InputGroup>
                        <InputLeftAddon fontWeight='semibold'>
                            Weight (kg)
                        </InputLeftAddon>
                        <Input type='number' placeholder='e.g. 60' id='weight' />
                    </InputGroup>
                    <Button onClick={handleSubmit} bg='red.400' color='white.off' fontWeight='bold' _hover={{ bg: 'red.500' }}>Submit</Button>
                </Stack>

                <Box alignSelf='flex-start'>
                    <Collapse in={isOpen} animateOpacity>
                        <Box
                            p='40px'
                            id='bg'
                            bg={color}
                            rounded='md'
                            shadow='md'
                            color='black.light'
                        >
                            <Text fontSize='2xl' fontWeight='bold'>Your BMI:</Text>
                            <Text id='bmi' fontSize='xl'>{bmiVal}</Text>
                            <Text fontSize='lg' fontWeight='bold'>{bmiText}</Text>
                        </Box>
                    </Collapse>
                </Box>
            </SimpleGrid >

            <Text mt='4' fontSize='md' fontStyle='italic' fontWeight=''>*BMI alone is not always an accurate representation one&apos;s health</Text>

        </>

    )
}
function round(num, decimalPlaces = 0) {
    num = Math.round(num + "e" + decimalPlaces);
    return Number(num + "e" + -decimalPlaces);
}
