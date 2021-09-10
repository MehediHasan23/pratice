const inputField = document.getElementById('input-field')
const showBooks = document.getElementById('show-books')
const emptyField = document.getElementById('empty-field')
const totalFoundResult = document.getElementById('total-results')

document.getElementById('input-btn').addEventListener('click',() =>{
  const searchResult = inputField.value;
  inputField.value = ''
  showBooks.innerHTML= ''
  totalFoundResult.textContent = ''

  emptyField.innerText =`plz write something`
  if(searchResult === ''){
    emptyField.style.display ='block'
  }else{
    emptyField.style.display = 'none'
    const api =`https://openlibrary.org/search.json?q=${searchResult}`
    fetch(api)
    .then(res => res.json())
    .then(data => loadData(data))
  }
 
})

const loadData  = bookList =>{
  const totalResult = bookList.numFound;
  bookList = bookList.docs;
  const books = bookList.filter(element => element.cover_i !== undefined && element.author_name !== undefined && element.publisher !== undefined && element.first_publish_year !== undefined)
  if(books.length ===0){
    showBooks.innerHTML = ''
    totalFoundResult = ''
    totalFoundResult.innerText = `No Result Found`
  }
  else{
    totalFoundResult.innerText = `Total results ${totalResult} & total books founds ${books.length}` 
    showBooks.innerHTML = ''
    books.forEach(data=>{
      // console.log(book);
      const div = document.createElement('div')
      div.innerHTML = `
      
    <div class="card m-2" style="width: 18rem; height:470px;">
    <img class='img-fluid' style=height:250px"; src="https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <h5>Books-Name: ${data.title} </h5>
      <h5>Author-Name: ${data.author_name} </h5>
      <h5>Publisher: ${data.publisher} </h5>
      <h5>Publisher Year : ${data.first_publish_year} </h5>
      
    </div>
    </div>
      
      `
    showBooks.appendChild(div)
    })
  }
  
}