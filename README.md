# Childline - Report explicit online content

A web app for reporting explicit online images to the (IWF)[https://www.iwf.org.uk/] (Internet Watch Foundation).


## Current Approach

Under 18s can report explicit online content to a Childline counsellor. However, they can olny help on condition
that the young person emails them their passport to prove their age. This is an outdated and cumbersome process.
This process can deter young people from reporting explicit images. Either they can feel uncomfortable to reveal their identity, or they think the process is too complicated.

For further reading visit the [Childline website](https://www.childline.org.uk/info-advice/bullying-abuse-safety/online-mobile-safety/sexting/)

## How our app can help

Our app uses YOTI for identifications and login.

**Why it beneficial to use YOTI**
The app uses YOTI to:
- prove that the young person is under 18
- prove the young persons identity while protecting their anonimity. The app would only store their
remember me id, which is a unique identifier. So we only check that they have an accepted personal identification document on their YOTI account, but the app doesn't require access to any of their personal details.

## Development Resources & Notes

### Websites

- [Childline website](https://www.childline.org.uk/info-advice/bullying-abuse-safety/online-mobile-safety/sexting/) - Use for colour schemes as it is already 'proven for use case'.
  * Colours:
 ![image](https://cloud.githubusercontent.com/assets/15717822/22715594/8a5298ee-ed89-11e6-8bd7-9a85c8c0f578.png)

```css
/* HSL */
$color1: hsla(194%, 100%, 41%, 1);
$color2: hsla(240%, 100%, 67%, 1);
$color3: hsla(198%, 47%, 26%, 1);
$color4: hsla(193%, 72%, 68%, 1);
$color5: hsla(0%, 79%, 63%, 1);

/* RGB */
$color1: rgba(0, 161, 208, 1);
$color2: rgba(87, 87, 255, 1);
$color3: rgba(35, 79, 98, 1);
$color4: rgba(115, 207, 232, 1);
$color5: rgba(235, 88, 87, 1);
```
- [IWF online form](https://www.iwf.org.uk/) - This form takes a minimum of 5 interactions with Childline website. It is very difficult to find...

### Libraries

- [animate css](https://daneden.github.io/animate.css/) - include *simple* animations for smooth page transitions, however keeping it basic to ensure the user feels taken seriously.
- [materialize css](http://materializecss.com/buttons.html) - css library for key components.

### Prototype tech stack

- Node Hapi.js server

### Future tech stack
