from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
import datetime
import os

# 인증 정보 로드 또는 새로운 토큰 생성
creds = None
SCOPES = "https://calendar.google.com/calendar/embed?src=360216e86a78a9d039a255bc6a2e71d7550fd8bd76922af5dd50def9604bc72e%40group.calendar.google.com&ctz=Asia%2FSeoul"
if os.path.exists('token.json'):
    creds = Credentials.from_authorized_user_file('token.json')
if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_secrets_file('/Users/kimgeunyoung/2-2/웹프로그래밍/팀프로젝트/client_secret_151301396429-7sg51p7in9od6vk94i32nv4lh8hsja8e.apps.googleusercontent.com.json', SCOPES)
        creds = flow.run_local_server(port=0)

    with open('token.json', 'w') as token:
        token.write(creds.to_json())

# Google Calendar API 빌드
service = build('calendar', 'v3', credentials=creds)

# 일정 읽기 예제
now = datetime.datetime.utcnow().isoformat() + 'Z'  # 현재 날짜 및 시간 가져오기
events_result = service.events().list(calendarId='primary', timeMin=now,
                                      maxResults=10, singleEvents=True,
                                      orderBy='startTime').execute()
events = events_result.get('items', [])

if not events:
    print('No upcoming events found.')
for event in events:
    start = event['start'].get('dateTime', event['start'].get('date'))
    print(f'{start} - {event["summary"]}')