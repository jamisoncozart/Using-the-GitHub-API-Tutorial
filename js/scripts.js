var url = "https://api.github.com/users/jamisoncozart/repos?per_page=100";

$.get(url, function(data) {
  console.log(data);
})