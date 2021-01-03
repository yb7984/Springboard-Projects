describe("TV Maze API test", function () {
  beforeEach(function () {
    // initialization logic
  });

  it("test for searchShows()", async function () {
    const shows = await searchShows("cat");
    expect(shows.length).toBeGreaterThan(0);
    //check the return object keys
    const keys = Object.keys(shows[0]);
    expect(keys).toContain("id");
    expect(keys).toContain("name");
    expect(keys).toContain("summary");
    expect(keys).toContain("genres");
    expect(keys).toContain("image");
  });

  it("test for populateShows()", async function () {
    const shows = [
      {
        id: 1767,
        name: "The Bletchley Circle",
        summary:
          "<p><b>The Bletchley Circle</b> follows the journey of four ordinary women with extraordinary skills that helped to end World War II.</p><p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their normal lives, modestly setting aside the part they played in producing crucial intelligence, which helped the Allies to victory and shortened the war. When Susan discovers a hidden code behind an unsolved murder she is met by skepticism from the police. She quickly realises she can only begin to crack the murders and bring the culprit to justice with her former friends.</p>",
        image:
          "http://static.tvmaze.com/uploads/images/medium_portrait/147/369403.jpg",
      },
    ];
    populateShows(shows);

    expect($("#shows-list .card").length).toEqual(1);       //check how many item get listed
    expect($("#shows-list .Show").attr("data-show-id")).toEqual("1767");  //check the id
    expect($("#shows-list .card").attr("data-show-id")).toEqual("1767");  //check the id
    expect($("#shows-list .card-title").text()).toEqual("The Bletchley Circle");    //check the name
  });

  it("test for getEpisodes()", async function () {
    const episodes = await getEpisodes("4639");
    expect(episodes.length).toBeGreaterThan(0);

    //check the return object keys
    const keys = Object.keys(episodes[0]);
    expect(keys).toContain("id");
    expect(keys).toContain("name");
    expect(keys).toContain("season");
    expect(keys).toContain("number");
  });

  it("test for populateEpisodes()", async function () {
    const episodes = [
      {
        id: 297501,
        name: "Alien Abductions",
        season: 1,
        number: 6,
      },
    ];
    populateEpisodes(episodes);

    expect($("#episodes-list li").length).toEqual(1);   //check how many item get listed
    expect($("#episodes-list li").text()).toEqual(      //check the text shows
      `${episodes[0].name} (season ${episodes[0].season}, number ${episodes[0].number})`
    );
  });

  afterEach(function () {
    // teardown logic
  });
});
