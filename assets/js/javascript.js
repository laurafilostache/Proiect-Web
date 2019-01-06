

function setNewImage()
{
  document.getElementById("img8").src="assets/img/dogcat.jpg";
}

function setOldImage()
{
  document.getElementById("img8").src="assets/img/dogcat1.jpg";
  //alert();
}

document.addEventListener('DOMContentLoaded', function(){

  const list = document.querySelector('#book-list ul');
  const forms = document.forms;

  // sterge
  list.addEventListener('click', (e) => {
    if(e.target.className == 'delete'){
      const li = e.target.parentElement;
      li.parentNode.removeChild(li);
    }
  });

  // adauga
  const addForm = forms['add-book'];
  addForm.addEventListener('submit', function(e){
    e.preventDefault();

    // creaza elem
    const value = addForm.querySelector('input[type="text"]').value;
    const li = document.createElement('li');
    const nume = document.createElement('span');
    const deleteBtn = document.createElement('span');

    // adauga text content
    nume.textContent = value;
    deleteBtn.textContent = 'Sterge';

    // adauga clase
    nume.classList.add('name');
    deleteBtn.classList.add('delete');

    // append to DOM
    li.appendChild(nume);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });


  const hideBox = document.querySelector('#hide');
  hideBox.addEventListener('change', function(e){
    if(hideBox.checked){
      list.style.display = "none";
    } else {
      list.style.display = "initial";
    }
  });


  const searchBar = forms['search-books'].querySelector('input');
  searchBar.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase();
    const books = list.getElementsByTagName('li');
    Array.from(books).forEach((book) => {
      const title = book.firstElementChild.textContent;
      if(title.toLowerCase().indexOf(e.target.value) != -1){
        book.style.display = 'block';
      } else {
        book.style.display = 'none';
      }
    });
  });


  const tabs = document.querySelector('.tabs');
  const panels = document.querySelectorAll('.panel');
  tabs.addEventListener('click', (e) => {
    if(e.target.tagName == 'LI'){
      const targetPanel = document.querySelector(e.target.dataset.target);
      Array.from(panels).forEach((panel) => {
        if(panel == targetPanel){
          panel.classList.add('active');
        }else{
          panel.classList.remove('active');
        }
      });
    }
  });

})

function addParere() {
  var data = {};
  var parereUrl = "http://localhost:3000/pareri";

  data.numesiprenume  = document.getElementById("numesiprenume").value;
  data.numecaine  = document.getElementById("numecaine").value;
  data.parere  = document.getElementById("parere").value;
  var json = JSON.stringify(data);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", parereUrl, true);
  xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
  xhr.onload = function () {
  	var comments = xhr.responseText;
  	if (xhr.readyState == 4 && xhr.status == "201") {
  		console.table(comments);
  	} else {
  		console.error(comments);
  	}
  }
  xhr.send(json);
}

//get pareri
var reviewurl  = "http://localhost:3000/pareri";
var xhr  = new XMLHttpRequest();
xhr.open('GET', reviewurl, true);
xhr.onload = function () {
 var datas = JSON.parse(xhr.responseText);

 if (xhr.readyState == 4 && xhr.status == "200") {

  var info = new Array();
       info = datas;

       var news = document.getElementsByClassName("pareri")[0];

       for(var i = 0; i < info.length; i++) {
           var h5 = document.createElement("input");
           h5.setAttribute('value', info[i].id);
           h5.setAttribute('id', "id");
           var id = info[i].id;
           news.appendChild(h5);

           var p = document.createElement("input");
           p.setAttribute('value', info[i].numesiprenume);
           p.setAttribute('id', "numesiprenume");
           news.appendChild(p);

           var p = document.createElement("input");
           p.setAttribute('value', info[i].numecaine);
           p.setAttribute('id', "numecaine");
           news.appendChild(p);

           var p = document.createElement("input");
           p.setAttribute('value', info[i].parere);
           p.setAttribute('id', "parere");
           news.appendChild(p);

           var br = document.createElement("br");
           news.appendChild(br);
       }

 } else {
   console.error(datas);
 }
}
xhr.send(null);
