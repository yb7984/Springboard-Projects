/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */

/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  const response = await axios.get("http://api.tvmaze.com/search/shows", {
    params: { q: query },
  });

  return response.data.map((item) => {
    return {
      id: item.show.id,
      name: item.show.name,
      summary: item.show.summary,
      genres: item.show.genres.join(",") ,
      image: item.show.image === null ? "" : item.show.image.original,
    };
  });
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <img class="card-img-top" src="${
             show.image === "" ? "https://tinyurl.com/tv-missing" : show.image
           }">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.genres}</p>
             <p class="card-text">${show.summary}</p>
           </div>
           <button class="btn btn-block btn-info"  data-toggle="modal" data-target="#episodes-area">Episodes</button>
         </div>
       </div>
      `
    );

    $showsList.append($item);
  }
}

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch(evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  const response = await axios.get(
    `http://api.tvmaze.com/shows/${id}/episodes`
  );

  return response.data.map((item) => ({
    id: item.id,
    name: item.name,
    season: item.season,
    number: item.number,
  }));
}

/**
 * Populate episodes list
 * @param {Array} episodes 
 */
function populateEpisodes(episodes){
  $("#episodes-list").empty();
  episodes.forEach(item => {
    $("#episodes-list").append($(`<li>${item.name} (season ${item.season}, number ${item.number})</li>`));
  });

  // $("#episodes-area").show();
}

$("#shows-list").on("click", "button", async function (evt) {
  const episodes = await getEpisodes(
    $(evt.target).parents(".card").attr("data-show-id")
  );
  
  populateEpisodes(episodes);
});
