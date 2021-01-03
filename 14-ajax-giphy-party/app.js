console.log("Let's get this party started!");

const images = $("#images");

async function getResult(q) {
  try {
    const response = await axios
      .get("http://api.giphy.com/v1/gifs/search", {
        params: { q : q, api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym" },
      })
      .then((response) => {
          if (response.status === 200){
              const {data} = response;

              console.log(data.data);

              if (data.data.length > 0){
                  //get a random index
                const index = Math.floor(Math.random() * data.data.length);
  
                const img = $("<img />");
                img.attr("src" , data.data[index].images.fixed_height.url) ;
  
                images.append(img);
              }
              else{
                  alert("No result is found, Please try again!")
              }
          }
      });

    return response;
  } catch (e) {
      console.log(e);
  }
}

const btnSearch = $("#btn_search");
const term      = $("#term");
btnSearch.on("click" , (e)=>{
    e.preventDefault();
    getResult(term.val());
});

$("#btn_clear").on("click" , (e)=>{
    e.preventDefault();
    images.html("");
});
