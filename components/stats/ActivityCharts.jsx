import Chart from 'chart.js/auto' // needed for "no tree shaking"
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Heading, Text, Box, SimpleGrid } from '@chakra-ui/react';


export const ActivityCharts = ({ data }) => {
    data = Array.from(data);
    let bkgColorLst = [
        "#90ee90",
        "#FF7F7F",
        "#FFA07A",
        "#FFD700",
        "#FFFF00",
        "#00FF00",
        "#00FFFF",
        "#0000FF",
        "#8A2BE2",
        "#A52A2A",
        "#DEB887",
        "#5F9EA0",
        "#7FFF00",
        "#D2691E",
        "#FF7F50",
        "#FFA500",
        "#FFD700",
        "#FFFF00",
        "#00FF00",
        "#00FFFF",
        "#0000FF",
        "#8A2BE2",
        "#A52A2A",
        "#DEB887",
        "#5F9EA0",
        "#7FFF00",
    ]

    let dates = data.map(d => d.actDate);
    let uniqueDates = [...new Set(dates)].sort((a, b) => new Date(a) - new Date(b));
    ;

    console.log(uniqueDates);
    let groupedDates = [];
    // group the number of workouts by date
    for (let i = 0; i < uniqueDates.length; i++) {
        let currDates = data.filter(d => d.actDate === uniqueDates[i]);
        groupedDates.push(currDates.length);
    }

    const dateData = {
        "labels": uniqueDates,
        "datasets": [
            {
                "label": "Number of workouts by date",
                "data": groupedDates,
                borderColor: '#FF7F7F',
                backgroundColor: '#FF7F7F',
            }
        ],
    }

    let uniqueTypes = [...new Set(data.map(d => d.type))];
    let groupedTypes = [];
    // group the number of workouts by type
    for (let i = 0; i < uniqueTypes.length; i++) {
        let currTypes = data.filter(d => d.type === uniqueTypes[i]);
        groupedTypes.push(currTypes.length);
    }

    const numData = {
        "labels": uniqueTypes,
        "datasets": [
            {
                "label": "# of Votes",
                "data": groupedTypes,
                "backgroundColor": bkgColorLst
            }
        ]
    }

    let avgIntensities = []
    for (let i = 0; i < uniqueTypes.length; i++) {
        let currTypes = data.filter(d => d.type === uniqueTypes[i]);
        let sum = 0;
        for (let j = 0; j < currTypes.length; j++) {
            sum += currTypes[j].intensity;
        }
        avgIntensities.push(sum / currTypes.length);
    }

    const intensityData = {
        "labels": uniqueTypes,
        "datasets": [
            {
                "label": "Average Intensity",
                "data": avgIntensities,
                "backgroundColor": bkgColorLst,
            }
        ]
    }

    let avgRatings = []
    for (let i = 0; i < uniqueTypes.length; i++) {
        let currTypes = data.filter(d => d.type === uniqueTypes[i]);
        let sum = 0;
        for (let j = 0; j < currTypes.length; j++) {
            sum += currTypes[j].rating;
        }

        avgRatings.push(sum / currTypes.length);
    }
    const ratingData = {
        "labels": uniqueTypes,
        "datasets": [
            {
                "label": "Average Rating",
                "data": avgRatings,
                "backgroundColor": bkgColorLst,
            }
        ]
    }



    return (
        <>
            <Heading
                lineHeight={1.1}
                fontWeight="black"
                fontSize={{ base: '3xl', sm: '4xl' }}>
                <Text
                    as={'span'}
                    color={'red.400'}
                    position={'relative'}>
                    Activity <Text as={'span'} color='gray.800'>
                        Charts
                    </Text>
                </Text>
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={30} mt={2} mb={16}>
                <Box>
                    <Box shadow="lg" p={4} textAlign="center" mt='4' maxW='500px' mx='auto'>
                        <Heading color="gray.700" fontSize='2xl'>Number of workouts by date</Heading>
                        <Line data={dateData} />
                    </Box>

                    <Box>
                        <Box shadow="lg" p={4} textAlign="center" mt='4' maxW='500px' mx='auto'>
                            <Heading color="gray.800" fontSize='2xl'>Average Intensity Levels</Heading>
                            <Bar data={intensityData} />
                        </Box>
                    </Box>

                </Box>

                <Box>
                    <Box shadow="lg" p={4} textAlign="center" mt='4' maxW='500px' mx='auto'>
                        <Heading color="gray.800" fontSize='2xl'>{data.length} Total Activities Done</Heading>
                        <Pie data={numData} />
                    </Box>
                </Box>

                <Box>
                    <Box shadow="lg" p={4} textAlign="center" mt='4' maxW='500px' mx='auto'>
                        <Heading color="gray.800" fontSize='2xl'>Average Rating by Activity</Heading>
                        <Bar data={ratingData} />
                    </Box>
                </Box>


            </SimpleGrid>
        </>
    )
}