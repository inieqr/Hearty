from collections import defaultdict
import json
import math
from operator import itemgetter
import random
import multiprocessing


def entropy(probabilities):
    return sum(-p * math.log(p, 2) for p in probabilities if p)


def gini(probabilities):
    return 1 - sum((p ** 2 for p in probabilities))


def array_purity(D):
    labels = D["label"].value_counts().to_dict()
    probabilities = []
    for label in labels:
        probabilities.append(labels[label] / len(D))

    return gini(probabilities)


def test_feature_binary(D, feature):
    left = D[D[feature] == 0]
    right = D[D[feature] == 1]

    return (-1, (len(left) / len(D) * array_purity(left) + len(right) / len(D) * array_purity(right)), feature)


def test_feature_continuous(D, feature, feature_info):
    minv = [(0, float("inf"), feature)]

    for split in range(feature_info[feature]["min"], feature_info[feature]["max"] + 1):
        left = D[D[feature] <= split]
        right = D[D[feature] > split]

        impurity = (len(left) / len(D) * array_purity(left) +
                    len(right) / len(D) * array_purity(right))
        if impurity < minv[0][1]:
            minv = [(split, impurity, feature)]
        elif impurity == minv[0][1]:
            minv.append((split, impurity, feature))

    return minv[len(minv) // 2]


def test_feature(D, feature, feature_info):
    if feature_info[feature]["type"] == "binary":
        return test_feature_binary(D, feature)
    elif feature_info[feature]["type"] == "continuous":
        return test_feature_continuous(D, feature, feature_info)


def select_feature(D, features, feature_info):
    impurities = [test_feature(D, feature, feature_info)
                  for feature in features]

    return min(impurities, key=itemgetter(1))


def array_labels_same(D):
    if len(D["label"].value_counts()) == 1:
        return True

    labels = D["label"].value_counts().to_dict()
    for label in labels:
        if labels[label] > len(D) * 0.9:
            return True

    return False


def array_majority_label(D):
    return D["label"].value_counts().idxmax()


def construct_tree(D, features, feature_info, default_label, depth=0, max_depth=float("inf"), inc_depth=None):
    if D.empty:
        return {"leaf": int(default_label)}
    if array_labels_same(D):
        return {"leaf": int(D.iloc[0]["label"])}
    if not features or depth >= max_depth:
        return {"leaf": int(array_majority_label(D))}

    feature = select_feature(D, features, feature_info)
    feature_type = "binary" if feature[0] == -1 else "continuous"
    left, right = None, None

    if feature_type == "binary":
        left = D[D[feature[2]] == 0]
        right = D[D[feature[2]] == 1]

    elif feature_type == "continuous":
        left = D[D[feature[2]] <= feature[0]]
        right = D[D[feature[2]] > feature[0]]

    if inc_depth is not None:
        inc_depth(depth+1)

    return {
        "feature": feature[2],
        "type": feature_type,
        "pivot": float(feature[0]),
        "left": construct_tree(left, [f for f in features if f != feature], feature_info, default_label, depth=depth + 1, max_depth=max_depth, inc_depth=inc_depth),
        "right": construct_tree(right, [f for f in features if f != feature], feature_info, default_label, depth=depth + 1, max_depth=max_depth, inc_depth=inc_depth)
    }


def tree_predict(tree, dt):
    if "leaf" in tree:
        return tree["leaf"]
    if tree["type"] == "binary":
        if dt[tree["feature"]] == 0:
            return tree_predict(tree["left"], dt)
        else:
            return tree_predict(tree["right"], dt)
    elif tree["type"] == "continuous":
        if dt[tree["feature"]] <= tree["pivot"]:
            return tree_predict(tree["left"], dt)
        else:
            return tree_predict(tree["right"], dt)


def gen_model(D, default_label, max_depth=float("inf"), feature_sample_size=-1, id=-1):
    columns = D.columns.tolist()
    columns.remove("label")
    feature_info = {}

    features = None
    if feature_sample_size > 0:
        features = random.sample(list(columns), int(
            feature_sample_size * len(columns)))
    else:
        features = random.sample(list(columns), round(math.sqrt(len(columns))))

    print("Generating model with features:", features)

    for feature in features:
        if feature == "label":
            continue

        if D[feature].min() == 0 and D[feature].max() == 1:
            feature_info[feature] = {
                "type": "binary"
            }
        else:
            feature_info[feature] = {

                "type": "continuous",
                "min": math.floor(D[feature].min()),
                "max": math.floor(D[feature].max())+1
            }

    depth = 0

    def inc_depth(current_depth):
        nonlocal depth
        if current_depth > depth:
            depth = current_depth

    tree = construct_tree(D, list(feature_info.keys()), feature_info,
                          default_label, max_depth=max_depth, inc_depth=inc_depth)
    print("Tree generated", id, "Depth:", depth)
    return tree


def test_model(D, testD, model, evauluate_func=tree_predict):
    predictions = []
    for _, dt in D.iterrows():
        predictions.append(evauluate_func(model, dt))

    training_correct = 0
    for _, dt in D.iterrows():
        pred = evauluate_func(model, dt)
        if dt["label"] == pred:
            training_correct += 1

    test_correct = 0
    test_false_positives = 0
    test_false_negatives = 0
    for _, dt in testD.iterrows():
        pred = evauluate_func(model, dt)
        if dt["label"] == pred:
            test_correct += 1
        elif dt["label"] == 0 and pred == 1:
            test_false_positives += 1
        elif dt["label"] == 1 and pred == 0:
            test_false_negatives += 1

    print("Model tests:")
    print("Training Data Accuracy:", (training_correct / len(D)) * 100, "%")
    print("Test Data Accuracy:", (test_correct / len(testD)) * 100, "%")
    print("Test Data Total:", len(testD))
    print("Test Data False Positives:", test_false_positives,
          (test_false_positives / len(testD)) * 100, "%")
    print("Test Data False Negatives:", test_false_negatives,
          (test_false_negatives / len(testD)) * 100, "%")


def save_model(model, filename):
    with open(filename, "w") as f:
        json.dump(model, f)


def load_model(filename):
    with open(filename, "r") as f:
        return json.load(f)

# Setting feature_sample_size to -1 will use the sqrt of the amount of features as the feature sample size


def random_forest(D, b=12, max_depth=float('inf'), D_sample_size=0.67, features_sample_size=-1):
    MAX_POOL_SIZE = 6

    with multiprocessing.Pool(MAX_POOL_SIZE) as pool:
        return pool.starmap(gen_model, [(*t, v) for t, v in zip([(D.sample(frac=D_sample_size), 0, max_depth, features_sample_size) for _ in range(b)], range(1, b+1))])


def random_forest_predict(model, dt):
    votes = defaultdict(int)
    for tree in model:
        votes[tree_predict(tree, dt)] += 1

    return max(votes, key=votes.get)
