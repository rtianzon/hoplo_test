from utils.sendData.vendorData import vendorData
from datetime import datetime
import pytz

def markupData(lineData):
    try:
        vendData = vendorData()
        markUpDataList = []

        est = pytz.timezone('US/Eastern')
        current_time_est = datetime.now(est)
        estNow = current_time_est.strftime('%Y-%m-%d %H:%M:%S')

        for item in vendData:
            # amountPerKg = 
            markUpDataList.append({
                "date(EST)": estNow,
                "from": lineData["fromSelectOptValue"],
                "to": lineData["toSelecOptValue"],
                "vendorEmail": item["email"],
                "mode": lineData["modeSelectOptValue"],
                "rate/kg": (float(lineData["priceInputValue"])) * (float(item["markupPercent"])/100) + float(lineData["priceInputValue"])
            })

        return markUpDataList
    except Exception as e:
        print(e)