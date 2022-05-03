# User Stories

## 1. As a user, I want to login in with my Spotify account to access the playlists I previously created.
If the user is not authenticated, the user will click on the top right corner “Login” option, get redirected to the Spotify OAuth page, and log in using their Spotify account. This will allow the application to access the user’s playlists, which will be displayed on the playlist button that replaced the login button.  If the login process fails at any point, an error message shall inform the user that the login has failed. Then, the user shall be prompted to attempt logging in again.

## 2. I want the application to display the link to all my playlist songs’ music videos from YouTube all in one place.
Once the user clicks on the “Playlist” option, the user will be redirected to a new page with all playlists listed. By clicking on the “view” button underneath any of the playlists, a page will redirect and list all of the songs within the playlist. And next to each song, there will be a link for the most searched youtube video with the song name.

## 3. As a user, I want to switch to a different account in order to access additional playlists. 
During the use of the application, there will be a ‘Switch Account’ option on the home page. Upon clicking, the user will be logged out and redirected to the Spotify OAuth page. Once logged in with a new user account, the user will be redirected back to the playlists page of the application, which will be updated with the new Spotify playlists and songs’ music videos under the new account.

## 4. As a user, I want to list a few playlists as favorites, so they may be listed at the top of other playlists when I log in. 
Once logged in and on the “Playlist” page, the user will find an empty star next to the “view” button for each playlist. By clicking on the star symbols, the playlist will be added to the application database as favorites. The playlist will automatically be placed first in front of other playlists. The next time when users logged into the same Spotify account, the favorites playlists will remain as favorites with the star symbols lit up and placed at the top of the playlists. 

## 5. As a user, when I choose a song from a playlist I want a new tab to be created showing the Youtube video of said song. 
When the web application is running correctly it should show a user that is logged in, all of their saved playlists from Spotify. The user should also be able to see all of the songs that are present in their playlists. If a user sees a song on a playlist that he or she wishes to view, a new tab on their browser should open up a video of that song on Youtube.


