/*
 * Copyright 2011 Google Inc. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var google = new OAuth2('google', {
  client_id: '946727043308.apps.googleusercontent.com',
  client_secret: 'ot3WhezWi_4pfmbYpeWWGUlo',
  api_scope: 'https://www.googleapis.com/auth/youtube'
});

google.authorize(function() {

  var YOUTUBE_ACTIVITIES_URL = 'https://www.googleapis.com/youtube/v3/activities?part=id%2Csnippet%2CcontentDetails&home=true&maxResults=50&key=AIzaSyCx1xab1VHU7NdT6d2_x8i3p9RIZrtgR8k';

  var loading = document.getElementById('loading');
  var success = document.getElementById('success');
  var activities = document.getElementById('activities');

  // Make an XHR that retrieve activities with YouTube Data API
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(event) {
    if (xhr.readyState == 4) {
      if(xhr.status == 200) {
        // Great success: parse response with JSON
        var activitiesResponse = JSON.parse(xhr.responseText);
        var items = activitiesResponse.items;
        for (var i=0; i<items.length; i++) {
          // Iterates over activities
          var activity = items[i];
          if ((activity.snippet.type == 'recommendation')&&(activity.contentDetails.recommendation.resourceId.videoId)){
            activities.innerHTML += '<li><a href="http://www.youtube.com/watch?v=' + activity.contentDetails.recommendation.resourceId.videoId + '" target="_blank">' + activity.snippet.title + '</a></li>';
          }
        }
        
        loading.style.display = 'none';
        success.style.display = 'block';

      } else {
          // Request failure: something bad happened
      }
    }
  };

  xhr.open('GET', YOUTUBE_ACTIVITIES_URL, true);

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', 'OAuth ' + google.getAccessToken());

  xhr.send();

});

