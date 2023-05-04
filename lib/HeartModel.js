// import fs from 'fs';
import ModelLab from '../public/models/model_lab.json'
import ModelEnv from '../public/models/model_env.json'
/*
    Usage guide:
    modelPredict(model_name, modelParameters) - returns a prediction (0 or 1, indicating whether the patient is predicted to have heart disease or not)

    Model name: Name of model to be used.
    Current options for models:
     - "model_lab" - Roughly 85% accuracy model that depends on data from lab tests on patients
     - "model_env" - Roughly 61% accuracy model that depends on data from environmental data on patients 

    Model Lab Parameters (Pass to transform lab data in a json object):
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
    
    Model Env Parameters (Pass to transform env data in a json object):
        age | Objective Feature | age | int (days)
        gender | Objective Feature | gender | binary (1: M, 2: F) |
        height | Objective Feature | height | int (cm) |
        weight | Objective Feature | weight | float (kg) |
        smoke | Subjective Feature | smoke | binary |
        alco (Alcohol intake) | Subjective Feature | alco | binary |
        active (Physical activity) | Subjective Feature | active | binary |

    Example:
    console.log(
        modelPredict("model_lab", transformLabData({
            "Age": 38,
            "Sex": "M",
            "ChestPainType": "ASY",
            "RestingBP": 110,
            "Cholesterol": 196,
            "FastingBS": 0,
            "RestingECG": "Normal",
            "MaxHR": 166,
            "ExerciseAngina": "N",
            "Oldpeak": 0,
            "ST_Slope": "Flat",
    }))
)
*/
export function modelPredict(modelName, data) {
    const model = modelName === "model_lab" ? ModelLab : ModelEnv;

    const votes = {};
    for (const tree of model) {
        const vote = modelEvauluateTree(tree, data);
        votes[vote] = (votes[vote] || 0) + 1;
    }

    return Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b);
}

export function transformLabData(data) {
    const SexEnum = {
        "M": 0,
        "F": 1
    }
    const ChestPainTypeEnum = {
        "TA": 0,
        "ATA": 1,
        "NAP": 2,
        "ASY": 3
    }
    const RestingECGEnum = {
        "Normal": 0,
        "ST": 1,
        "LVH": 2
    }
    const ExerciseAnginaEnum = {
        "Y": 0,
        "N": 1
    }
    const ST_SlopeEnum = {
        "Up": 0,
        "Flat": 1,
        "Down": 2
    }

    data["Sex"] = SexEnum[data["Sex"]];
    data["ChestPainType"] = ChestPainTypeEnum[data["ChestPainType"]];
    data["RestingECG"] = RestingECGEnum[data["RestingECG"]];
    data["ExerciseAngina"] = ExerciseAnginaEnum[data["ExerciseAngina"]];
    data["ST_Slope"] = ST_SlopeEnum[data["ST_Slope"]];

    return data;
}

export function transformEnvData(data) {
    const SexEnum = {
        1: 0,
        2: 1
    }

    data["gender"] = SexEnum[data["gender"]];
    data["age"] = data["age"] / 365.25;

    return data;
}

export function modelEvauluateTree(node, dt) {
    if (node.leaf !== undefined) {
        return node.leaf;
    }
    if (node.type == "binary") {
        if (dt[node.feature] === 0) {
            return modelEvauluateTree(node.left, dt);
        } else {
            return modelEvauluateTree(node.right, dt);
        }
    }
    else if (node.type == "continuous") {
        if (dt[node.feature] <= node.pivot) {
            return modelEvauluateTree(node.left, dt);
        } else {
            return modelEvauluateTree(node.right, dt);
        }
    }
}
