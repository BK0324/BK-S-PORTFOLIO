// ==========================
// Webpage intro
// ==========================
$(function(){
  $('body').css("display", "none");
  $('body').fadeIn(2000);
})

// ==========================
// Title Handling
// ==========================
var listHTML = $(".Title").html();
var listItems = listHTML.split("<br>");
$(".Title").html("");
$.each(listItems, function (i, v) {
  var item =
    '<div class="Title-mask"><span class="Title-line">' + v + "</span></div>";
  $(".Title").append(item);
});

// ==========================
// Custom Cursor Effect
// ==========================
var $circle = $('.cursor');

function moveCircle(e) {
  TweenLite.to($circle, 0.3, {
    css: {
      left: e.pageX,
      top: e.pageY
    }
  });
}

$(window).on('mousemove', moveCircle);

// ==========================
// Typing Animation
// ==========================
$(function () {
  const spanEl = document.querySelector('.contact-pop .story span')
  const txtarr = ['Web Publisher', 'UI/UX Designer', 'Interpreter', 'Translator']
  console.log(txtarr)
  let index = 0;
  let currentTxt = txtarr[index].split('')

  // 작성
  function writeTxt() {
    spanEl.textContent += currentTxt.shift()

    if (currentTxt.length !== 0) {
      // 아직 출력할 게 남았다
      setTimeout(writeTxt, Math.floor(Math.random() * 100))
    } else {
      // 출력 다했다
      currentTxt = spanEl.textContent.split('')
      setTimeout(deleteTxt, 3000)
    }
  }

  // 삭제
  function deleteTxt() {
    currentTxt.pop()
    spanEl.textContent = currentTxt.join('')

    if (currentTxt.length !== 0) {
      // 덜 지워졌다
      setTimeout(deleteTxt, Math.floor(Math.random() * 100))
    } else {
      // 다음 문장으로 넘어가기
      index = (index + 1) % txtarr.length
      // 배열에 다시 접근하여 숫자를 1 증가시켜 새로운 문장으로 가져오기
      currentTxt = txtarr[index].split('')
      writeTxt()
    }
  }
  writeTxt()

  // ==========================
  // Intro UI Handling
  // ==========================
  window.addEventListener('load', function () {
    const intro = document.getElementById('intro');

    // intro 숨기기
    setTimeout(() => {
      intro.classList.add('hidden');

      // fullpage.js 초기화
      $('#fullpage').fullpage({
        anchors: ['page1', 'page2', 'page3'],
        // responsiveWidth: 1440,

        afterLoad: function (anchorLink, index) {
          console.log(anchorLink);
          console.log(index);

          if (index == 3) {
            // 스크롤 아이콘 클릭 시, 1페이지로 이동
            const mouse = document.querySelector('.fa-computer-mouse');

            mouse.addEventListener('click', function () {
              location.href = '#page1';
            });
            // 마우스 아이콘을 위로 향하도록 CSS 변경
            $('.fa-computer-mouse').css({
              'transform': 'rotate(0)', // 위로 향하도록 회전
              'display': 'block', // 아이콘이 보이도록 설정
              'transition': 'all .3s'
            });
          } else {
            // 원래 방향으로 되돌리기
            $('.fa-computer-mouse').css('transform', 'rotate(180deg)');
          }
        }
      });
    }, 3000); // 4초 후 실행
  });

  // ==========================
  // Intro Cursor효과
  // ==========================
  $(document).on('mousemove', function (e) {
    $('#round').css({
      left: e.pageX,
      top: e.pageY
    });
  });

  // ==========================
  // Popup Handling
  // ==========================
  $('.side-button .about').click(function (e) {
    e.preventDefault()
    $('.about-pop').fadeIn()
    $('.about-pop').animate({
      'margin-left': '0'
    }, 500)
  })

  $('.about-pop button').click(function (e) {
    e.preventDefault()
    $('.about-pop').animate({
      'margin-left': '-300%'
    }, 500)
  })

  $('.side-button .contact').click(function (e) {
    e.preventDefault()
    $('.contact-pop').fadeIn()
    $('.contact-pop').animate({
      'margin-right': '0'
    }, 500)
  })

  $('.contact-pop button').click(function (e) {
    e.preventDefault()
    $('.contact-pop').animate({
      'margin-right': '-300%'
    }, 500)
  })

  $('.main .ub button:first').click(function () {
    $('.wdpop').fadeIn()
  })

  $('.dr_arrow').click(function () {
    $('.wdpop').fadeOut()
  })

  $('.main .ub button:nth-child(2)').click(function () {
    $('.adpop').fadeIn()
  })

  $('.dl_arrow').click(function () {
    $('.adpop').fadeOut()
  })

  $('.main .lb button:nth-child(1)').click(function () {
    $('.ccpop').fadeIn()
  })

  $('.ur_arrow').click(function () {
    $('.ccpop').fadeOut()
  })

  $('.main .lb button:nth-child(2)').click(function () {
    $('.vdpop').fadeIn()
  })

  $('.ul_arrow').click(function () {
    $('.vdpop').fadeOut()
  })

  $('.ccpop .container .bx').click(function () {
    $(this).toggleClass('active')
    $('.ccpop .container .bx').not(this).removeClass('active')
  })

  // .bx a span 태그 호버 시 텍스트 내용 변경
  document.querySelectorAll(".bx a span").forEach(span => {
    span.dataset.originalText = span.textContent; // 원래 텍스트 저장

    span.addEventListener("mouseenter", function () {
      this.textContent = "Original"; // 원하는 텍스트로 변경
    });

    span.addEventListener("mouseleave", function () {
      this.textContent = this.dataset.originalText; // 원래 텍스트로 복귀
    });
  });

  // 풀페이지 2p 팝업창 버튼 텍스트 활성화
  $(document).ready(function () {
    $(".main .ub button, .main .lb button").each(function () {
      $(this).data("originalText", $(this).text());
    });

    $(".main .ub button, .main .lb button").mouseenter(function () {
      let button = $(this);
      button.fadeOut(200, function () { // 0.2초 동안 사라짐
        button.text("Click").fadeIn(200); // 텍스트 변경 후 0.2초 동안 나타남
      });
    });

    $(".main .ub button, .main .lb button").mouseleave(function () {
      let button = $(this);
      button.fadeOut(200, function () { // 0.2초 동안 사라짐
        button.text(button.data("originalText")).fadeIn(200); // 원래 텍스트로 변경 후 나타남
      });
    });
  });

  // KLM airlines redesign 관련
  $('.wdpop .container .text a:nth-child(2)').click(function () {

    $('.klm-wrap').fadeIn().addClass('show');
    // 몇 초 후에 question 창이 fadeUp 효과로 나타나기
    setTimeout(function () {
      $('.klm').addClass('show');
    }, 2000); // 2초 후에 나타나도록 설정
  });

  // 닫기 버튼 클릭 시 klm-wrap 닫기
  $('.klm .close_btn').click(function () {
    $('.klm-wrap').fadeOut();
    // $('.popup3 .question').removeClass('show');
  });

  $('.wdpop .container .text:nth-child(2) a:nth-child(2), .wdpop .container .text:nth-child(3) a:nth-child(2)').click(function () {
    $('.klm-wrap').hide();
  })

  // Menu-list-item 관련
  $('.Menu-list-item:nth-child(1)').click(function () {
    $('.listpop1').fadeIn();
  });

  $('.listpop1 .btn').click(function () {
    $('.listpop1').fadeOut();
  });

  $('.Menu-list-item:nth-child(2)').click(function () {
    $('.listpop2').fadeIn();
  });

  $('.listpop2 .btn').click(function () {
    $('.listpop2').fadeOut();
  });

  $('.Menu-list-item:nth-child(3)').click(function () {
    $('.listpop3').fadeIn();
  });

  $('.listpop3 .btn').click(function () {
    $('.listpop3').fadeOut();
  });

  $('.Menu-list-item:nth-child(4)').click(function () {
    $('.listpop4').addClass('on')
  });

  $('.listpop4 .header .btn').click(function () {
    $('.listpop4').removeClass('on')
  });


  // ==========================
  // Various Design 탭 메뉴 관련
  // ==========================
  var $menu = $('.Menu-list'),
    $item = $('.Menu-list-item'),
    w = $(window).width(), //window width
    h = $(window).height(); //window height

  $(window).on('mousemove', function (e) {
    var offsetX = 0.5 - e.pageX / w, //cursor position X
      offsetY = 0.5 - e.pageY / h, //cursor position Y
      dy = e.pageY - h / 2, //@h/2 = center of poster
      dx = e.pageX - w / 2, //@w/2 = center of poster
      theta = Math.atan2(dy, dx), //angle between cursor and center of poster in RAD
      angle = theta * 180 / Math.PI - 90, //convert rad in degrees
      offsetPoster = $menu.data('offset'),
      transformPoster = 'translate3d(0, ' + -offsetX * offsetPoster + 'px, 0) rotateX(' + (-offsetY * offsetPoster) + 'deg) rotateY(' + (offsetX * (offsetPoster * 2)) + 'deg)'; //poster transform

    //get angle between 0-360
    if (angle < 0) {
      angle = angle + 360;
    }

    //poster transform
    $menu.css('transform', transformPoster);

    //parallax for each layer
    $item.each(function () {
      var $this = $(this),
        offsetLayer = $this.data('offset') || 0,
        transformLayer = 'translate3d(' + offsetX * offsetLayer + 'px, ' + offsetY * offsetLayer + 'px, 20px)';

      $this.css('transform', transformLayer);
    });
  });
});

// ==========================
// Fireworks Effect
// ==========================
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    this.exploded = false;
    this.size = Math.random() * 5 + 5;
  }

  explode() {
    const numParticles = 100;
    for (let i = 0; i < numParticles; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const speed = Math.random() * 3 + 1;
      this.particles.push({
        x: this.x,
        y: this.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 100,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`
      });
    }
    this.exploded = true;
  }

  update() {
    if (this.exploded) {
      this.particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 2;

        if (particle.life <= 0) {
          this.particles.splice(index, 1);
        }
      });
    }
  }

  draw() {
    if (this.exploded) {
      this.particles.forEach(particle => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
    } else {
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

const fireworks = [];

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.05) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    const firework = new Firework(x, y);
    fireworks.push(firework);
  }

  fireworks.forEach(firework => {
    if (!firework.exploded) {
      firework.size -= 0.1;
      if (firework.size <= 0) {
        firework.explode();
      }
    }
    firework.update();
    firework.draw();
  });

  requestAnimationFrame(animate);
}

animate();
