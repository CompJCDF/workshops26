import pandas as pd
import glob

df = pd.concat([pd.read_csv(f) for f in glob.glob("*.csv")], ignore_index=True)
df.to_csv("merged_data.csv", index=False)