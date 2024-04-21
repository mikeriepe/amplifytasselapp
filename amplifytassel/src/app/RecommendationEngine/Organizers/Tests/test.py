import requests, sys, json

test_func_uri = "http://localhost:9000/2015-03-31/functions/function/invocations"

if __name__ == "__main__":
    assert len(sys.argv) == 2
    
    test_json = sys.argv[1]

    with open(test_json, "r") as test:
        test_str = test.read()

    test_json = {"httpMethod": "POST", "body": test_str}

    print("Test JSON:", test_json)

    response = requests.post(test_func_uri, json = test_json)

    assert response.status_code == 200

    print(response.json())

    assert json.loads(response.json()["body"])["order"] == [2, 1]