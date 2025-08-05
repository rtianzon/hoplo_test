from reportlab.pdfgen import canvas
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def createPdf(muData):
    try:
        for item in muData:
            filename = f"quote_{item['vendorEmail']}.pdf"
            c = canvas.Canvas(filename)
            y = 750
            c.drawString(100, y, f"Date: {item['date(EST)']}")
            y -= 20
            c.drawString(100, y, f"Vendor: {item['vendorEmail']}")
            y -= 20
            c.drawString(100, y, f"From: {item['from']} To: {item['to']}")
            y -= 20
            c.drawString(100, y, f"Rate/Kg: {item['rate/kg']}")
            c.save()
    except Exception as e:
        print(e)
