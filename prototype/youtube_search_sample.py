from youtubesearchpython import VideosSearch

videosSearch = VideosSearch('Despacito', limit = 1)

print(videosSearch.result())

# # -*- coding: utf-8 -*-

# # Sample Python code for youtube.search.list
# # See instructions for running these code samples locally:
# # https://developers.google.com/explorer-help/code-samples#python

# import os

# import google_auth_oauthlib.flow
# import googleapiclient.discovery
# import googleapiclient.errors
# from google.oauth2.credentials import Credentials

# scopes = ["https://www.googleapis.com/auth/youtube.force-ssl"]

# def main():
#     # Disable OAuthlib's HTTPS verification when running locally.
#     # *DO NOT* leave this option enabled in production.
#     os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

#     api_service_name = "youtube"
#     api_version = "v3"
#     client_secrets_file = "youtube_client_secrets.json"

#     # Get credentials and create an API client
#     # flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(
#     #     client_secrets_file, scopes)

#     credentials = Credentials.from_authorized_user_file(client_secrets_file, scopes)
#     youtube = googleapiclient.discovery.build(
#         api_service_name, api_version, credentials=credentials)

#     request = youtube.search().list(
#         part="snippet",
#         maxResults=25,
#         q="surfing"
#     )
#     response = request.execute()

#     print(response)

# if __name__ == "__main__":
#     main()