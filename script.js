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
