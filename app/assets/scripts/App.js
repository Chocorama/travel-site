import '../styles/styles.css';
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';



new StickyHeader()
new RevealOnScroll(document.querySelectorAll('.feature-item'), 75)
new RevealOnScroll(document.querySelectorAll('.testimonial'), 60)
new MobileMenu();
let modal;

//we can just write this to create a variable and attach it later on to the new x.default for a global scope

document.querySelectorAll('.open-modal').forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault()
        if (typeof modal == 'undefined') {
            import(/* webpackChunkName: "modal" */'./modules/Modal').then(x => {
                modal = new x.default()
                setTimeout(() => modal.openTheModal(), 20)
            }).catch(() => console.log('there was a problem'))
        } else {
            modal.openTheModal()
        }
    })
})

if(module.hot) {
    module.hot.accept()
}


//before modal is loaded its undefined,  thats why if its undefined lets import and load a new instance and then call the function otherwise in the else block we are saying its no longer a value of undefined so just run the function

//we use a settimeout just to give the app time to import and load a bit before launching function

// /* webpackChunkName: "modal" */ is a way for webpack to change name from random number naming if you go to Network tab in dev tools

//when to save a new instance of a class to a variable??????
//if you're going to need to access it or call its methods later on. in this case evrytime someone is clicking on a button with .open-modal class - we are running the objects openTheModal method,  so here we would absolutely want to save this instance of a class to a variable. stickyheader on the other hand does not need to live in a variable and same for mobileMenu