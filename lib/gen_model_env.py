import time
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pandas as pd
from mltrees import random_forest, random_forest_predict, save_model, test_model

if __name__ == "__main__":
    Data = pd.read_csv("datasets/heart_env.csv")
    Data = Data.rename(columns={"cardio": "label"})
    
    SexEnum = {
        1: 0,
        2: 1
    }

    Data["gender"] =  Data["gender"].apply(lambda x: SexEnum[x])
    Data["age"] = Data["age"].apply(lambda x: x / 365.25)

    Data = Data.drop(columns=["id", "cholesterol", "ap_hi", "ap_lo", "gluc"])

    AllData = Data
    Data = Data.sample(frac=0.05, random_state=42)
    D, testD = train_test_split(Data, test_size=0.2, random_state=42)
    print("Training Data Shape:", D.shape)
    print("Test Data Shape:", testD.shape)

    time_start = time.time()
    model = random_forest(D, b=13, max_depth=10)
    save_model(model, "../public/models/model_env.json")
    time_end = time.time()
    print("Training time:", (time_end - time_start) / 60, "minutes", (time_end - time_start) % 60, "seconds")

    test_model(D, testD, model, evauluate_func=random_forest_predict)
    print("SKLearn Accuracy Score", accuracy_score(testD["label"], [random_forest_predict(model, dt) for _, dt in testD.iterrows()]) * 100, "%")

    print("All Data Test")
    test_model(D, AllData, model, evauluate_func=random_forest_predict)
    print("SKLearn Accuracy Score", accuracy_score(AllData["label"], [random_forest_predict(model, dt) for _, dt in AllData.iterrows()]) * 100, "%")

