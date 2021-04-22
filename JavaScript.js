$(document).ready(function () {
   $('body').hide();
   $(window).on('load', function () {
      $('body').show();
      console.log(window.location.href);
      // Add index.html at the end of the URL
      if (window.location.href === 'https://filmsociety.netlify.app/') {
         window.location = 'https://filmsociety.netlify.app/index.html';
      };

      // get the vw & vh used in css, in js
      const vw = (coef) => window.innerWidth * (coef/100);
      const vh = (coef) => window.innerHeight * (coef/100);

      //Registering GSAP's plugins
      gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, ScrollToPlugin);

      //Initializing gsap timelines
      const preloadAnim = gsap.timeline({onComplete:skipPreloaderAndShowContent});
      const timeLine = gsap.timeline();
      let htmlLocation = document.location.href.match(/[^\/]+$/)[0];

      // Declaring variables
      let linkDictLength = 90;
      let counter;
      let yearAnimationTime = 23;

      // Move images in a circle
      function moveImageInCircle(item, imageLink, duration, delay) {
        preloadAnim.to(item, duration, {
          motionPath: {
          curviness: 0.9 ,
          path:[
            {x: vw(30), y:vh(30)}, // right
            {x: vw(0), y:vh(75)}, // bottom
            {x: vw(-30), y:vh(30)},  // left
            {x: vw(0), y:vh(0)}  // top
          ]},
          ease: Power1.easeInOut
        }, delay)
        .set($('#rotatingPicture'), {attr: {src: imageLink}})
        .to(item, 0, {opacity:1}, '-=' + yearAnimationTime.toString())
        .to(item, 0.5, {
          opacity:0,
          ease: Power1.easeInOut,
          delay: 0.5
        }, '-=' + (yearAnimationTime - delay * 2).toString());
      };

      // Declaring variables
      let years = {val:1929};
      let lastYear = 2020;
      let Cont={val:1929} , NewVal = 2020 ;
      let runPreloader = true;

      // Run preloader if it's the first time the website is loaded
      if (sessionStorage.getItem('preloader') === 'false' ||     sessionStorage.getItem('preloader') === null) {
         sessionStorage.setItem('preloader', 'true');
      } else {
         runPreloader = false;
         skipPreloaderAndShowContent();
      };

      // When the logo is clicked, go to home page and reset the preloader
      $('#logo').click(function () {
         window.location = './index.html';
      })

      // Preloader animation
      if (runPreloader) {
         preloadAnim.fromTo($('#titlePartI'), 0.5, {
           opacity: 0,
           y: -50,
           ease: Power1.easeInOut
         },{
           opacity: 1,
           y: 0,
         }, 0)
         .fromTo($('#titlePartII'), 0.5, {
           opacity: 0,
           y: -50,
           ease: Power1.easeInOut
         },{
           opacity: 1,
           y: 0
         }, 0.5)
         .fromTo($('#titlePartIII'), 0.5, {
           opacity: 0,
           y: -50,
           ease: Power1.easeInOut
         },{
           opacity: 1,
           y: 0
         }, 1)
         .to($('#skipAnimationButton'), 0.5, {
            opacity: 1,
            ease: Power1.easeInOut
         })
         .to(Cont, yearAnimationTime, {
           val:NewVal,
           roundProps:"val",
           ease: Power1.easeInOut,
           onUpdate:function(){
           $('#yearAnimation').html(Cont.val)
         }}, 1.5);

         // Cycle through all image links and insert them into moveImageInCircle function
         for (counter = 1; counter <= linkDictLength; counter++) {
           let createdImage = $('<img id="rotatingPicture">');
           createdImage.attr('src', 'Pictures/preloader/' + counter.toString() + '.jpg');
           createdImage.css('z-index', 100 - counter);
           $('#pictureAnimation').append(createdImage);
           if (counter != 1) {
             var delayAnimation = delayAnimation + 0.1;
           } else {
             var delayAnimation = 1.5;
          };
           moveImageInCircle(createdImage, 'Pictures/preloader/' + counter.toString() + '.jpg', 15, delayAnimation);
         };
      }

      // MAKING THE NAV BAR RESPONSIVE
      // If window is resized, add pages to burger
      addOrRemoveBurgerPages();
      function addOrRemoveBurgerPages () {
       let windowWidth = window.innerWidth;
       if (windowWidth >= 2560) {
         $('#displayedNav').append($('#page1'));
         $('#displayedNav').append($('#page2'));
         $('#displayedNav').append($('#page3'));
         $('#displayedNav').append($('#page4'));
         $('#displayedNav').append($('#page5'));
         $('#displayedNav').append($('#page6'));
         $('#displayedNav').append($('#page7'));
         $('#displayedNav').append($('#page8'));
         $('#displayedNav').append($('#page9'));
         $('#displayedNav').append($('#page10'));
         $('.burger').css('display', 'none');
         $('#hiddenNav').css('display', 'none');
       } else if (windowWidth < 2560 && windowWidth >= 1024) {
         $('#hiddenNav').append($('#page7'));
         $('#hiddenNav').append($('#page8'));
         $('#hiddenNav').append($('#page9'));
         $('#hiddenNav').append($('#page10'));
         $('#displayedNav').append($('#page1'));
         $('#displayedNav').append($('#page2'));
         $('#displayedNav').append($('#page3'));
         $('#displayedNav').append($('#page4'));
         $('#displayedNav').append($('#page5'));
         $('#displayedNav').append($('#page6'));
         $('.burger').css('display', 'block');
       } else if (windowWidth < 1024 && windowWidth >= 700) {
         $('#hiddenNav').append($('#page5'));
         $('#hiddenNav').append($('#page6'));
         $('#hiddenNav').append($('#page7'));
         $('#hiddenNav').append($('#page8'));
         $('#hiddenNav').append($('#page9'));
         $('#hiddenNav').append($('#page10'));
         $('#displayedNav').append($('#page1'));
         $('#displayedNav').append($('#page2'));
         $('#displayedNav').append($('#page3'));
         $('#displayedNav').append($('#page4'));
         $('.burger').css('display', 'block');
       } else if (windowWidth < 700) {
         $('#hiddenNav').append($('#page1'));
         $('#hiddenNav').append($('#page2'));
         $('#hiddenNav').append($('#page3'));
         $('#hiddenNav').append($('#page4'));
         $('#hiddenNav').append($('#page5'));
         $('#hiddenNav').append($('#page6'));
         $('#hiddenNav').append($('#page7'));
         $('#hiddenNav').append($('#page8'));
         $('#hiddenNav').append($('#page9'));
         $('#hiddenNav').append($('#page10'));
         $('.burger').css('display', 'block');
       };
      };

      // On resize, readjust the nav bar
      $(window).resize(addOrRemoveBurgerPages);

      // When clicking a link on the nav bar, add activeNavLink class and set sessionStorage key & value
      $('#displayedNav a').click(function () {
         $(this).addClass('activeNavLink');
         sessionStorage.setItem('activeLink', $(this).attr('id'));
      });

      // If there is a session storage value, set activeNavLink to that value
      if (sessionStorage.getItem('activeLink') !== null) {
         $('#' + sessionStorage.getItem('activeLink')).addClass('activeNavLink');
      }

      // Skip preloader animation
      function fastForwardPreloader (tl) {
         tl.to(preloadAnim, 2.5, {
          progress: 1,
          ease: Power2.easeInOut
         })
         .to($('#preloader'), 1.5, {
          opacity:0,
          ease: Power2.easeInOut,
          display: 'none'
         }, '-=1');
      }

      // Display the rest of the html code
      function displayContent (tl) {
         tl.to($('#preloader'), 0, {display: 'none'})
           .to($('header'), 0, {display: 'grid'})
           .to($('main'), 0, {display: 'grid'})
           .to($('footer'), 0, {display: 'grid'})
           .to($('header'), 1, {
               opacity: 1,
               ease: Power2.easeInOut
            })
            .to($('main'), 1, {
               opacity: 1,
               ease: Power2.easeInOut
            }, '-=1')
            .to($('footer'), 1, {
               opacity: 1,
               ease: Power2.easeInOut
            }, '-=2');
      }

      // Animate the pictures from the home page
      function displayPicturesHomePage (tl) {
         tl.to($('#rightSection'), 1, {
            ease: Power2.easeInOut,
            x: '-100%'
         })
         .to($('#leftSectionII'), 1, {
            ease: Power2.easeInOut,
            x: '100%'
         });
      }

      // Makes sure the function is called only once.
      let plays = 0;

      // At the end of preloader animation, display home page
      function skipPreloaderAndShowContent() {
        const newTimeLine = gsap.timeline({onComplete: checkIfCodeShouldContinue});
        if (sessionStorage.getItem('preloader') === 'false') {
           fastForwardPreloader(newTimeLine);
           displayContent(newTimeLine);
           displayPicturesHomePage(newTimeLine);
        } else {
           displayContent(newTimeLine);
           // Run home page animations if on home page;
           console.log(htmlLocation);
           if (htmlLocation === 'index.html' || htmlLocation === 'index.html#') {
              console.log('It\'s the main page');
              displayPicturesHomePage(newTimeLine);
           };
        };
      };

      $('#skipAnimationButton').on('click', function () {
         const newTimeLine = gsap.timeline({onComplete: checkIfCodeShouldContinue});
         fastForwardPreloader(newTimeLine);
         displayContent(newTimeLine);
      });

      function checkIfCodeShouldContinue () {
         plays++;
        //Making sure the timeline code runs just once
        if (plays === 1) {
          continueCodeAfterPreloader();
       };
     }

      // Continue code after the preloader
      function continueCodeAfterPreloader() {
         let openedMenu = false;
         $('.burger').on('click', function () {
         openedMenu = !openedMenu;

         // animate burger menu
         if (openedMenu) {
             //Get hiddenNav no. of children
             let navChildNo = $('#hiddenNav').children().length;
             timeLine.to($('.line1'), 0.2, {
              y: 6.5,
              ease: Power1.easeInOut
             })
             .to($('.line3'), 0.2, {
              y: -6.5,
              ease: Power1.easeInOut
              }, '-=0.2');
              timeLine.to($('#hiddenNav'), 0, {
                  height: 0,
                  padding: 0,
                  display: 'none'
              })
              .to($('#hiddenNav'), 1, {
                  height: navChildNo * 80,
                  display: 'grid',
                  paddingTop: 2 * vh,
                  ease: Power1.easeInOut
              });
         } else {
             let navChildNo = $('#hiddenNav').children().length;
             timeLine.to($('.line1'), 0.2, {
              y: 0,
              ease: Power1.easeInOut
             })
             .to($('.line3'), 0.2, {
              y: 0,
              ease: Power1.easeInOut
             }, '-=0.2')
             .to($('#hiddenNav'), 1, {
                height: 0,
                padding: 0,
                display: 'none',
                ease: Power1.easeInOut
             })
             .to($('#hiddenNav'), 0, {
                height: navChildNo * 80,
                paddingTop: 2 * vh
             });
         }
         });

         // Run code if on the home page
         if (htmlLocation === 'index.html' || htmlLocation === 'index.html#') {
            //Add stars to transition picture
            let numberOfStars = 200;
            let starCounter = 0;
            while (starCounter < numberOfStars) {
             let star = $('<p class="stars">');
             let starDimension = parseInt(Math.random() * 4 + 1).toString() + 'px';
             star.css({
                'top': parseInt(Math.random() * 30 + 1).toString() + 'vh',
                'left': parseInt(Math.random() * 100 + 1).toString() + 'vw',
                'width': starDimension,
                'height': starDimension
             });
             $('.transitionPicture').append(star);
             starCounter++;
            };

            //Parallax effect transition
            //Get random stars and animate their position on scroll
            starCounter = 0;
            while(starCounter < numberOfStars) {
              let randomStar = parseInt(Math.random() * 200 + 1);
              let randomDeviation = parseInt(Math.random() * 300 + 1);
              let randomDuration = parseInt(Math.random() * 5 + 1);
              let randomSpeed = parseInt(Math.random() * 300 + 1);
              gsap.to($('.transitionPicture').children()[randomStar], {
                 duration: randomDuration,
                 scrollTrigger: {
                     trigger: $('.transitionPicture').children()[randomStar],
                     scrub: 1,
                     toggleActions: 'restart none reverse none',
                     start: 'top center',
                 },
                 y: 650 + randomSpeed,
                 x: -randomDeviation
              });
              starCounter+=2;
            };


            // Star animation on hover (photo section) -------------------------------

            //Spawn stars
            function spawnStarsIntoDiv(element, starNumber, position) {
               let positionStar = $('#img1').position();
               let width = $('#img1').outerWidth();
               let height = $('#img1').outerHeight();
               let starLeft = positionStar.left + width / 2;
               let starTop = positionStar.top + height / 2;
               let starCounter = 0;
               while(starCounter < starNumber) {
                  let star = $('<p class="stars">');
                  let starDimension = parseInt(Math.random() * 4 + 1).toString() + 'px';
                  star.css({
                     'top': starTop,
                     'left': starLeft,
                     'width': starDimension,
                     'height': starDimension,
                     'zIndex': -1
                  });
                  element.append(star);
                  starCounter++;
               };
            }

            function animateStars (element, position) {
               let starsToSpawn = 70;
               spawnStarsIntoDiv(element, starsToSpawn, position);

               //Depending on picture position, choose the star path
               let starPath = [];
               switch (position) {
                  case 1:
                     starPath.push([
                       {x: 0, y: -1},
                       {x: -1, y: -1},
                       {x: -1, y: 0},
                       {x: 0, y: 0}
                     ]);
                     break;
                  case 2:
                     starPath.push([
                       {x: 0.6, y: 0},
                       {x: 0.6, y: -1},
                       {x: -0.6, y: -1},
                       {x:  0, y: 0}
                     ]);
                     break;
                  case 3:
                     starPath.push([
                       {x: 0, y: -1},
                       {x: 1, y: -1},
                       {x: 1, y: 0},
                       {x: 0, y: 0}
                     ]);
                     break;
                  case 4:
                     starPath.push([
                       {x: 0, y: -0.6},
                       {x: -1, y: -0.6},
                       {x: -1, y: 0.6},
                       {x: 0, y: 0}
                     ]);
                     break;
                  case 6:
                     starPath.push([
                       {x: 0, y: -0.6},
                       {x: 1, y: -0.6},
                       {x: 1, y: 0.6},
                       {x: 0, y: 0}
                     ]);
                     break;
                  case 7:
                     starPath.push([
                       {x: 0, y: 1},
                       {x: -1, y: 1},
                       {x: -1, y: 0},
                       {x: 0, y: 0}
                     ]);
                     break;
                  case 8:
                     starPath.push([
                       {x: -0.6, y: 0},
                       {x: -0.6, y: 1},
                       {x: 0.6, y: 1},
                       {x:  0, y: 0}
                     ]);
                     break;
                  case 9:
                     starPath.push([
                       {x: 0, y: 1},
                       {x: 1, y: 1},
                       {x: 1, y: 0},
                       {x: 0, y: 0}
                     ]);
                     break;
               }

               let starCounter = 0;
               while(starCounter < starsToSpawn) {
                  let randomHeight = parseInt(Math.random() * 10 + 5);
                  let randomWidth = parseInt(Math.random() * 10 + 5);
                  let randomDuration = parseInt(Math.random() * 10 + 1);
                  let randomSpeed = parseInt(Math.random() * 100 + 1);
                  let randomDelay = parseInt(Math.random() * 2);
                  gsap.to(element.children('.stars')[starCounter], {
                     duration: randomDuration,
                     repeat: -1,
                     delay: randomDelay,
                     yoyo: true,
                     yoyoEase: Power1.easeInOut,
                     motionPath: {
                        curviness: 1.2 ,
                        path: [
                          {x: vw(starPath[0][0].x * randomWidth), y: vh(starPath[0][0].y * randomHeight)},
                          {x: vw(starPath[0][1].x * randomWidth), y: vh(starPath[0][1].y * randomHeight)},
                          {x: vw(starPath[0][2].x * randomWidth), y: vh(starPath[0][2].y * randomHeight)},
                          {x: vw(starPath[0][3].x * randomWidth), y: vh(starPath[0][3].y * randomHeight)}
                        ]
                     }
                  });
                  starCounter++;
               }
            }

            // Fade out stars when exiting hover
            function fadeOutStars (element) {
               element.children().last().remove();
               gsap.to(element.children('.stars'), {
                  opacity: 0,
                  duration: 0.5,
                  ease: Power1.easeInOut,
                  onComplete: removeStars,
                  onCompleteParams: [(element)]
               });
            }

            // Empties the stars from div
            function removeStars (element) {
               element.empty();
            }

            // Hover listeners for the photo section
            $('#img1').hover(function () {
               animateStars($(this), 1);
               let insideText = $('<p>');
               insideText.text('THE HATEFUL EIGHT');
               $(this).append(insideText);
            }, function () {
               fadeOutStars($(this));
            });
            $('#img2').hover(function () {
               animateStars($(this), 2);
               let insideText = $('<p>');
               insideText.text('SCHINDLER\'S LIST');
               $(this).append(insideText);
            }, function () {
               fadeOutStars($(this));
            });
            $('#img3').hover(function () {
               animateStars($(this), 3);
               let insideText = $('<p>');
               insideText.text('GOODFELLAS');
               $(this).append(insideText);
            }, function () {
               fadeOutStars($(this));
            });
            $('#img4').hover(function () {
               animateStars($(this), 4);
               let insideText = $('<p>');
               insideText.text('WHIPLASH');
               $(this).append(insideText);
            }, function () {
               fadeOutStars($(this));
            });
            $('#img5').hover(function () {
               let insideText = $('<p>');
               insideText.text('DJANGO UNCHAINED');
               $(this).append(insideText);
            }, function () {
               fadeOutStars($(this));
            });
            $('#img6').hover(function () {
               animateStars($(this), 6);
               let insideText = $('<p>');
               insideText.text('THE PIANIST');
               $(this).append(insideText);
            }, function () {
               fadeOutStars($(this));
            });
            $('#img7').hover(function () {
               animateStars($(this), 7);
               let insideText = $('<p>');
               insideText.text('GET OUT');
               $(this).append(insideText);
            }, function () {
               fadeOutStars($(this));
            });
            $('#img8').hover(function () {
               animateStars($(this), 8);
               let insideText = $('<p>');
               insideText.text('Bad Times at the El Royale');
               $(this).append(insideText);
            }, function () {
               fadeOutStars($(this));
            });
            $('#img9').hover(function () {
               animateStars($(this), 9);
               let insideText = $('<p>');
               insideText.text('TENET');
               $(this).append(insideText);
            }, function () {
               fadeOutStars($(this));
            });

            $('#img10').hover(function () {
               animateStars($(this), 1);
               let insideText = $('<p>');
               insideText.text('INCEPTION');
               $(this).append(insideText);
            }, function () {
               fadeOutStars($(this));
            });
            $('#img11').hover(function () {
               animateStars($(this), 2);
               let insideText = $('<p>');
               insideText.text('JOKER');
               $(this).append(insideText);
            }, function () {
               fadeOutStars($(this));
            });
            $('#img12').hover(function () {
               animateStars($(this), 3);
               let insideText = $('<p>');
               insideText.text('THE SHINING');
               $(this).append(insideText);
            }, function () {
               fadeOutStars($(this));
            });
            $('#img13').hover(function () {
               animateStars($(this), 4);
               let insideText = $('<p>');
               insideText.text('GREEN BOOK');
               $(this).append(insideText);
            }, function () {
               fadeOutStars($(this));
            });
            $('#img14').hover(function () {
               let insideText = $('<p>');
               insideText.text('INTERSTELLAR');
               $(this).append(insideText);
            }, function () {
               fadeOutStars($(this));
            });
            $('#img15').hover(function () {
               animateStars($(this), 6);
               let insideText = $('<p>');
               insideText.text('THE DARK KNIGHT');
               $(this).append(insideText);
            }, function () {
               fadeOutStars($(this));
            });
            $('#img16').hover(function () {
               animateStars($(this), 7);
               let insideText = $('<p>');
               insideText.text('US');
               $(this).append(insideText);
            }, function () {
               fadeOutStars($(this));
            });
            $('#img17').hover(function () {
               animateStars($(this), 8);
               let insideText = $('<p>');
               insideText.text('THE REVENANT');
               $(this).append(insideText);
            }, function () {
               fadeOutStars($(this));
            });
            $('#img18').hover(function () {
               animateStars($(this), 9);
               let insideText = $('<p>');
               insideText.text('BLACK SWAN');
               $(this).append(insideText);
            }, function () {
               fadeOutStars($(this));
            });
         }; // End home page JS


         // Arrow up hover animation
         $('footer .fas').hover(function () {
            gsap.to($(this), 0.2, {
               y: -7,
               ease: Power2.easeInOut
            });
         }, function () {
            gsap.to($(this), 0.2, {
               y: 0,
               ease: Power2.easeInOut
            });
         })

         // Arrow up click animation
         $('footer .fas').click(function () {
            gsap.to(window, {
               duration: 3,
               scrollTo: 0,
               ease: Power2.out
            });
         });

         // Cinematography HTML page
         if (htmlLocation === 'cinematography.html') {

            //Parallax effect on the first image
            gsap.to($('#martianI'), {
               duration: 0.5,
               scrollTrigger: {
                   trigger: $('#imagePosition'),
                   scrub: 1,
                   toggleActions: 'restart none reverse none',
                   start: 'top center',
               },
               y: -700,
            });
            gsap.to($('#martianIII'), {
               duration: 0.5,
               scrollTrigger: {
                   trigger: $('#martianI'),
                   scrub: 1,
                   toggleActions: 'restart none reverse none',
                   start: 'top center',
               },
               y: 300,
            });
            gsap.to($('#transitionText'), {
               duration: 0.5,
               scrollTrigger: {
                   trigger: $('#martianI'),
                   start: 'top center',
                   scrub: 1,
                   toggleActions: 'restart none reverse none',
               },
               y: 700,
            });
            gsap.to($('#gotII'), {
               duration: 0.5,
               scrollTrigger: {
                   trigger: $('#got'),
                   scrub: 1,
                   toggleActions: 'restart none reverse none',
                   start: 'top center += 500px',
                   end: '300px'
               },
               opacity: 1,
            });

            // Display the images on the story board just once when hovering
            let runStoryBoard = true;
            $('#storyBoardContent').hover(function () {
               if (runStoryBoard) {
                  let boardNo = 1;
                  let panelNo = 21;
                  while (boardNo <= panelNo) {
                     let boardImage = $('<img class="storyBoardImg">');
                     boardImage.attr('src', 'Pictures/cinematography/psychoStoryboard/psycho' + boardNo.toString() + '.jpg');
                     $(this).append(boardImage);
                     boardNo++;
                  }
                  boardNo = 0;
                  while (boardNo < panelNo) {
                     gsap.to($(this).children('.storyBoardImg')[boardNo], {
                        duration: 0.5,
                        opacity: 1,
                        delay: 0.3 * boardNo
                     });
                     boardNo++;
                  }
                  runStoryBoard = false;
               } else {
                  // Display the text after 5s and check for hover animation on images
                  gsap.to($('#storyBoardText'), {
                     duration: 0.5,
                     opacity: 1,
                     delay: 5
                  });
                  $('.storyBoardImg').hover(function () {
                     gsap.to($(this), {
                        duration: 0.5,
                        opacity: 0
                     });
                  }, function () {
                     gsap.to($(this), {
                        duration: 0.5,
                        delay: 1,
                        opacity: 1
                     });
                  });
               }
            });


            // Cinematography example JS
            let counterOne = 0;
            function changeFirstExample (counter) {
               $('#example1').css({
                  "background": "url('Pictures/cinematography/example1/mrRobot" + counter.toString() + ".jpg')",
                  'background-size': 'cover'
               });
            }

            $('#btnLeft1').click(function () {
               if (counterOne === 0) {
                  counterOne = 7;
                  changeFirstExample(counterOne);
               } else if (counterOne === 1) {
                  counterOne = 7;
                  changeFirstExample(counterOne);
               } else {
                  counterOne--;
                  changeFirstExample(counterOne);
               }
            });

            $('#btnRight1').click(function () {
               if (counterOne === 0) {
                  counterOne = 2;
                  changeFirstExample(counterOne);
               } else if (counterOne === 7) {
                  counterOne = 1;
                  changeFirstExample(counterOne);
               } else {
                  counterOne++;
                  changeFirstExample(counterOne);
               }
            });

            // Add text depending on the page example
            let counterTwo = 0;
            let exampleTwoText = ['I. The main character sits in the room and talks to his psychiatris and he’s obviously the one without power.', 'II. She\'s standing up, showing her as being more powerful.', 'III. He starts to tell her how he hacked into her life, how he knows what she bought at the coffee shop, how she’s bad with money, what kind of porn she likes, etc.', 'IV. The shot starts above his head, looking down portraying his weakness that will soon change.', 'V. The frame gets lower as he continues to tell her how he knows everything about her', 'VI. Now the shot finishes below him, making the main character seem higher and more powerful.', 'VII. Now we are looking down on her because she is weak in this moment of humiliation and exposure. An amazing display of how excellent cinematography can be used to tell the story.']
            function changeSecondExample (counter) {
               $('#example2').css({
                  "background": "url('Pictures/cinematography/example2/mrRobot" + counter.toString() + ".jpg')",
                  'background-size': '45vw 50vh',
                  'background-repeat': 'no-repeat',
               });
               $('#example2 #exampleDescription').text(exampleTwoText[counter -1]);
            }

            $('#btnLeft2').click(function () {
               if (counterTwo === 0) {
                  counterTwo = 7;
                  changeSecondExample(counterTwo);
               } else if (counterTwo === 1) {
                  counterTwo = 7;
                  changeSecondExample(counterTwo);
                  counterTwo--;
               } else {
                  counterTwo--;
                  changeSecondExample(counterTwo);
               }
            });

            $('#btnRight2').click(function () {
               if (counterTwo === 0) {
                  counterTwo = 2;
                  changeSecondExample(counterTwo);
               } else if (counterTwo === 7) {
                  counterTwo = 1;
                  changeSecondExample(counterTwo);
               } else {
                  counterTwo++;
                  changeSecondExample(counterTwo);
               }
            });

            let counterThree = 0;
            let exampleThreeText = ['The meanings and intent that accompany the color red can vary — but there’s no denying it’s one of the most powerful colors to use on-screen. On one side of the spectrum, red is used as a way to show aggression, violence, and anger. Take the image above. This abrupt moment in Alex Garland’s Ex Machina is when the film takes a 180 and crosses into the realm of sinister. The encompassing red glow signifies a fresh intensity and serves as a cue for the audience to pay attention because something crucial is about to happen.', 'Stanley Kubrick was a master manipulator thanks to his obsession with color. His most notable and aggressive use of the color red was with Hal in 2001: A Space Odyssey. While inside Hal’s processor core, Dave slowly begins to deactivate the computer. This otherwise boring room is portrayed as a hellish end to a nightmare. This dreadful, inescapable feeling of impending death would be missing if not for Kubrick’s use of the color red.', 'On the other side of the spectrum, red often invokes feelings of love and passion. Spike Jonze’s Her is a perfect example of how a film’s entire meaning can be told nonverbally through shot composition and set decoration. The walls, clothes, computer screens — all red. The movie’s hero, Theodore, wears bright red, blue, yellow and white shirts throughout to communicate his emotional state. The entire film is a perfect example of why color theory matters.', 'Though often associated with warmth, energy, and humor, orange can also register a sense of warning and caution. The ancient religion Confucianism associates orange with transformation. The image above arrives at the tipping point of Beasts of No Nation — our hero is now a completely different person, almost unrecognizable as he trudges through the murky orange trenches.', 'The entirety of Mad Max: Fury Road has an orange tint that serves to amplify the desolate apocalyptic feeling of the landscape. Barren, hopeless, and endless, the Mars-like texture truly sends the audience to another world as chaos ensues.', 'Faithfulness, loyalty, and childlike wonder shine throughout the Jeff Nichols sci-fi chase movie, Midnight Special. The main character is one-of-a kind in every sense of the word and is covered in blue from head to toe. As used here, blue, most often associated with positive thoughts, portrays innocence and purity.', 'In Only God Forgives, the central character’s detachment from reality grows as the film trudges forward. Separating from the all encompassing red that fills most of the film’s running time, Ryan Gosling is consumed in this blue light, isolated away from reality, sanity, and every other character in the film. A dark, unfamiliar scheme (blue in this case) that stands out from the rest of the film is a perfect way to demonstrate a character’s detachment.', 'The soft pink motif for the pastry shop in Wes Anderson’s The Grand Budapest Hotel is more than it seems. The childlike romance between the two characters shown above, each wearing archetypal colors, comes to fruition in this exact shot. Surrounded by pink boxes, their innocent love blossoms. Wes Anderson’s compelling use of color is definitely worth exploring.', 'In the breakout 2015 horror film, It Follows, we’re introduced to the main character who dons a pink outfit in a room filled with pink. The decision to decorate the room and character as such precedes what “follows” later in the film. Pink represents her innocence and purity. After a frightening turn of events, her innocence is lost — and the pink outfit and lighting disappear simultaneously.'];
            let colorTitle = ['RED', 'ORANGE', 'BLUE', 'PINK'];

            // Changing the description, picture and title for the color example
            function changeThirdExample (counter) {
               $('#example3').css({
                  "background": "url('Pictures/cinematography/example3/example" + counter.toString() + ".jpg')",
                  'height': '40vh',
                  'width': '40vw',
                  'margin-left' : 'calc(50% - 20vw)',
                  'background-size': 'cover'
               });
               if (counter >= 1 && counter <= 3) {
                  $('#colorTitle').text(colorTitle[0]);
               } else if (counter >= 4 && counter <= 5)  {
                  $('#colorTitle').text(colorTitle[1]);
               } else if (counter >= 6 && counter <= 7)  {
                  $('#colorTitle').text(colorTitle[2]);
               } else if (counter >= 8 && counter <= 9)  {
                  $('#colorTitle').text(colorTitle[3]);
               };
               $('#example3 #colorDescription').text(exampleThreeText[counter -1]);
            }

            $('#btnLeft3').click(function () {
               if (counterTwo === 0) {
                  counterTwo = 9;
                  changeThirdExample(counterTwo);
               } else if (counterTwo === 1) {
                  counterTwo = 9;
                  changeThirdExample(counterTwo);
               } else {
                  counterTwo--;
                  changeThirdExample(counterTwo);
               }
            });

            $('#btnRight3').click(function () {
               if (counterTwo === 0) {
                  counterTwo = 2;
                  changeThirdExample(counterTwo);
               } else if (counterTwo === 9) {
                  counterTwo = 1;
                  changeThirdExample(counterTwo);
               } else {
                  counterTwo++;
                  changeThirdExample(counterTwo);
               }
            });

            // Display text when hovering over pictures from the gallery
            let backgroundUrl;
            $('#galleryContainer div').hover(function () {
               backgroundUrl = $(this).css('background-image');
               $(this).css({
                  'background': 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), ' + backgroundUrl,
                  'background-position': 'center',
                  'background-repeat': 'no-repeat',
                  'background-size': 'cover'
               });
               $('p', this).css('opacity', '1');

            }, function () {
               $(this).css({
                  'background': backgroundUrl,
                  'background-position': 'center',
                  'background-repeat': 'no-repeat',
                  'background-size': 'cover'
               });
               $('p', this).css('opacity', '0');
            });

         }; // End cinematography JS
      }

   });

});

