import Head from 'next/head'
import { Sidebar } from '@components/Sidebar'
import { Container, Text, Button } from '@chakra-ui/react'
import { HeadingWithDesc } from '@components/Headings/HeadingWithDesc'
import { TextSep } from '@components/Separators/TextSep'
import { useEffect } from 'react'


export default function Prevention() {
    useEffect(() => {
        if (localStorage.getItem('uniheart_login_state') === 'false' || localStorage.getItem('uniheart_login_state') === null) {
            window.location.href = '/login?msg=Please login to use this feature!'
        }
    }, []);
    return (
        <>
            <Head>
                <title>Prevention - UniHeart</title>
            </Head>
            <Sidebar active='prevention'>
                <Container maxW='container.lg' p={4}>
                    <HeadingWithDesc align='left'>
                        Exercise
                    </HeadingWithDesc>
                    <Text fontWeight={350}>
                        Exercise is extremely important and is beneficial in decreasing risk factors of heart disease such as weight and blood pressure. Lack of exercise kills over 250,000 people per year.
                        <br />
                        Numerous studies have shown that exercise is extremely important in the assessment of cardiovascular health. Physically active individuals have a lower risk of coronary cardiovascular disease (CDH). Even if CHD does develop, it tends to be less severe in fit individuals. In the United States, lack of physical activity is attributed to 250,000 deaths per year. Even mid-age individuals who increase their activity level reap these benefits and see a decreased risk of mortality. According to the American Heart Association (AHA), the five biggest determining factors for cardiovascular disease include high blood pressure, abnormal values for blood lipids, smoking, and obesity. Consistent exercise lowers these risk factors substantially. For example, exercise helps with weight loss and can therefore lower blood pressure. Exercise can also reduce low-density lipoprotein (“bad” cholesterol) levels and increase high-density lipoprotein (“good” cholesterol) levels.
                    </Text>

                    <Button as='a' href='https://www.ahajournals.org/doi/full/10.1161/01.CIR.0000048890.59383.8D' bg='red.300' color="white.off" _hover={{ bg: 'red.500' }} mt='3'>Source</Button>

                    <TextSep />

                    <HeadingWithDesc align='left'>
                        Diets
                    </HeadingWithDesc>
                    <Text fontWeight={350}>
                        A good diet is essential for maintaining a healthy heart, lowering the risk of heart disease by about 31%.
                        <br />
                        The healthiest diets for reducing cardiovascular disease are those rich in vegetable oils, nuts, fish, poultry, vegetables, and whole grains. The risk of cardiovascular disease can be further reduced by diets that include alcohol in moderation, if at all, as well as reduced consumption of processed meats, simple carbs, and foods rich in sugar, salt, and trans fat. This dietary pattern has been shown to lower the risk of cardiovascular disease by 31%, lower the risk of diabetes by 33% and also reduce the risk of strokes by 20%. A Mediterranean diet rich in extra-virgin olive oil or nuts with a high unsaturated fat content has been demonstrated to reduce major cardiovascular events among patients with cardiovascular disease. Sodium and potassium both have an important role in developing a healthy heart. Specifically, a healthy diet is one filled with less sodium and higher amounts of potassium can be found in fruits, vegetables, legumes, and low-fat dairy
                    </Text>

                    <Button as='a' href='https://www.hsph.harvard.edu/nutritionsource/disease-prevention/cardiovascular-disease/preventing-cvd/' bg='red.300' color="white.off" _hover={{ bg: 'red.500' }} mt='3'>Source</Button>

                    <TextSep />

                    <HeadingWithDesc align='left'>
                        Excessive Weight
                    </HeadingWithDesc>
                    <Text fontWeight={350}>
                        Excessive weight and large waist size lead to much high risk of developing heart disease.
                        <br />
                        Excess weight is also a contributing factor that contributes to cardiovascular disease and other cardiovascular-related issues. In a study of over 1 million women, researchers discovered that an increase in BMI is linked with an increased risk incident of coronary heart disease. After the age of 20, Middle-age people who gained 11 to 22 pounds were three times more likely to develop cardiovascular disease. However, just pure numbers on a scale do not tell the full story. Height is also heavily correlated with weight. BMI is a tool that researchers devised that also takes height into account. It is computed by dividing weight in kilograms by height in meters squared.

                        Waist size is also an important factor and is especially important in people who are not overweight. Men should aim for a waist size below 40 inches and women should aim for a waist size below 35 inches.
                    </Text>

                    <Button as='a' href='https://www.hsph.harvard.edu/nutritionsource/disease-prevention/cardiovascular-disease/preventing-cvd/' bg='red.300' color="white.off" _hover={{ bg: 'red.500' }} mt='3'>Source</Button>


                    <TextSep />

                    <HeadingWithDesc align='left'>
                        Smoking
                    </HeadingWithDesc>
                    <Text fontWeight={350}>
                        Smoking is one of the most detrimental factors to your health. It can build up in your blood and causes unwanted clogging and plaque buildup.
                        <br />
                        Smoking is a severe health risk and is responsible for one-fourth of all fatalities from cardiovascular disease. Nicotine is an extremely addictive substance and this makes smoking a habit very hard to break and especially dangerous. Chemicals in smoke cause arteries to narrow and allow fat and cholesterol to build up in the blood and forms plaque that blocks arteries. This can cause a lack of blood flow to parts of the body, and cause coronary heart disease (CHD). Chemicals in the smoke further thicken blood and blockage can lead to heart attack and sudden death. In a year, smokers who quit smoking cut their risk of a heart attack dramatically. Within five years, smokers lower their risk of stroke to the same level as a person who has never smoked. Damage from short-term smoking is rapidly repaired and even long-term smokes still see health improvement.
                    </Text>


                    <Button as='a' href='https://www.cdc.gov/tobacco/data_statistics/sgr/50th-anniversary/pdfs/fs_smoking_CVD_508.pdf' bg='red.300' color="white.off" _hover={{ bg: 'red.500' }} mt='3'>Source</Button>

                </Container>

            </Sidebar>
        </>
    )
}
