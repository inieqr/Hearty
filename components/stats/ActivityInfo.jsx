import { Heading, Text, Box, SimpleGrid } from '@chakra-ui/react';


export const ActivityInfo = ({ data }) => {
    data = Array.from(data);

    let longestWorkoutObj = {
        length: 0
    }
    // find the activity with the highest rating
    let uniqueTypes = [...new Set(data.map(d => d.type))];
    let avgIntensities = [];
    let avgRatings = []
    let groupedTypes = [];
    let avgLengths = [];

    for (let i = 0; i < uniqueTypes.length; i++) {
        let currTypes = data.filter(d => d.type === uniqueTypes[i]);
        groupedTypes.push(currTypes.length);
        let sum = 0;
        let sumIntensity = 0;
        let sumLength = 0;
        for (let j = 0; j < currTypes.length; j++) {
            sum += currTypes[j].rating;
            sumIntensity += currTypes[j].intensity;
            sumLength += currTypes[j].length;

            if (currTypes[j].length > longestWorkoutObj.length) {
                longestWorkoutObj = currTypes[j];
            }
        }

        avgIntensities.push(sumIntensity / currTypes.length);
        avgRatings.push(sum / currTypes.length);
        avgLengths.push(sumLength / currTypes.length);
    }

    let maxRating = Math.max(...avgRatings);
    let maxRatingIndex = avgRatings.indexOf(maxRating);
    let maxRatingType = uniqueTypes[maxRatingIndex];

    let maxIntensity = Math.max(...avgIntensities);
    let maxIntensityIndex = avgIntensities.indexOf(maxIntensity);
    let maxIntensityType = uniqueTypes[maxIntensityIndex];

    let maxGrouped = Math.max(...groupedTypes);
    let maxGroupedIndex = groupedTypes.indexOf(maxGrouped);
    let maxGroupedType = uniqueTypes[maxGroupedIndex];

    let maxLength = Math.max(...avgLengths);
    let maxLengthIndex = avgLengths.indexOf(maxLength);
    let maxLengthType = uniqueTypes[maxLengthIndex];







    let dataUse = [
        {
            "head": "You've worked out a total of",
            "body": `${data.length} amazing times`
        },
        ,
        {
            "head": "Your most popular workout is...",
            "body": `${maxGroupedType} with a total of ${maxGrouped} workouts`
        },
        {
            "head": "Your favorite activity was",
            "body": `${maxRatingType} with an average rating of ${maxRating}`
        },
        {
            "head": "Your longest workout was...",
            "body": `${longestWorkoutObj.type} with a duration of ${longestWorkoutObj.length} minutes on ${longestWorkoutObj.actDate}`
        },
        {
            "head": "Your highest intensity workouts are...",
            "body": `${maxIntensityType} with an average intensity of ${maxIntensity}`
        },
        {
            "head": "You usually workout the longest when doing...",
            "body": `${maxLengthType} with an average duration of ${maxLength} minutes`

        }

    ]
    return (
        <>
            <Box mb={16}>
                <Heading
                    lineHeight={1.1}
                    fontWeight="black"
                    fontSize={{ base: '3xl', sm: '4xl' }}>
                    <Text
                        as={'span'}
                        color={'red.400'}
                        position={'relative'}>
                        All about your <Text as={'span'} color='gray.800' >
                            Activities
                        </Text>

                    </Text>



                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} mt={4}>

                    {dataUse.map((d, i) => (
                        <Box key={i} bg='white' p={4} rounded='md' shadow='lg'>
                            <Text fontSize={'3xl'} fontWeight='bold' color='red.400'>{d.head}</Text>
                            <Text fontSize={'2xl'} fontWeight='bold'>{d.body}</Text>
                        </Box>
                    ))}

                </SimpleGrid>
            </Box>
        </>
    )
}