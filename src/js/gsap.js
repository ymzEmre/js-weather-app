gsap.from(".searchContainer", {
  opacity: 0,
  duration: 1,
  delay: 0.8,
  y: 50,
  ease: "expo.out",
});

gsap.from(".checkboxSection , .searchSection", {
  opacity: 0,
  duration: 2,
  delay: 1.5,
  y: 30,
  ease: "expo.out",
  stagger: 0.3,
});

gsap.from(".installSection", {
  opacity: 0,
  duration: 2,
  delay: 3,
  y: -50,
  ease: "expo.out",
});

gsap.from(".installSection p", {
  opacity: 0,
  duration: 2,
  delay: 3.5,
  y: 30,
  ease: "expo.out",
});

gsap.from("#installButton", {
  opacity: 0,
  duration: 2,
  delay: 4.3,
  y: 30,
  ease: "expo.out",
});
