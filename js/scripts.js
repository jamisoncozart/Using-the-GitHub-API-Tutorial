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
