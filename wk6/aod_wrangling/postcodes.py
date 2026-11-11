
import pandas as pd
import requests

# 1. Import dataset
df = pd.read_csv("data/merged_data_noempties.csv")

# 2. Set up API
url = "https://api.postcodes.io/postcodes"

# 3. Retrieve postcodes in batches of 100
postcodes = []

for i in range(0, len(df), 100):

    batch = df.iloc[i:i+100]

    payload = {
        "geolocations": [
            {
                "longitude": lon,
                "latitude": lat
            }
            for lon, lat in zip(batch["Longitude"], batch["Latitude"])
        ]
    }

    response = requests.post(url, json=payload)
    response.raise_for_status()

    results = response.json()["result"]

    postcodes.extend([
        r["result"][0]["postcode"] if r["result"] else None
        for r in results
    ])

# 4. Add postcode column
df["Postcode"] = postcodes

# 5. Export updated dataset
df.to_csv("data/merged_data_with_postcodes.csv", index=False)

print("Postcode lookup complete!")
