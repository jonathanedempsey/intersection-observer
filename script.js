const cards = document.querySelectorAll('.card');

/**
 * entries are a list of all the things that have changed, that have
 * intersected or unintersected.
 * When an element is intersected, we just mean that it's visible on the screen.
 */
const observer = new IntersectionObserver(entries => {

    // If the card is intersecting (is visible on the screen), add the show class.
    // Remove show class if the card is not shown on the screen.
    // entry.isIntersecting returns true or false.
    entries.forEach(entry => {
        entry.target.classList.toggle('show', entry.isIntersecting)

        // If you don't want the card to animate away from the top, you can remove the card from being observered.
        //if(entry.isIntersecting) observer.unobserve(entry.target)
    })
    console.log(entries);
}, {
    threshold: 1 // threshold determines what percent of the card needs to be onscreen before it loads in
});

// Loop through all our cards so they can be observered for intersections
cards.forEach(card => {
    observer.observe(card);
})


/**
 * This observer will only select the last card in our list,
 * and load in new cards when we reach the last card
 */
const lastCardObserver = new IntersectionObserver(entries => {
    const lastCard = entries[0];

    // If our last card is not intersecting (becoming visible), don't do anything
    if (!lastCard.isIntersecting) return;

    // If the last card is intersecting (becoming visible), then load a new set of cards
    loadNewCards();

    // Unobserve the last card since we have loaded in a bunch of new cards,
    // meaning there's a new last card.
    lastCardObserver.unobserve(lastCard.target);

    // Observe our new last card
    lastCardObserver.observe(document.querySelector('.card:last-child'));
}, {
    rootMargin: "100px" // ensures new cards get loaded in 100px before the end of page
});
lastCardObserver.observe(document.querySelector('.card:last-child'));

// In a real world example you would do a fetch to an API,
// but here we just create 10 new static card elements and add them to our observer
cardContainer = document.querySelector('.card-container');
function loadNewCards() {
    for (let i = 0; i < 10; i++) {
        const card = document.createElement('div');
        card.textContent = "New Card";
        card.classList.add('card');
        observer.observe(card);
        cardContainer.append(card);
    }
}


