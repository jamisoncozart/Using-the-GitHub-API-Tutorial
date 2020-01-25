# __Automating a Web Page to Show Off Your Top GitHub Repositories__
## **A beginner’s guide to using GitHub’s API for your personal portfolio page**
___By Jamison Cozart___

As a beginner dev like myself, you probably have a simple portfolio page showcasing your projects and previous work experience. You’ve taken the time to meticulously add the project titles, the description, and even the languages used for each of your projects. But if you’re like me you’ve also realized the arduous task of continually updating these projects with the newer and improved projects you will continue to make through your journey as a developer. I’m writing this article, as my first blog post ever, to show you the beauty and simplicity of using GitHub’s API’s to your advantage.

## __The GitHub API__

For anyone unfamiliar with the term, API stands for Application Programming Interface. The term API is thrown around a lot in the developer community, and can represent a wide variety of different software interfaces. Because of this, I will not spend too much time explaining, and instead link to the [Wikipedia page](https://en.wikipedia.org/wiki/Application_programming_interface) for your further reading. The basic purpose of an API is for software programs to easily communicate and exchange data between one another. Fortunately for all developers GitHub has a fantastically simple API that we can use to access the data from each of our project repositories in seconds. If you’re more like me, you might prefer to read the [Official Documentation](https://developer.github.com/v3/).

If you’ve ever looked for Github’s official mobile app, you’ll find that only a Beta version exists for both iOS and Android (as of January 22nd, 2020). Instead when you search for GitHub on your respective app stores, you’ll find multiple 3rd party GitHub apps you can download. Most, if not all of these 3rd party apps interact with GitHub’s API to pull the data from all of GitHub at your request. Another simpler example would be [David Ase’s Profile Summary for GitHub](https://profile-summary-for-github.com/search) which requests any users GitHub data by making requests to GitHub’s API and visualizing the data using a javascript library called chart.js. 

An Application Programming Interface might sound like some really complex software, but digging just beneath the surface, you’ll find that requesting your GitHub data is much simpler than you thought.

## __How to make API calls__

So how do we actually interact with this ominous GitHub API? To start, lets open our __terminal (Mac)__ or __Git Bash (Windows)__ and make a simple API call. Replace `jamisoncozart` with your own GitHub username:
```
curl -i https://api.github.com/users/jamisoncozart
```
If you typed it right, you should see an output that looks something like this (but with your own GitHub info):
```
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
```
curl -i https://api.github.com/users/jamisoncozart/repos
``` 

Upon requesting the repos URL, the GitHub API responds with a full list of all of the repositories currently on our GitHub. The GitHub API uses a data type called __JSON__, which stands for __JavaScript Object Notation__, making it really easy to work with in JavaScript! We can make this same request for just about anybody's GitHub profile, and there are many other types of API calls you can make, however I will only touch on a select few in this article. Now that we know what URL we need to make a request to, lets see how we can make the same request using JavaScript.

Lets start by making sure you have all the files you need to make this work. I’m going to keep this as simple as possible to start.

<hr>

### __Option 1__

__Using Git Bash (Windows) or Terminal (Mac)__

The easiest way to get started is to clone this GitHub repo onto your desktop: 
```
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



Sentence to tie in next topic (conclusion sentence)

### How to Traverse Objects

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
Challenge: Add github stars to each of your projects that reflects the current number of stars on each of the projects on github.
Example of very impressive data visualization using the GitHub API and chart.js
https://profile-summary-for-github.com/search
Sentence to tie in next topic (conclusion sentence)
