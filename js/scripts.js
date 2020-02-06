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
    // $("#repoLanguageList")
  })
})
