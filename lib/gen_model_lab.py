import time
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pandas as pd
from mltrees import random_forest, random_forest_predict, save_model, test_model

if __name__ == "__main__":
    Data = pd.read_csv("datasets/heart_lab.csv")
    Data = Data.rename(columns={"HeartDisease": "label"})
    SexEnum = {
        "M": 0,
        "F": 1
    }
    ChestPainTypeEnum = {
        "TA": 0,
        "ATA": 1,
        "NAP": 2,
        "ASY": 3  
    }
    RestingECGEnum = {
        "Normal": 0,
        "ST": 1,
        "LVH": 2
    }
    ExerciseAnginaEnum = {
        "Y": 0,
        "N": 1
    }
    ST_SlopeEnum = {
        "Up": 0,
        "Flat": 1,
        "Down": 2
    }

    Data["Sex"] =  Data["Sex"].apply(lambda x: SexEnum[x])
    Data["ChestPainType"] = Data["ChestPainType"].apply(lambda x: ChestPainTypeEnum[x])
    Data["RestingECG"] = Data["RestingECG"].apply(lambda x: RestingECGEnum[x])
    Data["ExerciseAngina"] = Data["ExerciseAngina"].apply(lambda x: ExerciseAnginaEnum[x])
    Data["ST_Slope"] = Data["ST_Slope"].apply(lambda x: ST_SlopeEnum[x])

    D, testD = train_test_split(Data, test_size=0.2, random_state=42)
    print("Training Data Shape:", D.shape)
    print("Test Data Shape:", testD.shape)

    time_start = time.time()
    model = random_forest(D, b=99, max_depth=16, D_sample_size=0.67, features_sample_size=-1)
    save_model(model, "../public/models/model_lab.json")
    time_end = time.time()
    print("Training time:", (time_end - time_start) / 60, "minutes", (time_end - time_start) % 60, "seconds")

    test_model(D, testD, model,evauluate_func=random_forest_predict)

    print("SKLearn Accuracy Score", accuracy_score(testD["label"], [random_forest_predict(model, dt) for _, dt in testD.iterrows()]) * 100, "%")
