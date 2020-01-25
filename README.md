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
As you probably guessed, the `$.get()` jQuery method takes up to 4 parameters, but we will only work with 2 here. The first parameter is our `GET` request URL, and the second is a [Callback Function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function). This callback function is passed the GitHub API response data by passing a single parameter `data` to our callback function.

When we reference our `data` parameter in our callback function and `console.log()` it, we can view it in our browser's console.

After typing/copying this code into your `scripts.js` file, open your `index.html` file in your browser (Chrome preferred) and navigate to the console using the shortcut `Shift + CTRL + J`, or right-clicking on the page and clicking `inspect`, then clicking on `Console` at the top of the menu that pops up. If you want to see the request in action, `Refresh` the page, and you should see the `JSON` response printed to the console.

This is great! The request we made is returning us an array of objects, with each object reference each repository on our GitHub!

Before we move on to filtering out the data we want from this `data` array of objects, lets clean up our code slightly to make it easier to understand:
```javascript
var url = "https://api.github.com/users/jamisoncozart/repos?per_page=100";

$.get(url, function(data) {
  console.log(data);
})
```
So as you have just witnessed, making requests to the GitHub API is quite a simple task. Knowing what URL you need to make a request to is half the battle. In the next section we will traverse the great `JSON` response array, and pull out some data we can use for our website.

## __How to Traverse Objects__
<hr>

Intro sentence
Sentence to tie in next topic (conclusion sentence)

### How to sort your GitHub data

Intro sentence
Sentence to tie in next topic (conclusion sentence)

### How to insert data into your HTML

Intro sentence
Sentence to tie in next topic (conclusion sentence)

### Further Exploration

Intro sentence
Challenge: Add percents to each language used based on data from “languages used” link.
Example of very impressive data visualization using the GitHub API and chart.js
https://profile-summary-for-github.com/search
Sentence to tie in next topic (conclusion sentence)
