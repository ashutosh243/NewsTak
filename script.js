// slecting elements------------
let newsbox = document.getElementById("accordion_show");
let heading = document.getElementById("heading");
let cate = document.querySelectorAll(".cat");
let cat = "";
let newhtml = ``;

cate.forEach(function (element) {
  element.addEventListener("click", function (e) {
    let head = `Top News<span class="badge bg-secondary">${element.innerHTML}</span>`;
    heading.innerHTML = head;
    newhtml = ``;
    console.log(element.innerHTML);
    cat = `${element.innerHTML}`;
    // getting a data from api-------------------
    let xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://newsapi.org/v2/top-headlines?country=in&category=${cat}&apiKey=91d426cfc3024cc58439964d2cc65893`,
      true
    );
    xhr.onprogress = function () {
      let spin = `<div class="spinner-border text-primary mx-3" role="status">
      <span class="visually-hidden">Loading...</span>
      </div>`;
      newsbox.innerHTML = spin;
    };
    xhr.onload = function () {
      if (this.status == 200) {
        json = JSON.parse(this.responseText);
        for (let i = 0; i < 10; i++) {
          populate(i, json["articles"][i].title, json["articles"][i].url);
          console.log("Inside onlad");
        }
      } else {
        console.log("Error");
      }
    };
    xhr.send();
  });
});

// populate function to add news on ui----------------------

function populate(index, title, url) {
  html = `
<div class="accordion-item">
<h2 class="accordion-header" id="heading${index}">
<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
   <h5> News:${index + 1}</h5>
</button>
</h2>
<div id="collapse${index}" class="accordion-collapse collapse  collapse show" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
<div class="accordion-body">
   <p class="news_headline"> ${title}.<p/> 
    <a href='${url}' target="_blank">Click here to read more</a>
    
</div>
</div>
</div>`;
  newhtml += html;

  newsbox.innerHTML = newhtml;
}
