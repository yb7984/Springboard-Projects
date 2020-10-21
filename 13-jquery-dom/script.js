$("#frm_movie").on("submit", (evt) => {
  evt.preventDefault();

  //create the row
  const movieRow = $("<tr></tr>");

  //creat the table cells
  const titleTd = $(`<td>${$("#move_title").val()}</td>`);
  const ratingTd = $(`<td>${$("#move_rating").val()}</td>`);
  const actionTd = $("<td><button class='btn-delete'>X</button></td>");

  movieRow.attr("data-title", $("#move_title").val());
  movieRow.attr("data-rating", $("#move_rating").val());

  //append to the row
  movieRow.append(titleTd).append(ratingTd).append(actionTd);

  //append to the table
  $("#list_table tbody").append(movieRow);

  $(".btn-delete").on("click", (evt) => {
    const btn = $(evt.target);
    //remove the row
    btn.parents("tr")[0].remove();
  });

  $("#list_table thead").off("click").on("click", "label" , (evt) => {
    const target = $(evt.target);
    const sortField = target.attr("sort-field");
    const sortAsc = target.attr("sort-asc");
    const sortDirect = sortAsc === "true" ? -1 : 1;
    const indicators  = $(".sort-indicator");
    indicators.attr("class" , "sort-indicator");

    if (sortField === undefined){
      return false;
    }

    const tbody = $("#list_table tbody");
    //get the table rows
    const rows = Array.from($("#list_table tbody tr"));

    //sort the rows
    rows.sort((a , b) => ($(a).attr(`data-${sortField}`) > $(b).attr(`data-${sortField}`) ? sortDirect: -sortDirect));

    //toggle the direction
    target.attr("sort-asc",  sortAsc === "true" ? "false" : "true");

    //set the up and down arrow for indicator
    target.next(".sort-indicator").addClass(sortAsc === "true" ? "arrow-down" : "arrow-up");

    tbody.html("").append(rows);
  });
});
