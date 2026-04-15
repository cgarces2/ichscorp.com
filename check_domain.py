import urllib.request
import json
import sys

domains = ['ichs.com', 'ichscorp.com', 'ichslogistics.com', 'ichscompliance.com', 'ichsglobal.com', 'ichsservices.com']
print("Checking domains...")
for d in domains:
    url = f"https://rdap.verisign.com/com/v1/domain/{d}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'python'})
        with urllib.request.urlopen(req) as response:
            print(f"[TAKEN] {d}")
    except urllib.error.HTTPError as e:
        if e.code == 404:
            print(f"[AVAILABLE] {d}")
        else:
            print(f"[ERROR] {d}: {e.code}")
    except Exception as e:
        print(f"[ERROR] {d}: {e}")
