import Chart from 'chart.js/auto' // needed for "no tree shaking"
import { Bar, Pie, PolarArea, Line } from 'react-chartjs-2';
import { Heading, Text, Box, SimpleGrid } from '@chakra-ui/react';

export const Charts = ({ data }) => {
    data = Array.from(data);
    let numberPositive = data.filter(d => d.prediction === "At risk").length;
    let numberNegative = data.filter(d => d.prediction === "Not at risk").length;

    // create a new list with values as each unique date in obj
    let dates = data.map(d => d.date);
    let uniqueDates = [...new Set(dates)].sort((a, b) => new Date(a) - new Date(b));
    ;

    // create a new list with values as the grouped number of at risk predictions for each date in the unique dates list
    let groupedDates = [];
    let groupedDatesNon = []
    for (let i = 0; i < uniqueDates.length; i++) {
        let currDates = data.filter(d => d.date === uniqueDates[i]);
        let currDatesAtRisk = currDates.filter(d => d.prediction === "At risk").length;
        groupedDates.push(currDatesAtRisk);
        groupedDatesNon.push(currDates.length - currDatesAtRisk);
    }



    const numData = {
        "labels": [
            "At risk predictions",
            "Not at risk predictions"
        ],
        "datasets": [
            {
                "label": "# of Votes",
                "data": [
                    numberPositive,
                    numberNegative,
                ],
                "backgroundColor": [
                    "#FF7F7F",
                    "#90ee90"

                ]
            }
        ]
    }

    const dateData = {
        "labels": uniqueDates,
        "datasets": [
            {
                "label": "Number of At Risk Predictions by Date",
                "data": groupedDates,
                borderColor: '#FF7F7F',
                backgroundColor: '#FF7F7F',
            }
        ],
    }

    const dateDataNon = {
        "labels": uniqueDates,
        "datasets": [
            {
                "label": "Number of Not At Risk Predictions by Date",
                "data": groupedDatesNon,
                borderColor: '#90ee90',
                backgroundColor: '#90ee90',
            }
        ],
    }


    return (
        <SimpleGrid columns={{ base: 1, md: 2 }}>
            <Box>
                <Box shadow="lg" p={4} textAlign="center" mt='4' maxW='500px' mx='auto'>
                    <Heading color="gray.800" fontSize='2xl'>Number of At Risk Predictions Over Time</Heading>
                    <Line data={dateData} />
                    <Text mt="4" fontSize="xl">{data.desc}</Text>
                </Box>
                <Box shadow="lg" p={4} textAlign="center" mt='4' maxW='500px' mx='auto'>
                    <Heading color="gray.800" fontSize='2xl'>Number of Not At Risk Predictions Over Time</Heading>
                    <Line data={dateDataNon} />
                    <Text mt="4" fontSize="xl">{data.desc}</Text>
                </Box>
            </Box>


            <Box>
                <Box shadow="lg" p={4} textAlign="center" mt='4' maxW='500px' mx='auto'>
                    <Heading color="gray.800" fontSize='2xl'>Total Number of Predictions</Heading>
                    <Pie data={numData} />
                    <Text mt="4" fontSize="xl">{data.desc}</Text>
                </Box>
            </Box>
        </SimpleGrid>
    )
}

