let search = document.querySelector('.search');
let btnSearch = document.querySelector('.btnSearch');
let key;
let detaInfo;
btnSearch.addEventListener('click', () => {
    document.querySelector('.wrapper').innerHTML = '';
    const XHR = new XMLHttpRequest();
    XHR.open('GET', `http://www.omdbapi.com/?s=${search.value}&apikey=7825018a`);
    XHR.onreadystatechange = function () {
        if (XHR.readyState === 4 && XHR.status === 200) {
            const data = JSON.parse(XHR.responseText);
            dataInfo = data.Search;
            dataInfo.forEach(i => {
                document.querySelector('.wrapper').innerHTML += `<div class="movie">
        <img class="poster" src="${i.Poster}" alt="">
        <div class="Title">${i.Title}</div>
        <div class="Type">${i.Type}</div>
        <div class="Year">${i.Year}</div>
        <button type="button" class="btn btn-success details" style="width: 100%; height: 10%; margin: 10px 0 0 0;">More details</button>
        </div>`
            });
            document.querySelectorAll('.details').forEach(elem => {
                elem.addEventListener('click', () => {
                    let check = elem.parentNode.children[1].textContent;
                    dataInfo.map((i) => {
                        if (check == i.Title) {
                            key = i.imdbID
                            details();
                        }
                    })
                })
            });
        }
    }

    XHR.send();
})
function details() {
    const request = new XMLHttpRequest();
    request.open('GET', `http://www.omdbapi.com/?i=${key}&apikey=7825018a`);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            let dataItem = JSON.parse(request.responseText);
            let ratings = '';
            dataItem.Ratings.map((i) => {
                ratings += '<br>' + i.Source + ' ' + i.Value;
            })
            document.querySelector('.itemPoster').style.backgroundImage = 'url(' + dataItem.Poster + ')'
            document.querySelector('.itemInfo').innerHTML = `
            <div class="itemTitle">${dataItem.Title}</div>
                    <div class="filmInfo">${dataItem.Rated},${dataItem.Year} ${dataItem.Genre}</div>
                    <div class="discriptionItem">${dataItem.Plot}</div>
                    <div class="writtenItem"><span style="font-size: 18px; font-weight: bold;">Written by:</span> ${dataItem.Writer}</div> 
                    <div class="directedItem"><span style="font-size: 18px; font-weight: bold;">Directed by:</span> ${dataItem.Director}<div> 
                    <div class="starringItem"><span style="font-size: 18px; font-weight: bold;">Starring:</span> ${dataItem.Actors}</div> 
                    <div class="oficeItem"><span style="font-size: 18px; font-weight: bold;">BoxOffice:</span> ${dataItem.BoxOffice}</div> 
                    <div class="awardsItem"><span style="font-size: 18px; font-weight: bold;">Awards:</span> ${dataItem.Awards}</div> 
                    <div class="ratingsItem"><span style="font-size: 18px; font-weight: bold;">Ratings:</span> ${ratings
                }</div> 
            `
            document.querySelector('.cOntainer').style.display = 'block';
            document.querySelector('.cOntainer').addEventListener('click', () => {
                document.querySelector('.cOntainer').style.display = 'none';
            }

            )
        }
    }

    request.send()
}

