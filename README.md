# __Automating a Web Page to Show Off Your Top GitHub Repositories__
## **A beginner’s guide to using GitHub’s API for your personal portfolio page**
___By Jamison Cozart___

As a beginner dev like myself, you probably have a simple portfolio page showcasing your projects and previous work experience. You’ve taken the time to meticulously add the project titles, the description, and even the languages used for each of your projects. But if you’re like me you’ve also realized the arduous task of continually updating these projects with the newer and improved projects you will continue to make through your journey as a developer. I’m writing this article, as my first blog post ever, to show you the beauty and simplicity of using GitHub’s API’s to your advantage.

## __The GitHub API__
<hr>

For anyone unfamiliar with the term, API stands for Application Programming Interface. The term API is thrown around a lot in the developer community, and can represent a wide variety of different software interfaces. Because of this, I will not spend too much time explaining, and instead link to the [Wikipedia page](https://en.wikipedia.org/wiki/Application_programming_interface) for your further reading. The basic purpose of an API is for software programs to easily communicate and exchange data between one another. Fortunately for all developers GitHub has a fantastically simple API that we can use to access the data from each of our project repositories in seconds. If you’re more like me, you might prefer to read the [Official Documentation](https://developer.github.com/v3/).

If you’ve ever looked for Github’s official mobile app, you’ll find that only a Beta version exists for both iOS and Android (as of January 22nd, 2020). Instead when you search for GitHub on your respective app stores, you’ll find multiple 3rd party GitHub apps you can download. Most, if not all of these 3rd party apps interact with GitHub’s API to pull the data from all of GitHub at your request. Another simpler example would be [David Ase’s Profile Summary for GitHub](https://profile-summary-for-github.com/search) which requests any users GitHub data by making requests to GitHub’s API and visualizing the data using a javascript library called chart.js. 

An Application Programming Interface might sound like some really complex software, but digging just beneath the surface, you’ll find that requesting your GitHub data is much simpler than you thought.

## __How to make API calls__
<hr>

So how do we actually interact with this ominous GitHub API? To start, lets open our __terminal (Mac)__ or __Git Bash (Windows)__ and make a simple API call. Replace `jamisoncozart` with your own GitHub username:
```bash
curl -i https://api.github.com/users/jamisoncozart
```
If you typed it right, you should see an output that looks something like this (but with your own GitHub info):
```javascript
{
  "login": "<jamisoncozart>",
  "id": 56237239,
  "node_id": "MDQ6VXNlcjU2MjM3MjM5",
  "avatar_url": "https://avatars0.githubusercontent.com/u/56237239?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/jamisoncozart",
  "html_url": "https://github.com/jamisoncozart",
  "followers_url": "https://api.github.com/users/jamisoncozart/followers",
  "following_url": "https://api.github.com/users/jamisoncozart/following{/other_user}",
  "gists_url": "https://api.github.com/users/jamisoncozart/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/jamisoncozart/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/jamisoncozart/subscriptions",
  "organizations_url": "https://api.github.com/users/jamisoncozart/orgs",
  "repos_url": "https://api.github.com/users/jamisoncozart/repos",
  "events_url": "https://api.github.com/users/jamisoncozart/events{/privacy}",
  "received_events_url": "https://api.github.com/users/jamisoncozart/received_events",
  "type": "User",
  "site_admin": false,
  "name": "Jamison Cozart",
  "company": null,
  "blog": "https://jamisoncozart.github.io/portfolio-page/",
  "location": "Portland, Oregon",
  "email": null,
  "hireable": true,
  "bio": "Full-Stack Web Developer and Computer Science enthusiast.\r\n\r\nContact me if you want to collaborate.",
  "public_repos": 64,
  "public_gists": 0,
  "followers": 17,
  "following": 17,
  "created_at": "2019-10-06T22:08:22Z",
  "updated_at": "2020-01-24T22:48:02Z"
}

```
What we just did was request the data for our own GitHub profile, and the GitHub API responded with a huge data object. Lets get a little more specific with our request URL to look at our repositories:
```bash
curl -i https://api.github.com/users/jamisoncozart/repos
``` 

Upon requesting the repos URL, the GitHub API responds with a list of around 30 repositories currently on our GitHub. If we want all the repositories to show up for our profile, we can add a `?per_page` query string to the request URL like this:
```bash
curl -i https://api.github.com/users/jamisoncozart/repos?per_page=100
```
This will list the first 100 projects on your GitHub alphabetically. If you have more than 100 repos, simply increase `100` in the query string to a larger number.

The GitHub API uses a data type called [JSON](https://www.w3schools.com/whatis/whatis_json.asp), which stands for __JavaScript Object Notation__, making it really easy to work with in JavaScript! We can make this same request for just about anybody's GitHub profile, and there are many other types of API calls you can make, however I will only touch on a select few in this article. Now that we know what URL we need to make a request to, lets see how we can make the same request using JavaScript.

Lets start by making sure you have all the files you need to make this work. I’m going to keep this as simple as possible to start.

<hr>

### __Option 1__

__Using Git Bash (Windows) or Terminal (Mac)__

The easiest way to get started is to clone this GitHub repo onto your desktop: 
```bash
cd Desktop
git clone https://github.com/jamisoncozart/Automating-GitHub-Repositories
```

This will give you all the files you need to get started with this project.

<hr>

### __Option 2__

__Using GitHub__

To download the .zip file manually, navigate to the top of this repository page and click the `Clone or download` button. Then press `Download ZIP`.

After the download is complete, `Unzip` the downloaded file and move it to any file location you want. Finally, open `VSCode` or your preferred text-editor and `Open` the unzipped folder you just downloaded.

<hr>

### __The JavaScript__

Now finally we can make our way over to the `scripts.js` file which should reside in your `js` folder. Here we can start making our GitHub API requests.

To make our first request using JavaScript, we will use jQueries built-in `$.get()` method to make a `GET` request to GitHub's API.
```javascript
$.get("https://api.github.com/users/jamisoncozart/repos?per_page=100", function(data) {
  console.log(data);
})
```
As you probably guessed, the [$.get() jQuery method](https://api.jquery.com/jquery.get/) takes 2 parameters for our example, but has options to pass more parameters when necessary. The first parameter is our `GET` request URL, and the second is a [Callback Function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function). This callback function is given the GitHub API response data which is stored in the `data` variable that is passed to our callback function.

After typing/copying this code into your `scripts.js` file, open your `index.html` file in your browser (Chrome preferred) and navigate to the console using the shortcut `Shift + CTRL + J`, or right-clicking on the page and clicking `Inspect`, then clicking on `Console` at the top of the menu that pops up. If you want to see the request in action, `Refresh` the page, and you should see the `JSON` response printed to the console.

When we reference our `data` parameter in our callback function and `console.log()` it, we can view it in our browser's console.

This is great! The request we made is returning us an array of objects, with each object reference each repository on our GitHub!

Before we move on to filtering out the data we want from this `data` array of objects, lets clean up our code slightly to make it easier to understand:
```javascript
var url = "https://api.github.com/users/jamisoncozart/repos?per_page=100";

$.get(url, function(data) {
  console.log(data);
})
```
So as you have just seen, making requests to the GitHub API is quite a simple task. Knowing what URL you need to make a request to is half the battle. In the next section we will traverse the great `JSON` response array, and pull out some data we can use for our website.

## __How to Traverse JSON__
<hr>

Objects are some of Javascript's most useful data types, allowing for storage of large amounts of relational data inside a single object. The JSON we are recieving from our GitHub API request comes in a commonly used data structure in JavaScript: an array of objects. Openning our index.html in the browser and navigating to the console, we see something like this:
```javascript
Array(71)
```
If you click on this text in the console, you will see that at each index of this array, there is an object that represents one GitHub repository from your profile. Here is what a single post object looks like from this array of post objects:
```javascript
0:
  id: 234202384
  node_id: "MDEwOlJlcG9zaXRvcnkyMzQyMDIzODQ="
  name: "address-book"
  full_name: "jamisoncozart/address-book"
  private: false
  owner: {login: "jamisoncozart", id: 56237239, node_id: "MDQ6VXNlcjU2MjM3MjM5", avatar_url: "https://avatars0.githubusercontent.com/u/56237239?v=4", gravatar_id: "", …}
  html_url: "https://github.com/jamisoncozart/address-book"
  description: null
  fork: false
  url: "https://api.github.com/repos/jamisoncozart/address-book"
  forks_url: "https://api.github.com/repos/jamisoncozart/address-book/forks"
  keys_url: "https://api.github.com/repos/jamisoncozart/address-book/keys{/key_id}"
  collaborators_url: "https://api.github.com/repos/jamisoncozart/address-book/collaborators{/collaborator}"
  teams_url: "https://api.github.com/repos/jamisoncozart/address-book/teams"
  hooks_url: "https://api.github.com/repos/jamisoncozart/address-book/hooks"
  issue_events_url: "https://api.github.com/repos/jamisoncozart/address-book/issues/events{/number}"
  events_url: "https://api.github.com/repos/jamisoncozart/address-book/events"
  assignees_url: "https://api.github.com/repos/jamisoncozart/address-book/assignees{/user}"
  branches_url: "https://api.github.com/repos/jamisoncozart/address-book/branches{/branch}"
  tags_url: "https://api.github.com/repos/jamisoncozart/address-book/tags"
  blobs_url: "https://api.github.com/repos/jamisoncozart/address-book/git/blobs{/sha}"
  git_tags_url: "https://api.github.com/repos/jamisoncozart/address-book/git/tags{/sha}"
  git_refs_url: "https://api.github.com/repos/jamisoncozart/address-book/git/refs{/sha}"
  trees_url: "https://api.github.com/repos/jamisoncozart/address-book/git/trees{/sha}"
  statuses_url: "https://api.github.com/repos/jamisoncozart/address-book/statuses/{sha}"
  languages_url: "https://api.github.com/repos/jamisoncozart/address-book/languages"
  stargazers_url: "https://api.github.com/repos/jamisoncozart/address-book/stargazers"
  contributors_url: "https://api.github.com/repos/jamisoncozart/address-book/contributors"
  subscribers_url: "https://api.github.com/repos/jamisoncozart/address-book/subscribers"
  subscription_url: "https://api.github.com/repos/jamisoncozart/address-book/subscription"
  commits_url: "https://api.github.com/repos/jamisoncozart/address-book/commits{/sha}"
  git_commits_url: "https://api.github.com/repos/jamisoncozart/address-book/git/commits{/sha}"
  comments_url: "https://api.github.com/repos/jamisoncozart/address-book/comments{/number}"
  issue_comment_url: "https://api.github.com/repos/jamisoncozart/address-book/issues/comments{/number}"
  contents_url: "https://api.github.com/repos/jamisoncozart/address-book/contents/{+path}"
  compare_url: "https://api.github.com/repos/jamisoncozart/address-book/compare/{base}...{head}"
  merges_url: "https://api.github.com/repos/jamisoncozart/address-book/merges"
  archive_url: "https://api.github.com/repos/jamisoncozart/address-book/{archive_format}{/ref}"
  downloads_url: "https://api.github.com/repos/jamisoncozart/address-book/downloads"
  issues_url: "https://api.github.com/repos/jamisoncozart/address-book/issues{/number}"
  pulls_url: "https://api.github.com/repos/jamisoncozart/address-book/pulls{/number}"
  milestones_url: "https://api.github.com/repos/jamisoncozart/address-book/milestones{/number}"
  notifications_url: "https://api.github.com/repos/jamisoncozart/address-book/notifications{?since,all,participating}"
  labels_url: "https://api.github.com/repos/jamisoncozart/address-book/labels{/name}"
  releases_url: "https://api.github.com/repos/jamisoncozart/address-book/releases{/id}"
  deployments_url: "https://api.github.com/repos/jamisoncozart/address-book/deployments"
  created_at: "2020-01-16T00:43:18Z"
  updated_at: "2020-01-16T03:39:47Z"
  pushed_at: "2020-01-16T03:39:45Z"
  git_url: "git://github.com/jamisoncozart/address-book.git"
  ssh_url: "git@github.com:jamisoncozart/address-book.git"
  clone_url: "https://github.com/jamisoncozart/address-book.git"
  svn_url: "https://github.com/jamisoncozart/address-book"
  homepage: null
  size: 104
  stargazers_count: 0
  watchers_count: 0
  language: "HTML"
  has_issues: true
  has_projects: true
  has_downloads: true
  has_wiki: true
  has_pages: false
  forks_count: 0
  mirror_url: null
  archived: false
  disabled: false
  open_issues_count: 0
  license: null
  forks: 0
  open_issues: 0
  watchers: 0
  default_branch: "master"
  __proto__: Object
```
This is the object returned to me at index 0 of the array of repository objects the GitHub API responded with when I made my repositories request. There is some great data immediately available to us in this object. The `name:` key and `html_url:` key would be very useful to us if we wanted to display the name of our repository and make a clickable link to the URL of the repository. `description:`, `stargazers_count:`, and `languages_url:` will also be useful to us in displaying project data.

Now that we have our GitHub data in JSON format, we need to loop through all of our GitHub repositories and sort our repositories. By default, the respository list comes sorted alphabetically, however, we can use `stargazers_count` to sort our repositories by number of stars, showing our most popular repositories first. Here's a few additional lines of code that takes advantage of the `Array.prototype.sort()` method:
```javascript
var sortedRepos = data.sort(function(a,b) {
    return parseFloat(b.stargazers_count) - parseFloat(a.stargazers_count);
});
```
The `sort()` array method takes a callback function, loops through our entire array of repository objects comparing each repo to the next one, and sorts the array values based on the return value of the callback function. In this case, `a` and `b` represent the current array object, and the next array object respectively. If the callback function returns a number less than `0`, `a` will be sorted to an index lower than `b`. If the callback function returns `0`, the order of `a` and `b` remain unchanged. Finally, if the callback function returns a number greater than `0`, `b` will be sorted to an index lower than `a`. If you wish to look into this method further, MDN has some great documentation on [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

Now that we have our array sorted, we can simply grab the object at the first index of our array. Here's what we should have so far:
```javascript
var url = "https://api.github.com/users/jamisoncozart/repos?per_page=100";

$.get(url, function(data) {
  var sortedRepos = data.sort(function(a,b) {
    return parseFloat(b.stargazers_count) - parseFloat(a.stargazers_count);
  });
  console.log(sortedRepos[0]);
})
```
If you open up the console, you will now see the object of your repository with the most stars printed to the console. Grabbing some of the relavant data directly from this object, we can console.log the object data like this:
```javascript
var url = "https://api.github.com/users/jamisoncozart/repos?per_page=100";

$.get(url, function(data) {
  var sortedRepos = data.sort(function(a,b) {
    return parseFloat(b.stargazers_count) - parseFloat(a.stargazers_count);
  });
  console.log(sortedRepos[0].name);
  console.log(sortedRepos[0].description);
  console.log(sortedRepos[0].html_url);
  console.log(sortedRepos[0].stargazers_count);
})
```
As you can see if you have the console open, accessing the values stored in our GitHub repository objects is as simple as appending a `.name` or `.description` to our repository object. If you want to read more about working with objects, MDN is again here to [save the day](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects).

Finally, just to clean up our code and use more recent JavaScript syntax, we can replace our callback function with an Arrow Function to use ES6 syntax:
```javascript
var url = "https://api.github.com/users/jamisoncozart/repos?per_page=100";

$.get(url, function(data) {
  var sortedRepos = data.sort((a,b) => parseFloat(b.stargazers_count) - parseFloat(a.stargazers_count));
  var repoName = sortedRepos[0].name;
  var repoDescription = sortedRepos[0].description;
  var repoLink = sortedRepos[0].html_url;
  var repoStars = sortedRepos[0].stargazers_count;
})
```
Arrow functions are a sleek way to condense this callback function onto a single line. Check out MDN's documentation on [Arrow function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions). I have also stored all our important data into variables.

Now that we have grabbed most of our data, we can focus on adding this data to our HTML document, and displaying it on our webpage for the world to see.

## __How to insert data into your HTML__
<hr>
Intro sentence

The DOM or the [Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) allows developers to call upon and manipulate elements of the webpage rendered in HTML and CSS, bridging the gap between scripts and webpages. To manipulate the DOM to our advantage, we will use the [jQuery](https://api.jquery.com/) library to grab the HTML elements by their ids and change the innerHTML of them to the repository data we are pulling form GitHub. First lets grab all of our elements we want to add new text to. To do this, we need to wait for the DOM or the `document` to be `ready` before we can call on any of the DOM elements:
```javascript
$(document).ready(function() {
  $("#repoLink")
  $("#repoTitle")
  $("#repoStars")
  $("#repoDescription")
})
```
This will grab all of our DOM elements by their ids (denoted by the `#<id name>`). Now we need to add our newly retrieved repository data to these elements. We will need to add our entire `$(document).ready()` function inside our `$.get()` function to access our repo data:
```javascript
var url = "https://api.github.com/users/jamisoncozart/repos?per_page=100";

$.get(url, function(data) {
  var sortedRepos = data.sort((a,b) => parseFloat(b.stargazers_count) - parseFloat(a.stargazers_count));
  var repoName = sortedRepos[0].name;
  var repoDescription = sortedRepos[0].description;
  var repoLink = sortedRepos[0].html_url;
  var repoStars = sortedRepos[0].stargazers_count;
  $(document).ready(function() {
    $("#repoLink").attr('href', repoLink);
    $("#repoTitle").html(repoName);
    $("#repoStars").html(repoStars);
    $("#repoDescription").html(repoDescription);
  })
})
```
If you look at our index.html page in your browser, you will now see that the github repository information for your top repository (sorted by stars) is displayed in the HTML for our project panel!

The last step of the process is retrieving data to place in the 'Languages Used:' section of our project panel. If you look back through the JSON object response the GitHub API sent back to us, you will not find any data on the specific languages we used, but instead a `languages_url:` link. They can't make it _that_ easy right? In reality, the JSON object contains tons of GitHub API urls, which can all be accessed by using more GitHub API requests.

## __Making nested requests__
<hr>

Intro
To retrieve our project _languages used_, lets write a new request specifically to the URL we found in our JSON object:
```javascript
$.get("https://api.github.com/repos/jamisoncozart/address-book/languages", function(languageData) {
  for(let i = 0; i < Object.keys(languageData).length; i++) {
    languages.push(Object.keys(languageData)[i]);
  }
});
```
Here we use a for loop to loop through all the keys of the `languageData` object, and push them to a `languages` array. 

While this is definitely possible, we are already receiving the URL for this API request inside the first JSON response object for our project. Because of this, we can refactor our code to use a nested request to access the `languages_url`:
```javascript
const url = "https://api.github.com/users/jamisoncozart/repos?per_page=100";

$.get(url, function(data) {
  let sortedRepos = data.sort((a,b) => parseFloat(b.stargazers_count) - parseFloat(a.stargazers_count));
  let repoName = sortedRepos[0].name;
  let repoDescription = sortedRepos[0].description;
  let repoLink = sortedRepos[0].html_url;
  let repoStars = sortedRepos[0].stargazers_count;
  let languages = [];
  $.get(sortedRepos[0].languages_url, function(languageData) {
    for(let i = 0; i < Object.keys(languageData).length; i++) {
      languages.push(Object.keys(languageData)[i]);
    }
  });
  $(document).ready(function() {
    $("#repoLink").attr('href', repoLink);
    $("#repoTitle").html(repoName);
    $("#repoStars").html(repoStars);
    $("#repoDescription").html(repoDescription);
  });
});
```
Now that we have our data from the API, lets use more jQuery to finalize our project panel with our _languages used_ data:
```javascript
const url = "https://api.github.com/users/jamisoncozart/repos?per_page=100";

$.get(url, function(data) {
  let sortedRepos = data.sort((a,b) => parseFloat(b.stargazers_count) - parseFloat(a.stargazers_count));
  let repoName = sortedRepos[0].name;
  let repoDescription = sortedRepos[0].description;
  let repoLink = sortedRepos[0].html_url;
  let repoStars = sortedRepos[0].stargazers_count;
  let languages = [];
  $.get(sortedRepos[0].languages_url, function(languageData) {
    for(let i = 0; i < Object.keys(languageData).length; i++) {
      languages.push(Object.keys(languageData)[i]);
    }
  });
  $(document).ready(function() {
    $("#repoLink").attr('href', repoLink);
    $("#repoTitle").html(repoName);
    $("#repoStars").html(repoStars);
    $("#repoDescription").html(repoDescription);
    let languageList = $("#repoLanguageList");
    setTimeout(function() {
      for(let i = 0; i < languages.length; i++) {
        languageList.append(`<li><strong>${languages[i]}</strong></li>`);
      }
    });
  });
});
```
Here we append a new `li` HTML element for each language inside out `languages` array. I have wrapped this code inside a `setTimeout()` function because we don't want our `languages` list to append until we have successfully retrieved our `languageData` from our nested request. Using `setTimeout()` without specifying a time as the second parameter will run our `for` loop after enough time has passed to recieve our `languageData` object before we try and append the data. You can read more on the different uses of the setTimeout() function [here](https://www.w3schools.com/jsref/met_win_settimeout.asp).

For many APIs, this is a common workflow: making requests, parsing the JSON response object, storing the data you want, then doing something with that data. Now that you know how easy it is to use the GitHub API to retrieve anyone's profile data and repository information, consider some further exploration to get more practice with making API requests and using other features of GitHub's API.

## __Further Exploration__
<hr>

**Challenge:** 
Using the GitHub API, add percents to each language used in your project based on the data from `languages_url` API link.

### __Other ways to make API requests__

* [The Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
* [AJAX - The XMLHttpRequest Object](https://www.w3schools.com/js/js_ajax_http.asp)
* [AJAX using jQuery](https://api.jquery.com/jquery.ajax/)

## __Example Projects__
<hr>

You can find a completed version of this project in associated with my _Personal Portfolio_ found [Here](https://jamisoncozart.github.io/portfolio-page/)

### __Closing Remarks__
<hr>
If you enjoyed this article and found it useful, please consider starring this repository and sharing it with anyone you think would find it useful.

If you have any further comments, improvements, or constructive criticism, feel free to email me at: jamisoncozart@gmail.com

<hr>

&copy; 2020 - Jamison Cozart
