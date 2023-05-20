const $searchForm = $("form");




$searchForm.on("submit", event => {
    event.preventDefault();

    //generate data from the target object
    const formData = new FormData(event.target);

    //get the value from the generated data where the name value is "pokemon" (on the form)
    const pokemon = formData.get("pokemon").toLowerCase();

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`

    
    
    console.log(url)

    const $screen = $(".screen")
    const $result = $(".result")

    $(`[name="pokemon"]`)[0].value =""

// empty out the input field
    $screen.empty();
    $result.html(`<div>loading...</div>`)

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            $screen.html(
                `<img src=${data.sprites.front_default} alt=${data.name}>`
            );
            $result.html(`
                <div>
                   <b>name:&nbsp; </b> ${data.name}
                </div>
                <div>
                   <b>id:&nbsp; </b> ${data.id}
                </div>
                <div>
                   <b>weight:&nbsp; </b> ${data.weight}
                </div>
                <div>
                   <b>type:&nbsp; </b> ${data.types.map(v => v.type.name)}
                </div>
            `)
        })
        .catch(() =>{
            $result.html(`<div> there was an error...</div>`)
        });
});