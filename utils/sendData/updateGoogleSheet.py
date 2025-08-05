from google.oauth2 import service_account
from googleapiclient.discovery import build
import os
from dotenv import load_dotenv


load_dotenv()
SERVICE_ACCOUNT_FILE = os.getenv("SERVICE_ACCOUNT_FILE")
SPREADSHEET_ID = os.getenv("GOOGLE_SHEET_FILE_ID")
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

def updateGoogleSheet(muData):
    try:
        sheet_values = [
            ['Date (EST)', 'From', 'To', 'Vendor Email', 'Mode', 'Rate/Kg']
        ]

        for item in muData:
            sheet_values.append([
                item['date(EST)'],
                item['from'],
                item['to'],
                item['vendorEmail'],
                item['mode'],
                item['rate/kg']
            ])

        
        creds = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE, scopes=SCOPES)

        service = build('sheets', 'v4', credentials=creds)
        sheet = service.spreadsheets()

        body = {'values': sheet_values}

        result = sheet.values().update(
            spreadsheetId=SPREADSHEET_ID,
            range="Sheet1!A1",
            valueInputOption='RAW',
            body=body
        ).execute()

        print(f"{result.get('updatedCells')} cells updated.")
    except Exception as e:
        print(e)
